// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex'
import store from './store';
import App from './App';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './common/scss/reset.scss';
import * as filters from './filter';

// 引入全部Mint组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

/* 使用axios获取数据 */
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

/* 使用vuex来共享组件状态 */
Vue.use(Vuex);

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper, /* { default global options } */);

// vue-croppa
import Croppa from 'vue-croppa';
import 'vue-croppa/dist/vue-croppa.css';
Vue.use(Croppa);

// 公共filter
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
