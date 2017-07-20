<template>
	<div class="row">
		<navbar ref="navbar" title="我要反馈"></navbar>
		<vueHeadTitle :value="title"></vueHeadTitle>

		<h4>暂时也没有什么好反馈的...</h4>
		<img src="/static/images/tu1.jpg" />
	</div>
</template>

<script>
import vueHeadTitle from '@/components/include/Title'
import navbar from '@/components/include/Navbar'
export default {
  name: 'feedback',
  data () {
    return {
    	title: '我要反馈'
    }
  },
   mounted: function () {
		document.title=this.title;
		this.init();
   },
   components:{
  	navbar
  },
  methods: {
	init: function(){
		
	}
  }
}
</script>


