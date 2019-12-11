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
        <Button type="primary" @click="show">展示</Button>
      </FormItem>
    </Form>
    <EChartsMap :option="option"></EChartsMap>
  </div>
</template>

<script>
  import EChartsMap from '@/components/commom/EChartsMap';
  import {lines_factory} from '@/utils/traj-handler';
  import {post, get} from '@/utils/myAjax';
  import store from '@/store';

  export default {
    name: 'trajectory',
    data () {
      return {
        user: 'user1',
        time_range: ['2018-01-01 00:00:00', '2018-01-31:00:00:00'],
        bmap: {
          center: store.state.mapconfig.center,
          boundingCoords: [],
          zoom: 12,
          roam: true,
          mapStyle: store.state.mapStyle
        },
        myChart: null,
        option: {
          bmap: this.bmap,
          tooltip: {
            trigger: 'item'
          },
          series: []
        },
        lines_option: {
          type: 'lines',
          coordinateSystem: 'bmap',
          polyline: true,
          data: [],
          silent: true,
          lineStyle: {
            normal: {
              opacity: 0.6,
              width: 1
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
            constantSpeed: 20,
            show: true,
            trailLength: 0.1,
            symbolSize: 1.5
          },
          zlevel: 1
        },
      };
    },
    methods: {
      show () {
        if (this.$isOnServer) {
          post('searchByRow', {
            rowName: ['lngs', 'lats', 'line_id', 'norm_dict'],
            time: this.time_range,
            tableName: this.user
          }).then(data => {
            if (data.length > 0) {
              let lines = lines_factory(data);
              this.draw(lines);
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
                if(tmp_date>=this.time_range[0] && tmp_date<= this.time_range[1]){
                  basket.push(item);
                }
              }
              this.draw(lines_factory(basket));
            } else {
              this.$Message.info('空数据');
            }
          });
        }
      },
      draw (lines) {
        this.lines_option.data = lines.data;
        this.lines_state.data = lines.data;
        this.bmap.center = lines.center;
        this.option = {
          bmap: this.bmap,
          tooltip: {
            trigger: 'item'
          },
          series: [this.lines_option, this.lines_state]
        };
      }
    },
    mounted () {

    },
    components: {
      EChartsMap
    }
  };
</script>

<style scoped>
  #tChart {
    width: 100%;
    height: calc(88vh);
    position: relative;
  }
</style>
