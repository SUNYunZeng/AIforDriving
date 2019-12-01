import json
import sys
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.nn.utils.rnn import pack_padded_sequence, pad_packed_sequence
import numpy as np


class DeepSTC(nn.Module):

    def __init__(self, hidden_size, is_attn=False, hidden=None, is_semantic=False):
        super(DeepSTC, self).__init__()
        self.input_module = Input_Module(is_semantic=is_semantic)
        self.spa_temp_module = Spatio_Temporal_Module(input_module_size=self.input_module.end_dim(),
                                                      hidden_size=hidden_size,
                                                      hidden=hidden,
                                                      is_attn=is_attn)
        self.dest_pre_module = Destination_Prediction_Moudle(input_size=self.spa_temp_module.end_dim()
                                                                        + self.input_module.sem_dim())

    def forward(self, attr, traj):
        input_tensor, traj, traj_semantic = self.input_module(attr, traj)
        sptm_out, hiddens, weights = self.spa_temp_module(input_tensor, traj)
        result = self.dest_pre_module(sptm_out, traj_semantic)
        return result, hiddens, weights


class Input_Module(nn.Module):
    """
    Embedding the start_time and weekday
    """
    # embed_dim = [("weekday", 7, 3), ("start_time", 48, 6), ("sem_O", 8, 3)]
    embed_dim = [("weekday", 7, 3), ("start_time", 48, 6)]

    def __init__(self, is_semantic):
        super(Input_Module, self).__init__()
        self.is_semantic = is_semantic
        self.sem_pt_embed = nn.Embedding(9, 3, padding_idx=0)
        self.fc = nn.Sequential(
            nn.Linear(8, 3, False),
            # nn.ReLU()
        )
        for name, num_embeddings, embedding_dim in Input_Module.embed_dim:
            self.add_module(name + '_embed', nn.Embedding(num_embeddings, embedding_dim))

    def end_dim(self):
        end_dim = 0
        for name, num_embeddings, embedding_dim in Input_Module.embed_dim:
            end_dim += embedding_dim
        if self.is_semantic:
            end_dim += 5 + 3 + 3
        else:
            end_dim += 5
        return end_dim

    def sem_dim(self):
        if self.is_semantic:
            return 3 + 6 + 3
        return 3 + 6

    def forward(self, attr, traj):
        lngs = traj['lngs'].unsqueeze(-1)
        lats = traj['lats'].unsqueeze(-1)
        locs = torch.cat((lngs, lats), dim=2)
        time_semantic = []
        for name, num_embeddings, embedding_dim in Input_Module.embed_dim:
            embed = getattr(self, name + '_embed')

            _attr = torch.squeeze(embed(attr[name].view(-1, 1)), dim=1)
            time_semantic.append(_attr)

        if self.is_semantic:
            time_semantic.append(self.fc(attr['sem_O']))
            traj_semantic = torch.cat(time_semantic, dim=1)

            # combine the traj_semantic with sptio_conv
            expand_traj_semantic = traj_semantic.unsqueeze(dim=1).expand(
                locs.size()[:2] + (traj_semantic.size()[-1],))

            sem_pt = torch.squeeze(self.sem_pt_embed(traj['sem_pt'].unsqueeze(-1)), dim=2)

            semantic = torch.cat((expand_traj_semantic, sem_pt), dim=2)
        else:
            traj_semantic = torch.cat(time_semantic, dim=1)

            semantic = traj_semantic.unsqueeze(dim=1).expand(
                locs.size()[:2] + (traj_semantic.size()[-1],))

        input_tensor = torch.cat((locs,
                                  traj['travel_dis'].unsqueeze(-1),
                                  traj['spd'].unsqueeze(-1),
                                  traj['azimuth'].unsqueeze(-1),
                                  semantic), dim=2)

        return input_tensor, traj, traj_semantic  # (B x end_dim)


class Spatio_Temporal_Module(nn.Module):

    def __init__(self, input_module_size, hidden_size, is_attn, hidden=None):
        super(Spatio_Temporal_Module, self).__init__()
        self.hidden_size = hidden_size
        self.is_attn = is_attn
        # build the net
        self.temporal_net = TemporalNet(input_size=input_module_size,
                                        hidden_size=hidden_size,
                                        hidden=hidden)
        self.spatio_attn_net = Spatial_AttentionNet()
        self.scorer = Scorer()

    def end_dim(self):
        return self.hidden_size

    def forward(self, input_tensor, traj):
        spa_attn_score = self.scorer(traj)
        sequence_lens = traj['lens']
        sptm_hiddens, hiddens = self.temporal_net(input_tensor, sequence_lens)

        if self.is_attn:
            sptm_out, weights = self.spatio_attn_net(sptm_hiddens, spa_attn_score)
        else:
            sptm_out = sptm_hiddens[:, -1, :]  # (B x S x H), get the last output of hiddens
            weights = None

        return sptm_out, sptm_hiddens, weights


class Destination_Prediction_Moudle(nn.Module):
    def __init__(self, input_size, drop_prob=0):
        super(Destination_Prediction_Moudle, self).__init__()

        self.residual_net = ResidualNet(input_size)

        self.hid2out = nn.Linear(128, 2)

        # define a dropout layer
        self.dropout = nn.Dropout(drop_prob)

    def forward(self, sptm_out, traj_semantic):
        out = self.residual_net(torch.cat((sptm_out, traj_semantic), dim=1))

        active_out = torch.tanh(out)

        result = self.hid2out(self.dropout(active_out))

        return result


