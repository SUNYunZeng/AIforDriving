import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 服务器地址
    bUrl: 'http://localhost:3000/api/',
    magicNum: {
      'user1': [114.250663, 0.086436, 22.744553, 0.051849],
      'user2': [114.05941, 0.069559, 22.633552, 0.056518],
      'user3' :[114.374747, 0.099517, 22.758982, 0.055779],
      'user4' :[113.888713, 0.140422, 22.625372, 0.288917]
    },
    // 左侧菜单栏数据
    menuItems: [
      {
        name: 'home', // 要跳转的路由名称 不是路径
        size: 22, // icon大小
        type: 'md-home', // icon类型
        text: '主页', // 文本内容
      },
      {
        name: 'prediction',
        text: '目的地预测',
        type: 'ios-car-outline',
        size: 22,
      },
      {
        text: '数据视图',
        type: 'md-globe',
        size: 22,
        children: [
          {
            text: '可视化',
            type: 'ios-eye',
            size: 20,
            children: [
              {
                type: 'logo-steam',
                name: 'trajectory',
                text: '轨迹'
              },
              {
                type: 'ios-contrast',
                name: 'od',
                text: 'OD点'
              }
            ]
          },
          {
            type: 'ios-grid',
            name: 't1',
            text: '表检索',
            hidden: false, // 隐藏此菜单 可以通过在地址栏上输入对应的 URL 来显示页面
          }
        ]
      },
      {
        name: 'about',
        text: '关于',
        type: 'ios-cafe',
        size: 22,
      },
    ],
    // 底图数据
    layerItems: {
      'tdt_n': 'TianDiTu.Normal.Map',
      'tdt_n_a': 'TianDiTu.Normal.Annotion',
      'tdt_s': 'TianDiTu.Satellite.Map',
      'tdt_s_a': 'Satellite.Annotion',
      'gd_n_a': 'GaoDe.Normal.Map',
      'gd_s': 'GaoDe.Satellite.Map',
      'gd_s_a': 'GaoDe.Satellite.Annotion',
      'glg_n': 'Google.Normal.Map',
      'glg_s': 'Google.Satellite.Map',
      'geo_n': 'Geoq.Normal.Map',
      'geo_n_p': 'Geoq.Normal.PurplishBlue',
      'geo_n_g': 'Geoq.Normal.Gray',
      'geo_n_w': 'Geoq.Normal.Warm',
      'geo_n_h': 'Geoq.Normal.Hydro',
      'osm': 'OSM.Normal.Map',
      'box_d': 'mapbox.dark',
      'box_l': 'mapbox.light',
      'box': 'mapbox.streets'
    },
    //地图配置
    mapconfig: {
      zoom: 15,
      center: [30.541093, 114.360734],
      minZoom: 2,
      maxZoom: 18
    },
    //百度地图样式
    mapStyle: {
      'styleJson': [
        {
          'featureType': 'water',
          'elementType': 'all',
          'stylers': {
            'color': '#031628'
          }
        },
        {
          'featureType': 'land',
          'elementType': 'geometry',
          'stylers': {
            'color': '#000102'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#000000'
          }
        },
        {
          'featureType': 'arterial',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#0b3d51'
          }
        },
        {
          'featureType': 'local',
          'elementType': 'geometry',
          'stylers': {
            'color': '#000000'
          }
        },
        {
          'featureType': 'railway',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#000000'
          }
        },
        {
          'featureType': 'railway',
          'elementType': 'geometry.stroke',
          'stylers': {
            'color': '#08304b'
          }
        },
        {
          'featureType': 'subway',
          'elementType': 'geometry',
          'stylers': {
            'lightness': -70
          }
        },
        {
          'featureType': 'building',
          'elementType': 'geometry.fill',
          'stylers': {
            'color': '#000000'
          }
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#857f7f'
          }
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#000000'
          }
        },
        {
          'featureType': 'building',
          'elementType': 'geometry',
          'stylers': {
            'color': '#022338'
          }
        },
        {
          'featureType': 'green',
          'elementType': 'geometry',
          'stylers': {
            'color': '#062032'
          }
        },
        {
          'featureType': 'boundary',
          'elementType': 'all',
          'stylers': {
            'color': '#465b6c'
          }
        },
        {
          'featureType': 'manmade',
          'elementType': 'all',
          'stylers': {
            'color': '#022338'
          }
        },
        {
          'featureType': 'label',
          'elementType': 'all',
          'stylers': {
            'visibility': 'off'
          }
        }
      ]
    }
  },
  mutations: {
    setMenus (state, items) {
      state.menuItems = [...items];
    },
    setMap(state, key, value) {
      state.mapconfig[key] = value;
    }
  }
});

export default store;
