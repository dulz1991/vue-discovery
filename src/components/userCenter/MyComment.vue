<template>
	<div >
		<navbar title="我评论的" showBack="true" backUrl="/user/index"></navbar>

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
import navbar from '@/components/include/Navbar'
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
  	navbar
  },
  methods: {
	init: function(){
		var parm = {};
		parm.pageNo=1;
		parm.pageSize=-1;
		this.$http.get(this.BASE_URL+'/user/myComment', {params: parm}).then(function(res) {
			if(res.data.page.list!=undefined){
				this.items = res.data.page.list;	
			} else {
				this.items = [];
			}
		}, function(res) {
			this.bottomTip("获取数据异常")
		});
	},
	loadMore: function() {
			if(!this.hasComment){
				return;
			}
			var parm = {};
			parm.type='down';
			parm.discoveryId = this.item.id;
			parm.id=this.commentList[this.commentList.length-1].id;
			this.$http.get(this.BASE_URL+'/getCommentList', {params: parm}).then(function(res) {
				if(res.data.list != undefined){
					this.commentList = this.appendJson(res.data.list, this.commentList);	
				}
				if(res.data.list != undefined && res.data.list.length>=res.data.pageSize){
					this.hasComment = true;
				} else {
					this.hasComment = false;
				}
            }, function(res) {
				this.bottomTip(res.data.error);
            });
		}
		
  }
}
</script>


