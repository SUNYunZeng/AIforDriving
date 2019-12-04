import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
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
    }
  },
  mutations: {
    setMenus (state, items) {
      state.menuItems = [...items];
    },
  }
});

export default store;
