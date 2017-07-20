<template>
  <div class="">
    <nav class="" style="margin:0;padding:0">
      <div class="nav-wrapper">
        <span class="brand-logo" style="display:none;">
          <a href="/login">登录</a> | <a href="/regist">注册</a>
        </span>
        <a href="#" data-activates="mobile-demo" class="button-collapse">
          <i class="fa fa-bars" style="font-size:28px;"></i>
        </a>
        <ul class="right hide-on-med-and-down">
          <li><a href="/help">帮助中心{{value}}</a></li>
          <li><a href="/about">关于本站</a></li>
          <li><a href="/post">我要发表</a></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
          <li><a href="/help">帮助中心{{value}}</a></li>
          <li><a href="/about">关于本站</a></li>
          <li><a href="/post">我要发表</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      
    }
  },
  props: ['title'],
  mounted: function () {
    this.init();
  },
  methods: {
    init: function(){
      document.title = this.title
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
