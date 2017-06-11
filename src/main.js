// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import MyRouter from './router/index'
import Defines from './defines'

const NotFound = { template: '<p>Page not found</p>' }

//全局变量
Object.keys(Defines).forEach((key)=>{
    Vue.prototype[key] = Defines[key];
})

//Vue.use(router)
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
//Vue.http.options.xhr = { withCredentials: true };
//Vue.http.options.credentials = true;
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;

/*是否开启页面错误提示，默认为true*/
//Vue.config.productionTip = false

Vue.http.interceptors.push((request, next)  =>{  
  /*request.headers.set('AuthKey', 'ssh')*/
  next((response) => {
    return response; 
  });

});  

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
    return routeInteceptors(this)
      /*return MyRouter.routes[this.currentRoute] || NotFound*/
    }
  },
  render (h) { return h(this.ViewComponent) }
})

function routeInteceptors(obj){
  let url = obj.currentRoute;
  if(url.indexOf('user')>0){
    let isLogin = jQuery.common.isLogin();  
    if(!isLogin){
      return MyRouter.routes['/login'];
    }  
  }
  return MyRouter.routes[obj.currentRoute] || NotFound;
}