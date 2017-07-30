<template>
	<div >
		<mt-header fixed title="我评论的">
	     	<a href="/user/index" slot="left">
	        	<mt-button icon="back">返回</mt-button>
	      	</a>
	      	<mt-button slot="right">
	      		<a href="javascript:;" class="link-btn">...</a>
		      </mt-button>
	    </mt-header>
		<br><br>

		<mt-cell v-for="item in items"  class="padding10" 
			:key="item.id"
			:href="'/detail?id=' + item.id "
			:title="item.content" 
			:label="item.createTime | formatDate">
			<span>评论: {{item.commentCount}}</span>
			<img v-if="item.imgPath" slot="icon" :src="MOBILE_IMG_URL + item.imgPath + '!32!32'" 
			width="32" height="32">
		</mt-cell>
		
		<!-- <div class="collection">
			<a class="collection-item" v-for="item in items" :href="'/detail?id=' + item.id ">
				<span class="badge blue" style="color:#fff;">点击:{{item.clickNum}} 评论:0</span>
				{{item.title}}
			</a>			
		</div> -->
	
	</div>
</template>

<script>
import { Header, Cell,Toast } from 'mint-ui'
import {formatDate} from '@/filter/Filter';
export default {
  name: 'myComment',
  data () {
    return {
      	items: []
    }
  },
   mounted: function () {
		this.init();
   },
   components:{
  	
  },
  methods: {
	init: function(){
		var parm = {};
		parm.pageNo=1;
		this.$http.get(this.BASE_URL+'/user/myComment', {params: parm}).then(function(res) {
			if(res.data.page.list!=undefined){
				this.items = res.data.page.list;	
			} else {
				this.items = [];
			}
		}, function(res) {
			this.bottomTip("获取数据异常")
		});
	}
  }
}
</script>


