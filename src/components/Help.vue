<template>
	<div>
		<mt-header fixed title="帮助中心">
        	<a href="/user/set" slot="left">
            	<mt-button icon="back">返回</mt-button>
          	</a>
          	<mt-button slot="right">
            	<a href="javascript:;" class="link-btn">...</a>
          	</mt-button>
      	</mt-header>
    	<br><br>
		

		<div class="padding10">
			<p>1.登陆后可发表图文信息</p>
			<p>2.页面右下角圆形按钮即为底部导航，点击可展示</p>
			<p>3.页面左上角的图标点击会有侧边栏显示</p>
		</div>
		
	</div>
</template>

<script>
import { Header, Cell, Toast } from 'mint-ui'
export default {
  name: 'help',
  data () {
    return {
      
    }
  },
  components:{
  	
  },
  mounted: function () {
	
  }
}
</script>

