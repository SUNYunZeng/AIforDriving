<template>
  <div>
    <Form ref="formInline" inline>
      <FormItem>
        测试用户: <Select v-model="user" clearable style="width:70px">
        <Option value="user1">User1</Option>
        <Option value="user2" :disabled="!this.$isOnServer">User2</Option>
        <Option value="user3" :disabled="!this.$isOnServer">User3</Option>
        <Option value="user4" :disabled="!this.$isOnServer">User4</Option>
      </Select>
      </FormItem>
      <FormItem><b>出发时间:</b></FormItem>
      <FormItem>
        <DatePicker v-model="time_range" :start-date="new Date('2018-01-01 00:00:00')" type="datetimerange"
                    style="width: 300px"></DatePicker>
      </FormItem>
      <FormItem>
        <CheckboxGroup v-model="ODSelectoin">
          <Checkbox label="origin"></Checkbox>
          <Checkbox label="destination"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="show">展示</Button>
      </FormItem>
    </Form>
    <Map style="height: calc(78vh);" ref="leftletMap"></Map>
  </div>
</template>

<script>
  import Map from '@/components/commom/LeftletMap';
  import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap';
  import {post, get} from '@/utils/myAjax';
  import {points_factory} from  '@/utils/traj-handler'

  export default {
    name: 'od',
    data () {
      return {
        user: 'user1',
        time_range: ['2018-01-01 00:00:00', '2018-01-31:00:00:00'],
        ODSelectoin: ['origin'],
        heatmapLayer: null,
        cfg: {
          'radius': 0.005,
          'maxOpacity': 0.8,
          'scaleRadius': true,
          'useLocalExtrema': true,
          latField: 'lat',
          lngField: 'lng',
          valueField: 'eff'
        }
      };
    },
    mounted () {
      this.initHeatMap();
    },
    components: {
      Map
    },
    methods: {
      show () {
        if (this.ODSelectoin.length === 0 || this.user === undefined) {
          this.$Message.info('请配置参数');
          return null;
        }
        if (this.$isOnServer) {
          post('searchByRow', {
            rowName: ['origin', 'destination', 'norm_dict', 'o_eff', 'd_eff'],
            time: this.time_range,
            tableName: this.user
          }).then(data => {
            if (data.length > 0) {
              let res = points_factory(data, this.ODSelectoin);
              this.heatmapLayer.setData(res.data);
              this.$refs.leftletMap.map.setView(res.center, 10);
            } else {
              this.$Message.info('空数据');
            }
          });
        } else {
          get('../static/data/user_1.json').then(data => {
            if (data.RECORDS.length > 0) {
              let basket = [];
              let record = data.RECORDS;
              for (let item of record) {
                let tmp_date = new Date(item['time']);
                if (tmp_date >= this.time_range[0] && tmp_date <= this.time_range[1]) {
                  basket.push(item);
                }
              }
              let res = points_factory(basket, this.ODSelectoin);
              this.heatmapLayer.setData(res.data);
              this.$refs.leftletMap.map.setView(res.center, 10);
            } else {
              this.$Message.info('空数据');
            }
          });
        }
      },
      initHeatMap () {
        this.heatmapLayer = new HeatmapOverlay(this.cfg);
        this.heatmapLayer.addTo(this.$refs.leftletMap.map);
        L.control.scale({ maxWidth: 200, metric: true, imperial: false }).addTo(this.$refs.leftletMap.map);
      }
    }
  }
  ;
</script>
