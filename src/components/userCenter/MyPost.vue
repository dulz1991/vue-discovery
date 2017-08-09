<template>
	<div>
		<navbar title="我发布的" showBack="true" backUrl="/user/index"></navbar>
		
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
		
				<mt-cell  v-for="item in items" class="padding10" 
					:key="item.id"
					:href="'/detail?id=' + item.id "
					:title="item.content" 
					:label="item.createTime | formatDate">
					<span>点击: {{item.clickNum}}</span>
					<img v-if="item.imgPath" slot="icon" :src="MOBILE_IMG_URL + item.imgPath + '!32!32'" 
					width="32" height="32">
				</mt-cell>		
			
		</div>

		
		
		<!-- <div class="collection">
			<a class="collection-item" v-for="item in items" :href="'/detail?id=' + item.id ">
				<span class="badge blue" style="color:#fff;">点击:{{item.clickNum}} 评论:0</span>
				{{item.title}}
			</a>			
		</div> -->
	
	</div>
</template>

<script>
import { Header, Cell, Toast, InfiniteScroll, Popup } from 'mint-ui'
import {formatDate} from '@/filter/Filter';
import navbar from '@/components/include/Navbar'
export default {
  name: 'myPost',
  data () {
    return {
    	hasMore:false,
    	pageNo:1,
    	pageSize:-1,
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
		var _this = this;
		var parm = {};
		parm.pageNo=_this.pageNo;
		parm.pageSize=_this.pageSize;
		_this.$http.get(_this.BASE_URL+'/user/myPost', {params: parm}).then(function(res) {
			if(res.data.page.list!=undefined){
				_this.items = res.data.page.list;	
				if(_this.items.length>=_this.pageSize){
					_this.hasMore = true;
				} else {
					_this.hasMore = false;
				}
			} else {
				_this.items = [];
			}
		}, function(res) {
			_this.bottomTip("获取数据异常")
		});
	},
	loadMore: function() {
		return;
		var _this = this;
		if(!_this.hasMore){
			return;
		}
		_this.pageNo = _this.pageNo + 1;
		var parm = {};
		parm.pageNo=_this.pageNo;
		parm.pageSize=_this.pageSize;
		_this.$http.get(_this.BASE_URL+'/user/myPost', {params: parm}).then(function(res) {
			
			if(res.data.page.list!=undefined){
				_this.items =  _this.appendJson(res.data.page.list, _this.items);	
				if(res.data.page.list>=_this.pageSize){
					_this.hasMore = true;
				} else {
					_this.hasMore = false;
				}
			}
        }, function(res) {
			_this.bottomTip(res.data.error);
        });
	}

  }
}
</script>


