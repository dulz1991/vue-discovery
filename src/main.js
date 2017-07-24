// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import MyRouter from './router/index'
import Defines from './defines'
import Functions from './functions'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

//全局变量
Object.keys(Defines).forEach((key)=>{
    Vue.prototype[key] = Defines[key];
})
//全局方法
Object.keys(Functions).forEach((key)=>{
    Vue.prototype[key] = Functions[key];
})

//Vue.use(router)
Vue.use(VueResource)
Vue.use(MintUI)

Vue.http.options.emulateJSON = true
//Vue.http.options.xhr = { withCredentials: true };
//Vue.http.options.credentials = true;
Vue.http.options.crossOrigin = true
Vue.http.options.emulateHTTP = true

/*是否开启页面错误提示，默认为true*/
//Vue.config.productionTip = false

//拦截
/*Vue.http.interceptors.push((request, next)  =>{  
  next((response) => {
    return response; 
  });
});  */

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

  var result = Vue.prototype.urlInteceptor(url);
  if(result=='noLogin'){ //闇€瑕佺櫥褰?
    return self.location='/login/index?redirectUrl='+window.location.href;
  }

  return MyRouter.routes[url] || NotFound;
}