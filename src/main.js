// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import iView from 'iview';
import axios from 'axios';
import store from '@/store';
import 'leaflet/dist/leaflet.css';
import 'iview/dist/styles/iview.css'
import '@/permission';
import * as L from 'leaflet';
import * as Provider from 'leaflet.chinatmsproviders';
require('echarts/extension/bmap/bmap');

// 全局注册
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(iView);
Vue.L = Vue.prototype.$L = L;
Vue.Provider = Vue.prototype.$Provider = Provider;

// 服务器网站，服务器需允许跨域访问
Vue.prototype.bUrl = store.state.bUrl;

// 设置请求超时时间
axios.defaults.timeout = 5000;

// 是否是部署环境
Vue.prototype.$isOnServer = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App) // 相当于 components: { App }  vue1.0的写法
});
