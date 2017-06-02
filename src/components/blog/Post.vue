<template>
	<div class="row">
      
		<form class="col s12 form">
		
		  <div class="row">
			<div class="input-field col s12">
			  <input id="title" type="text" name="title" class="validate">
			  <label for="title">标题</label>
			</div>
		  </div>
		  
		  <div class="row">
			<div class="input-field col s12">
			  <input id="content" name="content" type="text" class="validate">
			  <label for="content">内容</label>
			</div>
		  </div>
		  
		  <div class="row">
			<div class="col s12">
			  <div class="input-field inline">
				<a class="waves-effect waves-light btn" v-on:click="doPost">发表</a>
				<a href="/" class="waves-effect waves-light waves-orange btn" style="background-color:#aaa;">首页</a>
			  </div>
			</div>
		  </div>
		  
		</form>
	  
	</div>
</template>

<script>
export default {
  name: 'Post',
  data () {
    return {
      isLogin : ''
    }
  },
  mounted: function () {
	document.title="我要发表";
	this.isLogin = jQuery.common.isLogin();
  },
  methods: {
		doPost: function () {
			if(!this.isLogin){
				self.location=self.location='/login';
				return;
			}
			this.$http.post(BASE_URL+'/auth/post').then(function(res) {
				if(res.data.errorNo==200){
					Materialize.toast(res.data.errorInfo, 3000);
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

</style>
