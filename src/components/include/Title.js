import Vue from 'vue'


Vue.component('vueHeadTitle', {
  // 声明 props
  props: ['value'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像 “this.message” 这样使用
  template: '<div class="row col s12"><blockquote><h5 class="header">{{value}}</h5></blockquote></div>'
})