class ResidualNet(nn.Module):
    # The residual Networks to train easily and more robust.
    def __init__(self, input_size, num_final_fcs=4, hidden_size=128):
        super(ResidualNet, self).__init__()

        self.input2hid = nn.Linear(input_size, hidden_size)

        self.residuals = nn.ModuleList()

        for i in range(num_final_fcs):
            self.residuals.append(nn.Linear(hidden_size, hidden_size))

    def forward(self, inputs):
        hidden = F.leaky_relu(self.input2hid(inputs))

        for i in range(len(self.residuals)):
            residual = F.relu(self.residuals[i](hidden))
            hidden = hidden + residual
        return residual


class TemporalNet(nn.Module):
    """
    Net to get the temporal information of the trajectory_seqs by using RNN
    """

    def __init__(self, input_size, hidden_size=128, drop_prob=0, basic_net='LSTM', batch_first=True,
                 hidden=None):
        super(TemporalNet, self).__init__()

        self.input_size = input_size
        self.hidden_size = hidden_size
        self.hidden = hidden
        if basic_net == 'LSTM':
            self.RNN = nn.LSTM(self.input_size,
                               self.hidden_size,
                               num_layers=2,
                               dropout=drop_prob,
                               batch_first=batch_first,
                               bidirectional=False)
        else:
            self.RNN = nn.RNN(self.input_size,
                              self.hidden_size,
                              num_layers=1,
                              dropout=drop_prob,
                              batch_first=batch_first,
                              bidirectional=False)
        # define a dropout layer
        self.dropout = nn.Dropout(drop_prob)

    def forward(self, input_tensor, sequence_lens):
        pack_inputs = pack_padded_sequence(input_tensor, sequence_lens, batch_first=True)
        if self.hidden is not None:
            out, hiddens = self.RNN(pack_inputs, self.hidden)
        else:
            out, hiddens = self.RNN(pack_inputs)
        last_hiddens, _ = pad_packed_sequence(out, batch_first=True)
        last_hiddens = self.dropout(last_hiddens)

        return last_hiddens, hiddens


class Scorer(nn.Module):
    def forward(self, traj):
        spd = (1 / (traj['spd'] + 1.0) * (traj['key_point'] + 1.0)).unsqueeze(-1)
        azimuth = (traj['azimuth'] * (traj['key_point'] + 1.0)).unsqueeze(-1)
        dis = traj['travel_dis'].unsqueeze(-1)
        score = torch.cat((spd, azimuth, dis), dim=2)
        # score = spd
        return score


class Spatial_AttentionNet(nn.Module):

    def __init__(self):
        super(Spatial_AttentionNet, self).__init__()
        # atten 1
        self.projector = nn.Sequential(
            nn.Linear(3, 128),
            nn.ReLU()
        )

        # # atten 2  #
        # self.projector = nn.Sequential(
        #     nn.Linear(128, 128),
        #     nn.Tanh()
        # )

    def forward(self, hidden, score):
        # atten_solve1 #
        # (B x L x H) = (B x L x 3)*(3, H)
        weights = F.softmax(self.projector(score), dim=1)
        # weights = F.softmax(torch.mul(self.projector(score), hidden), dim=1)
        # (B x H) = (B x L x H)*(B x L x H).sum(dim=1)
        atten_result = (hidden * weights).sum(dim=1)

        # atten_solve2  The paper On Prediction of User Destination by Sub-Trajectory Understanding: A Deep Learning based Approach #
        # weights = F.softmax(self.projector(hidden), dim=1)
        # atten_result = (hidden * weights).sum(dim=1)

        return atten_result, weights


def re_sampler(data_list, level=1):
    return data_list[::level]


def dec_loc(loc_list, pt):
    loc_list = loc_list
    return [pt[0] * loc_list[1] + loc_list[0], pt[1] * loc_list[3] + loc_list[2]]


def padded_traj_data(trajset):
    traj_key = ["lngs", "lats", "travel_dis", "spd", "azimuth", "key_point"]
    info_key = ["weekday", "start_time"]
    attr_key = ["destination", "sem_D", "sem_O", "norm_dict"]
    attr = {}
    traj = {}

    for key in attr_key:
        trajset[key] = eval(trajset[key])
    for key in traj_key:
        trajset[key] = eval(trajset[key])
    trajset["sem_pt"] = eval(trajset["sem_pt"])

    for key in attr_key:
        attr[key] = torch.Tensor([trajset[key]])

    attr["dis_total"] = torch.Tensor([trajset["dis_total"]])

    for key in info_key:
        attr[key] = torch.LongTensor([trajset[key]])

    for key in traj_key:
        traj[key] = torch.Tensor([trajset[key]])
    traj["sem_pt"] = torch.LongTensor([trajset["sem_pt"]])

    lens = [len(trajset["lngs"])]
    traj["lens"] = torch.LongTensor(lens)
    return attr, traj


def run(traj_data, model_path):
    device = torch.device("cpu")
    model = DeepSTC(hidden_size=128,
                    is_semantic=True,
                    is_attn=True)
    checkpoint = torch.load(model_path, map_location=device)

    model = model.to(device)
    model.load_state_dict(checkpoint['state_dict'])
    model.eval()
    traj_data = eval(traj_data)[0]

    # traj_data = json.loads(traj_data)[0]

    loc_dict = eval(traj_data['norm_dict'])
    attr, traj = padded_traj_data(traj_data)
    output, hiddens, weights = model(attr, traj)
    cur_pt = np.array([traj_data['lngs'][-1], traj_data['lats'][-1]])

    pre_dest = dec_loc(loc_dict, output.detach().numpy()[0] + cur_pt)
    return str(pre_dest)


print(run(sys.argv[1], sys.argv[2]))
