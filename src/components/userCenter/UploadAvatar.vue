<template>
	<div class="row">
		<vueHeadTitle :value="title"></vueHeadTitle>
			
		<form class="form">
			<div class="row">
	          <div class="col s12">
	            <div class="input-field inline">
	              <a class="waves-effect waves-light btn red" @click="triggerInput">选择文件</a>
	              <a class="waves-effect waves-light btn" @click="doSubmit">上传</a>
	              <a href="/user/index" class="waves-effect waves-light waves-orange btn" style="background-color:#aaa;">返回</a>
	            </div>
	          </div>
	        </div>
			
			<div class="row">
	    		<div style="margin:10px; width:200px;">
					<input type="file" style="display:none;" name="attachFile" id="doc" multiple="multiple" onchange="jQuery.common.setImagePreviews('doc','dd');" accept="image/*" />
					<div>
						<img width="200px" height="200px" id="dd" src="/static/images/z_add.png">
					</div>
				</div>
	    	</div>
        </form>
	
	</div>
</template>

<script>
import vueHeadTitle from '@/components/include/Title'
export default {
  name: 'uploadAvatar',
  data () {
    return {
    	title: '上传头像',
      	isLogin : ''
    }
  },
   mounted: function () {
		document.title=this.title;
		this.isLogin = jQuery.common.isLogin();
		this.init();
   },
  methods: {
	init: function(){
		
	},
	doSubmit: function(){
		var formData = new FormData($(".form")[0]); 
		formData.append("cookie_user", jQuery.common.getCookie(this.COOKIE_USERNAME));
		console.log(formData);
		this.$http.post(this.BASE_URL+'/user/uploadAvatar',formData).then(function(res) {
		    if(res.data.errorNo==200){
		      Materialize.toast(res.data.tip, 1000);
		      setTimeout("self.location='/user/index';",500);
		    } else {
		      Materialize.toast(res.data.errorInfo, 3000);
		    }
		  }, function(res) {
		    console.log(res);
		    Materialize.toast(res.data.statusText, 3000);
		});
	},
	triggerInput: function(){
		$('input[name="attachFile"]').trigger('click');
	}
  }
}
</script>


