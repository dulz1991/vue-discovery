<template>
	<div class="row">
		
		<navbar ref="navbar" title="首页"></navbar>

		<div class="row col s12">
			<blockquote><h5 class="header">{{title}}</h5></blockquote>
			<p>1.登陆后可发表图文信息</p>
			<p>2.页面右下角圆形按钮即为底部导航，点击可展示</p>
			<p>3.页面左上角的图标点击会有侧边栏显示</p>
		</div>
		
	</div>
</template>

<script>
import navbar from '@/components/include/Navbar'
export default {
  name: 'help',
  data () {
    return {
      title: '帮助中心'
    }
  },
  components:{
  	navbar
  },
  mounted: function () {
	
  }
}
</script>

