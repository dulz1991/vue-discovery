// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
//import router from './router/index'

import Home from '@/components/Home'
import Login from '@/components/Login'
import Regist from '@/components/Regist'
import Help from '@/components/Help'
import About from '@/components/About'
import Detail from '@/components/blog/Detail'
import Post from '@/components/blog/Post'

const NotFound = { template: '<p>Page not found</p>' }

//全局变量
global.BASE_URL="http://192.168.9.109:8084";
global.BASE_IMG_URL="http://192.168.9.109:8095";
//global.BASE_URL="http://my.springboot/";
global.COOKIE_USERNAME="cookie_user";

//Vue.use(router)
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
//Vue.http.options.xhr = { withCredentials: true };
//Vue.http.options.credentials = true;

//Vue.config.productionTip = false

const routes = {
  '/': Home,
  '/login': Login,
  '/regist': Regist,
  '/about': About,
  '/help': Help,
  '/detail': Detail,
  '/post': Post
}

/*
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  //template: '<App/>',
  //components: { App }
})
*/


new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
