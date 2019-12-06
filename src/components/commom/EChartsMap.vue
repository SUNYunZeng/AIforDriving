<template>
    <div class="bmap"></div>
</template>

<script>
  import store from '@/store';
  let echarts = require('echarts');
  export default {
    name: 'EChartsMap',
    props: ['option'],
    watch:{
      option: function (option) {
        this.myChart.setOption(option);
      }
    },
    data(){
      return {
        myChart: null
      }
    },
    mounted(){
      this.draw();
    },
    methods: {
      draw () {
        this.myChart = echarts.init(this.$el);
        this.myChart.setOption({
          bmap:{
            center: [114.03, 22.32],
            zoom: 10,
            roam: true,
            mapStyle: store.state.mapStyle
          }});
      },
    }
  };
</script>

<style scoped>
.bmap{
  width: 100%;
  height: calc(78vh);
  position: relative;
}
</style>
