<template>
	<div class="row">
		<vueHeadTitle :value="title"></vueHeadTitle>

		<h4>暂时没有什么好显示的...</h4>
		<img src="/static/images/tu1.jpg" />
	</div>
</template>

<script>
import vueHeadTitle from '@/components/include/Title'
export default {
  name: 'myInfo',
  data () {
    return {
    	title: '我的资料',
      	isLogin : ''
    }
  },
   mounted: function () {
		document.title= this.title;
		this.isLogin = jQuery.common.isLogin();
		this.init();
   },
  methods: {
	init: function(){
		
	}
  }
}
</script>


