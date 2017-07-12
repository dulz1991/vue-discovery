<template>
  <div class="row" style="margin-top:10%;">
    <form class="col s12 form">
		<div class="row">
			<h3 class="light header center-align">注册</h3>
		</div>
		
      <div class="row">
        <div class="input-field col s12">
          <input id="last_name" type="text" name="username" class="validate">
          <label for="last_name">昵称</label>
        </div>
      </div>
      
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" name="password" class="validate">
          <label for="password">密码</label>
        </div>
      </div>
      
      <div class="row">
        <div class="col s12">
          <div class="input-field inline">
            <a class="waves-effect waves-light btn" v-on:click="doRegist">注册</a>
			<a href="/" class="waves-effect waves-light waves-orange btn" style="background-color:#aaa;">首页</a>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Regist',
  data () {
    return {
      msg: 'regist'
    }
  },
  mounted: function () {
	document.title="注册";
  },
  methods: {
		doRegist: function () {
			var parm = jQuery.common.getFormJson('.form');
			console.log(parm);
			this.$http.post(this.BASE_URL+'/doRegist',parm
            ).then(function(res) {
				if(res.data.errorNo==200){
					Materialize.toast(res.data.tip, 3000);
					setTimeout("self.location='/login';",2000);
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

