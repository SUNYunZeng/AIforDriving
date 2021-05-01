<template>
  <div class="map">
  </div>
</template>

<script>
  import store from '@/store'
  export default {
    name: 'LeftletMap',
    data: function () {
      return {
        L: null,
        map: null,
        map_config: store.state.mapconfig
      };
    },
    methods: {
      initMap () {
        this.L = L;
        let map = L.map(this.$el, {
          center: this.map_config.center,
          zoom: this.map_config.zoom
        });
        this.map = map;
        let baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?' +
          'access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
          {
            id: store.state.layerItems['box_d'],
            minZoom: 3
          });
        map.addLayer(baseLayer);
      }
    },
    mounted () {
      this.initMap();
    }
  };
</script>

<style scoped>
  .map {
    width: 100%;
    height: calc(88vh);
    position: relative;
  }
</style>
