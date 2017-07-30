<template>
	<div>
		<mt-header fixed title="我收藏的">
	     	<a href="/user/index" slot="left">
	        	<mt-button icon="back">返回</mt-button>
	      	</a>
	      	<mt-button slot="right">
	      		<a href="javascript:;" class="link-btn">...</a>
		      </mt-button>
	    </mt-header>
		<br><br>
		
		<mt-cell v-for="item in items"  class="padding10" 
			:key="item.discoveryId"
			:href="'/detail?id=' + item.discoveryId "
			:title="item.content" 
			:label="item.createTimeStr">
			<span>作者: {{item.postName}}</span>
			<img v-if="item.imgPath" slot="icon" :src="MOBILE_IMG_URL + item.imgPath + '!32!32'" 
			width="32" height="32">
		</mt-cell>

		<!-- <div class="collection">
			<a class="collection-item" v-for="item in items" :href="'/detail?id=' + item.discoveryId ">
				<span class="badge blue" style="color:#fff;">点击:{{item.clickNum}} 评论:0</span>
				{{item.title}}
			</a>			
		</div> -->

		<h4 v-if="!hasItems">
			{{noItemsTip}}
		</h4>
	
	</div>
</template>

<script>
import { Header, Cell,Toast } from 'mint-ui'
import {formatDate} from '@/filter/Filter';
export default {
  name: 'myPost',
  data () {
    return {
      	hasItems : false,
      	noItemsTip : '暂无收藏',
      	items: []
    }
  },
  components:{
  	
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
			this.bottomTip("获取数据异常")
		});
	}
  }
}
</script>


