<template>
  <div>
    <Form ref="formInline" :model="formInline" inline>
      <FormItem>
        轨迹 ID:
        <InputNumber style="width:70px" :max="1000" :min="1" v-model="id"></InputNumber>
      </FormItem>
      <FormItem>
        切分粒度:
        <InputNumber :editable="false" style="width:70px" :max="1000" :min="1" v-model="cut_size"></InputNumber>
      </FormItem>
      <FormItem>
        测试用户: <Select v-model="user.name" clearable style="width:70px">
        <Option value="user1">User1</Option>
        <Option value="user2" disabled>User2</Option>
        <Option value="user3" disabled>User3</Option>
        <Option value="user3" disabled>User4</Option>
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
        <Button :disabled="!this.$isOnServer" type="primary" @click="predict">开始预测</Button>
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
        formInline: {},
        cut_size: 10,
        slider_max: 10,
        id: 10,
        move_value: 1,
        is_dynamic: false,
        user: {
          name: 'user1',
          record: null,
          trajectory: null,
          real_dest: [],
          pre_dests: [],
        },
        bmap: {
          center: store.state.mapconfig.center,
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
        lines_option: [],
      };
    },
    mounted () {
    },
    methods: {
      change () {

      },
      getAjax () {
        if (this.$isOnServer) {
          return post('searchByCol', {
            id: this.id,
            tableName: this.user.name,
            requireRes: true
          });
        } else {
          return get('../static/data/user_1.json');
        }
      },
      handleSubmit () {
        this.slider_max = this.cut_size;
        this.getAjax().then((data) => {
          let traj = this.$isOnServer ? data.traj : [data.RECORDS[parseInt(this.id)]];
          let {trajectory, boundingbox, center, destination, record} = process(traj);
          this.user.trajectory = trajectory;
          this.user.record = record;
          let lines = [{
            coords: trajectory,
            lineStyle: {
              normal: {
                color: 'orange'
              }
            }
          }];
          this.lines_option = [{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: lines,
            silent: true,
            lineStyle: {
              normal: {
                opacity: 0.75,
                width: 3
              }
            },
            progressiveThreshold: 500,
            progressive: 200
          }, {
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: lines,
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
          }];
          this.user.real_dest = [{
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: [{name: '目的地', value: destination}],
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
          }];
          let pre_dest = this.$isOnServer ? [{
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: [{name: '预测点', value: wgs84togcj02tobd09(...eval(data.res))}],
            symbolSize: 15,
            tooltip: {
              trigger: 'item',
              formatter: '{b}'
            },
            itemStyle: {
              normal: {
                color: '#ff461f'
              }
            }
          }] : [];
          this.bmap.center = center;
          this.option = {
            bmap: this.bmap,
            tooltip: {
              trigger: 'item'
            },
            series: [...this.lines_option, ...this.user.real_dest, ...pre_dest]
          };
          this.$Message.success('预测结果：' + data.res);
        }).catch((err) => this.$Message.error(err.toString()));
      },
      predict () {
        if (this.user.trajectory==null || this.user.record==null) {
          this.$Message.info('没有数据');
          return null;
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
