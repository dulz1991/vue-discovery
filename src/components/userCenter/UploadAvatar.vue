<template>
	<div>
		<mt-header fixed title="上传头像">
	        <a href="/user/info" slot="left">
	            <mt-button icon="back">返回</mt-button>
	          </a>
	          <mt-button slot="right">
	            <a href="javascript:;" class="link-btn">...</a>
	          </mt-button>
	      </mt-header>
	    <br><br><br>
			
		<form class="form" action="javascript:;">
			<div class="row">
	          <div class="col s12">
	            <div class="input-field inline">
	            	<mt-button type="default" @click="triggerInput">选择文件</mt-button>
	            	<mt-button type="primary" @click="doSubmit">上传</mt-button>
	              <!-- <a class="waves-effect waves-light btn red" @click="triggerInput">选择文件</a>
	              <a class="waves-effect waves-light btn" @click="doSubmit">上传</a> -->
	            </div>
	          </div>
	        </div>
			
			<div class="row">
	    		<div style="margin:10px; width:200px;">
					<input type="file" style="display:none;" name="attachFile" id="doc" multiple="multiple"
					 @change="selectImg('doc','dd')" accept="image/*" />
					<div>
						<img width="200px" height="200px" id="dd" src="/static/images/z_add.png">
					</div>
				</div>
	    	</div>
        </form>
	
	</div>
</template>

<script>
import { Header, Cell, Toast } from 'mint-ui'
export default {
  name: 'uploadAvatar',
  data () {
    return {
    	
    }
  },
  mounted: function () {
	this.init();
  },
  components:{
  	
  },
  methods: {
	init: function(){
		
	},
	doSubmit: function(){
		this.ajaxFileSubmit('.form', this.BASE_URL+'/user/uploadAvatar', true, '/user/info');
		/*var formData = new FormData($(".form")[0]); 
		console.log(formData);
		this.$http.post(this.BASE_URL+'/user/uploadAvatar',formData).then(function(res) {
		    if(res.data.errorNo==200){
		      this.bottomTip('上传成功');
		      setTimeout("self.location='/user/index';",500);
		    } else {
		    	this.bottomTip(res.data.errorInfo);
		    }
		  }, function(res) {
		    this.bottomTip("获取数据异常")
		});*/
	},
	triggerInput: function(){
		$('input[name="attachFile"]').trigger('click');
	},
	selectImg: function(source, target){
		this.setImagePreviews(source, target);
	}
  }
}
</script>


