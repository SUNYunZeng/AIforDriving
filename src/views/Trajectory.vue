<template>
  <div>
    <div id="tChart" ref="tChart"></div>
  </div>
</template>

<script>
  let echarts = require('echarts');
  import store from '@/store';
  export default {
    name: 'trajectory',
    data () {
      return {};
    },
    mounted () {
      // 调用绘制图表的方法
      this.draw();
    },
    methods: {
      draw () {
        // 实例化echarts对象
        let myChart = echarts.init(this.$refs.tChart);
        this.$axios.get('../static/data/demo.json')
          .then((data) => {
            var hStep = 300 / (data.length - 1);
            let busLines = [].concat.apply([], data.map(function (busLine, idx) {
              var prevPt;
              var points = [];
              for (var i = 0; i < busLine.length; i += 2) {
                var pt = [busLine[i], busLine[i + 1]];
                if (i > 0) {
                  pt = [
                    prevPt[0] + pt[0],
                    prevPt[1] + pt[1]
                  ];
                }
                prevPt = pt;

                points.push([pt[0] / 1e4, pt[1] / 1e4]);
              }
              return {
                coords: points,
                lineStyle: {
                  normal: {
                    color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
                  }
                }
              };
            }));
            myChart.setOption({
              bmap: {
                center: [116.46, 39.92],
                zoom: 10,
                roam: true,
                mapStyle: store.state.mapStyle
              },
              series: [{
                type: 'lines',
                coordinateSystem: 'bmap',
                polyline: true,
                data: busLines,
                silent: true,
                lineStyle: {
                  normal: {
                    // color: '#c23531',
                    // color: 'rgb(200, 35, 45)',
                    opacity: 0.2,
                    width: 1
                  }
                },
                progressiveThreshold: 500,
                progressive: 200
              }, {
                type: 'lines',
                coordinateSystem: 'bmap',
                polyline: true,
                data: busLines,
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
              }]
            });
          });
      },
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
