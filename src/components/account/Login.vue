<template>
  <div class="row" style="margin-top:10%;">
    <form class="col s12 form">
		<div class="row">
			<h3 class="light header center-align">登录</h3>
		</div>
	
      <div class="row">
        <div class="input-field col s12">
          <input id="last_name" type="text" name="username" class="validate">
          <label for="last_name">昵称</label>
        </div>
      </div>
      
      <div class="row">
        <div class="input-field col s12">
          <input id="password" name="password" type="password" class="validate">
          <label for="password">密码</label>
        </div>
      </div>
      
      <div class="row">
        <div class="col s12">
          <div class="input-field inline">
            <a class="waves-effect waves-light btn" v-on:click="doLogin">登录</a>
			<a href="/" class="waves-effect waves-light waves-orange btn" style="background-color:#aaa;">首页</a>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'login'
    }
  },
  mounted: function () {
	document.title="登录";
	jQuery.common.isLogin();
  },
  methods: {
		doLogin: function () {
			var parm = jQuery.common.getFormJson('.form');
			console.log(parm);
			this.$http.post(this.BASE_URL+'/doLogin',parm).then(function(res) {
				if(res.data.errorNo==200){
					jQuery.common.setCookie(this.COOKIE_USERNAME,res.data.username , -1);
					Materialize.toast(res.data.tip, 500);
					setTimeout("self.location='/';",500);
				} else {
					Materialize.toast(res.data.errorInfo, 3000);
				}
      }, function(res) {
				Materialize.toast(res.data, 3000);
      });
		}
	}
}
</script>
