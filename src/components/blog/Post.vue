<template>
	<div>
		<navbar title="发布" showBack="true" backUrl="/user/index"></navbar>
      
		<form class="form padding10" enctype="multipart/form-data" method="POST" action="javascript:;">
		<h2></h2>
		  
			<div class="row">
				<p>内容</p>
				<textarea id="content" class="materialize-textarea" rows="6" style="width:98%" name="content"></textarea>			 
			</div>
		  
		  <div class="row">
			<p>选择图片</p>
			<!-- <input type="file" name="attachFile" accept="image/*"> -->

			<div class="row">
	    		<div style="margin:10px; width:200px;">
					<input type="file" style="display:none;" name="attachFile" id="doc" multiple="multiple"
					 @change="selectImg('doc','dd')" accept="image/*" />
					<div>
						<img width="200px" height="200px" id="dd" src="/static/images/z_add.png" 
						@click="triggerInput">
					</div>
				</div>
	    	</div>

		  </div>
		  
		  <p>
		  	<mt-button type="primary" @click="doPost">发布</mt-button>
		  </p>

		</form>
	  
	</div>
</template>

<script>
import { Header, Cell, Toast } from 'mint-ui'
import navbar from '@/components/include/Navbar'
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
  	navbar
  },
  methods: {
		doPost: function () {
			this.ajaxFileSubmit('.form', this.BASE_URL+'/discovery/post', true, '/');
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

<style type="text/css" scoped="">

</style>
