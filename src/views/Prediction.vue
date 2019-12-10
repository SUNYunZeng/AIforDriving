<template>
  <div>
    <Form ref="formInline" :model="formInline" inline>
      <FormItem>
        轨迹 ID:
        <InputNumber style="width:70px" :max="this.$isOnServer?2500:250" :min="1" v-model="id"></InputNumber>
      </FormItem>
      <FormItem>
        切分粒度:
        <InputNumber :editable="false" style="width:70px" :max="30" :min="1" v-model="cut_size"></InputNumber>
      </FormItem>
      <FormItem>
        测试用户: <Select v-model="user.name" clearable style="width:70px">
        <Option value="user1">User1</Option>
        <Option value="user2" :disabled="!this.$isOnServer">User2</Option>
        <Option value="user3" :disabled="!this.$isOnServer">User3</Option>
        <Option value="user4" :disabled="!this.$isOnServer">User4</Option>
      </Select>
      </FormItem>
      <FormItem style="width:70px">
        <Button type="primary" @click="handleSubmit">选择</Button>
      </FormItem>
      <FormItem>
        <Divider type="vertical"/>
        旅程完成度:
      </FormItem>
      <FormItem style="width:305px">
        <Slider style="width:300px" v-model="move_value" :step="1"
                :max="slider_max" :min="1" :tip-format="format"
                show-tip="always" show-stops></Slider>
      </FormItem>
      <FormItem style="width:110px">
        动态预测:
        <i-switch v-model="is_dynamic" @on-change="change"/>
      </FormItem>
      <FormItem>
        <Button type="primary" :disabled="preable" @click="predict">开始预测</Button>
      </FormItem>
    </Form>
    <EChartsMap :option="option"></EChartsMap>
  </div>
</template>

