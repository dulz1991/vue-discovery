<template>
	<div class="row">
      
		<form class="col s12 form" enctype="multipart/form-data" method="POST">
			
			<blockquote><h5 class="header">发表图文</h5></blockquote>
			<input id="username" type="hidden" name="username" class="validate">
			
		  <div class="row">
			<div class="input-field col s12">
			  <input id="title" type="text" name="title" class="validate">
			  <label for="title">标题</label>
			</div>
		  </div>
		  
		  <div class="row">
			<div class="input-field col s12">
				<textarea id="content" class="materialize-textarea" name="content"></textarea>
			  <label for="content">内容</label>
			</div>
		  </div>
		  
		  <div class="row">
			<div class="input-field col s12">
				<div class="file-field input-field">
				  <div class="btn">
					<span>上传图片</span>
					<input type="file" name="attachFile" accept="image/*">
				  </div>
				  <div class="file-path-wrapper">
					<input class="file-path validate" type="text">
				  </div>
				</div>
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
			var cookie_user = jQuery.common.getCookie(this.COOKIE_USERNAME);
			var parm = {};
			parm.cookie_user = cookie_user;
			jQuery.common.ajaxFileSubmit('.form', this.BASE_URL+'/auth/post', true, '/', parm);
			/*
			var parm = jQuery.common.getFormJson('.form');
			parm.cookie_user = cookie_user;
			this.$http.post(this.BASE_URL+'/auth/post',parm).then(function(res) {
				if(res.data.errorNo==200){
					self.location='/';
				} else {
					Materialize.toast(res.data.errorInfo, 3000);
				}
            }, function(res) {
				Materialize.toast(res.data, 3000);
            });
			*/
		}
	}
}
</script>

</style>
