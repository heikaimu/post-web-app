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

Vue.config.productionTip = false;

// 引入全部Mint组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

/* 使用axios获取数据 */
// axios.defaults.baseURL = 'http://localhost:5000';
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

// 路由拦截
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.loginIfo.isLogin) {  // 通过vuex 判断是否已经登录
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

// 全局指令
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, {value}) {
    // 聚焦元素
    if (value) {
      el.focus()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