<script>
  import EChartsMap from '@/components/commom/EChartsMap';
  import store from '@/store';
  import {post, get} from '@/utils/myAjax';
  import {process, wgs84togcj02tobd09} from '@/utils/traj-handler';

  export default {
    name: 'prediction',
    data () {
      return {
        max_id: this.$isOnServer ? 2500 : 250,
        formInline: {},
        cut_size: 10,
        slider_max: 10,
        id: 100,
        move_value: 1,
        is_dynamic: false,
        preable: false,
        dy: null,
        user: {
          name: 'user1',
          recordMap: null,
          trajectory: null,
          real_dest: [],
          pre_dests: {},
          center: [],
          boundingCoords: []
        },
        bmap: {
          center: store.state.mapconfig.center,
          boundingCoords: [],
          zoom: 15,
          roam: true,
          mapStyle: store.state.mapStyle
        },
        option: {
          bmap: this.bmap,
          tooltip: {
            trigger: 'item'
          },
          series: []
        },
        myChart: null,
        lines: {
          coords: [],
          lineStyle: {
            normal: {
              color: 'orange'
            }
          }
        },
        lines_option: {
          type: 'lines',
          coordinateSystem: 'bmap',
          polyline: true,
          data: [],
          silent: true,
          lineStyle: {
            normal: {
              opacity: 0.75,
              width: 3
            }
          },
          progressiveThreshold: 500,
          progressive: 200
        },
        lines_state: {
          type: 'lines',
          coordinateSystem: 'bmap',
          polyline: true,
          data: [],
          lineStyle: {
            normal: {
              width: 0
            }
          },
          effect: {
            constantSpeed: 40,
            show: true,
            trailLength: 0.3,
            symbolSize: 3.5
          },
          zlevel: 1
        },
        real_dest_option: {
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: [{name: '目的地', value: []}],
          symbolSize: 20,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          hoverAnimation: true,
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          itemStyle: {
            normal: {
              color: '#12e78c',
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          zlevel: 2
        },
        pre_dest_option: {
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: [{name: '预测点', value: []}],
          symbolSize: 15,
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'fill'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b}'
          },
          itemStyle: {
            normal: {
              color: '#ff461f',
              shadowBlur: 7,
              shadowColor: '#333'
            }
          },
          zlevel: 3
        }
      };
    },
    mounted () {
    },
    methods: {
      change () {
        if (!this.is_dynamic && this.dy != null) {
          clearInterval(this.dy);
          this.preable = false;
        }
      },
      getAjax () {
        if (this.$isOnServer) {
          return post('searchByCol', {
            id: this.id,
            tableName: this.user.name
          });
        } else {
          return get('../static/data/user_1.json');
        }
      },
      handleSubmit () {
        if (this.id < 0 || this.id > this.max_id || this.id !== parseInt(this.id)) {
          this.$Message.info('id取值错误!');
          this.id = 100;
          return;
        }
        this.slider_max = this.cut_size;
        this.getAjax().then((data) => {
          let traj = this.$isOnServer ? data : [data.RECORDS[parseInt(this.id)]];
          let {trajectory, boundingbox, center, real_dest, recordMap} = process(traj, this.cut_size);
          this.user.recordMap = recordMap;
          this.user.trajectory = trajectory;
          this.user.center = center;
          this.user.boundingCoords = boundingbox;
          this.user.real_dest = real_dest;

          this.draw(trajectory, real_dest, center, boundingbox, []);
        }).catch((err) => this.$Message.error(err.toString()));
      },
      draw (trajectory, real_dest, center, boundingbox, pre_dest) {
        this.lines.coords = trajectory;
        this.lines_option.data = [this.lines];
        this.lines_state.data = [this.lines];
        this.real_dest_option.data = [{name: '目的地', value: this.user.real_dest}];
        this.pre_dest_option.data = [{name: '预测点', value: pre_dest}];
        let series = [this.lines_option, this.lines_state, this.real_dest_option,];
        if (this.$isOnServer) {
          series.push(this.pre_dest_option);
        }
        let option = {
          tooltip: {
            trigger: 'item'
          },
          series: series
        };
        if(this.bmap.center.toString()!== center.toString()){
          this.bmap.center = center;
          this.bmap.boundingCoords = boundingbox;
          option['bmap'] = this.bmap;
        }
        this.option = option;
      },
      predict () {
        if (this.user.trajectory == null || this.user.recordMap == null) {
          this.$Message.info('没有数据');
          return null;
        }
        if (this.is_dynamic) {
          this.preable = true;
          let _this = this;
          let flag = false;
          this.dy = setInterval(function () {
            if(flag){
              _this.move_value += 1;
            }
            if (_this.move_value >= _this.slider_max) {
              _this.move_value = 0;
            }
            let len = Math.max(2, parseInt(_this.move_value / _this.cut_size * _this.user.trajectory.length - 1));
            let k = '' + _this.move_value;
            if (k in _this.user.pre_dests) {
              _this.draw(_this.user.trajectory.slice(0, len), _this.user.real_dest,
                _this.user.center, _this.user.boundingCoords, _this.user.pre_dests[k]);
            } else {
              _this.do_predict();
            }
            flag = true;
          }, 3000);
        } else {
          this.do_predict();
        }
      },
      do_predict () {
        let len = Math.max(2, parseInt(this.move_value / this.cut_size * this.user.trajectory.length - 1));
        if (this.$isOnServer) {
          post('predictor', {
            record: this.user.recordMap.get(this.move_value),
            user: this.user.name
          }).then((data) => {
            let pre_dest = wgs84togcj02tobd09(...eval(data.res));
            this.draw(this.user.trajectory.slice(0, len), this.user.real_dest,
              this.user.center, this.user.boundingCoords, pre_dest);
            this.$Message.success('预测结果：' + pre_dest);
          });
        }else {
          this.draw(this.user.trajectory.slice(0, len),
            this.user.real_dest,this.user.center, this.user.boundingCoords);
        }
      },
      format (val) {
        return (val / this.slider_max * 100).toFixed(1) + '%';
      }
    },
    components: {
      EChartsMap
    }
  };
</script>

<style scoped>

</style>
