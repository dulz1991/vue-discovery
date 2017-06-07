// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import MyRouter from './router/index'
import Defines from './defines'

//全局变量
Object.keys(Defines).forEach((key)=>{
    Vue.prototype[key] = Defines[key];
})

//Vue.use(router)
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
//Vue.http.options.xhr = { withCredentials: true };
//Vue.http.options.credentials = true;

//Vue.config.productionTip = false


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
      return MyRouter.routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
