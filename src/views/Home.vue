<template>
  <div>
    <div id="map"></div>
    <Button  id="map_home" class="rightmenu" @click="returnHome"  icon="ios-home" type="primary" shape="circle" title="home"></Button>
    <Dropdown class="rightmenu" style="margin-left: 20px" placement="bottom-end">
      <Button type="primary">
        {{msg}}
        <Icon type="ios-arrow-down"></Icon>
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="mapSet('gd')">高德地图</DropdownItem>
        <DropdownItem @click.native="mapSet('glg')">谷歌地图</DropdownItem>
        <DropdownItem @click.native="mapSet('box')">MapBox</DropdownItem>
        <DropdownItem @click.native="mapSet('osm')">OSM地图</DropdownItem>
        <DropdownItem @click.native="mapSet('geo')">智图</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>

</template>

<script>
  import store from '@/store';
  export default {
    name: 'home',
    data () {
      return {
        map: null,
        L: null,
        baseLayer: null,
        msg: '高德地图',
        map_config: {
          zoom: 15,
          center: [30.541093, 114.360734],
          minZoom: 2,
          maxZoom: 18
          // key: "eb35dddb3aa33c7a8fb4218b39d1e424"  天地图key
        }
      };
    },
    mounted () {
      this.initMap();
    },
    methods: {
      initMap () {
        this.L = L;
        let map = L.map("map", {
          center: this.map_config.center,
          zoom: this.map_config.zoom
        });
        this.map = map;
        this.addLayer(L, map, store.state.layerItems['gd_n_a'],18, 3);
      },
      addLayer (L, map, layer_name, maxZoom, minZoom) {
        if (this.baseLayer !== null) {
          map.removeLayer(this.baseLayer);
        }
        this.baseLayer = L.tileLayer.chinaProvider(layer_name, {
          maxZoom: maxZoom === undefined ? this.map_config.maxZoom : maxZoom,
          minZoom: minZoom === undefined ? this.map_config.minZoom : minZoom
        });
        map.addLayer(this.baseLayer);
      },
      returnHome () {
        this.map.setView(this.map_config.center, 15);
      },
      mapSet (map_name, L = this.L, map = this.map) {
        switch (map_name) {
          case 'gd':
            this.addLayer(L, map, store.state.layerItems['gd_n_a'], 18, 3);
            this.msg = '高德地图 ';
            break;
          case 'glg':
            this.addLayer(L, map, store.state.layerItems['glg_n']);
            this.msg = '谷歌地图 ';
            break;
          case 'geo':
            this.addLayer(L, map, store.state.layerItems['geo_n_g'], 16);
            this.msg = '   智图   ';
            break;
          case 'osm':
            this.addLayer(L, map, store.state.layerItems['osm']);
            this.msg = 'OSM地图';
            break;
          case 'box':
            if (this.baseLayer !== null) {
              map.removeLayer(this.baseLayer);
            }
            this.baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?' +
              'access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
              {
                id: store.state.layerItems['box'],
                minZoom: 3
              });
            map.addLayer(this.baseLayer);
            this.msg = 'Mapbox';
            break;
          default:
            break;
        }
      },
    },
  }
</script>

<style scoped>
  #map {
    width: 100%;
    height: calc(88vh);
    position: relative;
  }
  .rightmenu{
    position: absolute;
    top: 30px;
    right: 70px;
    z-index: 1000;
  }
  #map_home{
    right: 30px;
  }
</style>
