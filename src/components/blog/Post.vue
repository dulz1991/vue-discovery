<template>
	<div>
		<mt-header fixed title="发布">
	        <a href="/user/index" slot="left">
	            <mt-button icon="back">返回</mt-button>
	          </a>
	          <mt-button slot="right">
	            <a href="javascript:;" class="link-btn">...</a>
	          </mt-button>
	      </mt-header>
	    <br><br>
      
		<form class="form padding10" enctype="multipart/form-data" method="POST" action="javascript:;">
		<h2></h2>
		  <!-- <div class="row">
		  			<div class="input-field col s12">
		  			  <input id="title" type="text" name="title" class="validate">
		  			  <label for="title">标题</label>
		  			</div>
		  </div> -->
		  
			<div class="row">
				<p>内容</p>
				<textarea id="content" class="materialize-textarea" rows="6" style="width:98%" name="content"></textarea>			 
			</div>
		  
		  <div class="row">
			<p>选择图片</p>
			<input type="file" name="attachFile" accept="image/*">
		  </div>
		  
		  <p>
		  	<mt-button type="primary" @click="doPost">发布</mt-button>
		  </p>

		  <!-- <div class="row">
		  			<div class="col s12">
		  			  <div class="input-field inline">
		  				<a class="waves-effect waves-light btn" v-on:click="doPost">发表</a>
		  				<a href="/" class="waves-effect waves-light waves-orange btn" style="background-color:#aaa;">首页</a>
		  			  </div>
		  			</div>
		  </div> -->
		</form>
	  
	</div>
</template>

<script>
import { Header, Cell, Toast } from 'mint-ui'
export default {
  name: 'Post',
  data () {
    return {
      isLogin : ''
    }
  },
  mounted: function () {
	
  },
  components:{
  	
  },
  methods: {
		doPost: function () {
			var _this = this;
			$('.form').ajaxSubmit({  
	            type:'post',  
	            cache: false,  
	            url: this.BASE_URL+'/discovery/post', 
	            dataType : 'json', 
	            success : function(data, status) {  
	            	if(data.errorNo==400){
	            		self.location='/login';
	            	}
	                if(data.errorNo==200){
	                	_this.bottomTip('发布成功');
	                    self.location= '/user/index';
	                } else {
	                	_this.bottomTip(data.errorInfo);
	                }
	            },  
	            error : function(data, status, e) {  
	                _this.bottomTip("上传失败");
	            }   
	        });
			/*this.ajaxFileSubmit('.form', this.BASE_URL+'/discovery/post', true, '/', parm);*/
		}
	}
}
</script>

<style type="text/css" scoped="">

</style>
