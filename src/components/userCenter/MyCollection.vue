<template>
	<div class="row">
		<navbar ref="navbar" title="我收藏的"></navbar>
		<vueHeadTitle :value="title"></vueHeadTitle>
		
		<div class="collection">
			<a class="collection-item" v-for="item in items" :href="'/detail?id=' + item.discoveryId ">
				<!-- <span class="badge blue" style="color:#fff;">点击:{{item.clickNum}} 评论:0</span> -->
				{{item.title}}
			</a>			
		</div>

		<h4 v-if="!hasItems">
			{{noItemsTip}}
		</h4>
	
	</div>
</template>

<script>
import navbar from '@/components/include/Navbar'
export default {
  name: 'myPost',
  data () {
    return {
    	title: '我收藏的',
      	hasItems : false,
      	noItemsTip : '暂无收藏',
      	items: []
    }
  },
  components:{
  	navbar
  },
   mounted: function () {
		this.init();
   },
  methods: {
	init: function(){
		var parm = {};
		parm.pageNo=1;
		this.$http.get(this.BASE_URL+'/user/myCollection', {params: parm}).then(function(res) {
			this.items = res.data.list;
			if(this.items.length>0){
				this.hasItems=true;
			}
		}, function(res) {
			Materialize.toast(res.data.error, 3000);
		});
	}
  }
}
</script>


