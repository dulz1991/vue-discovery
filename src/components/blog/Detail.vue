<template>
<div>
	<navbar title="" showBack="true" backUrl="/"></navbar>

    <div class="item">
		<div>
			<img :src="BASE_IMG_URL+item.avatar" class="avatar">
			<span class="item-head">{{item.username}}</span>
		</div>
		<div>{{item.content}}</div>
		<div>
			<img v-lazy="BASE_IMG_URL+item.imagePath" v-if="item.imagePath" width="98%" @click="clickImg">
			<big-img v-if="showImg" @viewIt="viewIt" :imgSrc="BASE_IMG_URL+item.imagePath"></big-img>
		</div>
		<div class="footer">
			<span>{{item.createTimeStr}} | </span>
			<span>评论:{{item.commentCount}} | </span>
			<span>收藏:{{item.collectionCount}}</span>
		</div>
	</div>
		
	<!-- 评论区 -->
	<br>
	<p style="padding:0;margin:0 0 5px 10px;">评论 {{item.commentCount}}</p>
	<div id="commentList">
		<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
			<li v-for="c in commentList">
				<div>
					<img :src="BASE_IMG_URL+c.fromAvatar" class="avatar">
					<div class="item-head">
						<span>{{c.fromName}}</span>
						<br>
						<span style="color:#aaa;">{{c.createTimeStr}}</span>
					</div>
				</div>
				<div @click="commentForComment(c.id)">{{c.messageContent}}</div>
				<ul style="margin-top:10px;">
					<li  v-for="d in c.commentList">
						<div>
							<img :src="BASE_IMG_URL+d.fromAvatar" class="avatar">
							<div class="item-head">
								<span>{{d.fromName}}</span>
								<br>
								<span style="color:#aaa;">{{d.createTimeStr}}</span>
							</div>
						</div>
						<div>{{d.messageContent}}</div>	
					</li>
				</ul>
			</li>
		</ul>
	</div>
	<div style="margin-bottom:60px; text-align:center;">
		<p v-if="!hasComment">没有更多了</p>
	</div>
	
	<!-- 底部栏 -->
	<mt-tabbar fixed v-model="selected">
      	<mt-tab-item>
      		<div id="comment-bar">
	      		<span><input type="text" name="" placeholder="输入评论内容" v-model="commentContent"></span>
	      		<span>
	      			<img :src="this.BASE_IMG_URL + '/img/upload_24.png'" 
	      			@click="doComment">
	      		</span>
	      		<span>
	      			<img :src="this.BASE_IMG_URL + '/img/star_black_24.png'" v-if="!hasCollected" 
	      			@click="addCollection">
	      			<img :src="this.BASE_IMG_URL + '/img/star_red_24.png'" v-if="hasCollected"
	      			@click="cancelCollection">
	      		</span>
      		</div>
      	</mt-tab-item>
    </mt-tabbar>

    <mt-popup v-model="popupVisible" position="bottom" style="width:100%">
  		<commentPage v-on:listenToChileEnevt="closeCommentPage" ref="commentPage"></commentPage>
	</mt-popup>
	
</div>
</template>

<script>
import { Header, Toast, Tabbar, TabItem, Field, Lazyload, InfiniteScroll, Popup } from 'mint-ui'
import navbar from '@/components/include/Navbar'
import viewImg from '@/components/include/ViewImg'
import commentPage from '@/components/include/CommentPage'
export default {
  name: 'Detail',
  data () {
    return {
    	isLogin: false,
      	title : '',
	  	item : '',
	  	commentList: [], //评论列表
	  	hasComment:false, //是否有更多评论
	  	commentContent:'', //评论内容
	  	hasCollected: false, //是否已收藏
	  	
	  	popupVisible: false,

	  	showImg: false
    }
  },
  mounted: function () {
  	document.title='详情页';
  	this.isLogin=this.wasLogin();
	this.getDetail();
	//this.getCommentList();
  },
  components:{
  	navbar,
  	commentPage,
  	'big-img':viewImg
  },
  methods: {
		getDetail: function () {
			var parm = {};
			parm.id=this.getQueryString("id");
			this.$http.get(this.BASE_URL+'/discovery/getDetail', {params: parm}).then(function(res) {
				if(res.data.errorNo==404){
					self.location='/Notfound';
				}
				this.item=res.data.detail;
				this.hasCollected=res.data.hasCollected;
				this.getCommentList();
            }, function(res) {
            	this.midTip(res.data.error);
            });
		},
		getCommentList: function () {
			var _this = this;
			var parm = {};
			parm.discoveryId = _this.item.id;
			this.$http.get(this.BASE_URL+'/getCommentList', {params: parm}).then(function(res) {
				if(res.data.list != undefined){
					this.commentList = res.data.list;	
				}
				if(res.data.list != undefined && res.data.list.length>=res.data.pageSize){
					this.hasComment = true;
				} else {
					this.hasComment = false;
				}
            }, function(res) {
				this.bottomTip(res.data.error);
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
		},
		addCollection: function(){
			var parm = {};
			parm.discoveryId = this.item.id;
			this.$http.post(this.BASE_URL+'/addDiscoveryCollection', parm).then(function(res) {
				if(res.data.errorNo==200){
					this.hasCollected = true;
					this.bottomTip(res.data.errorInfo);
				} else if(res.data.errorNo==400) {
					self.location="/login?redirectUrl="+window.location.href;
				} else {
					this.bottomTip(res.data.errorInfo);
				}
		      }, function(res) {
		      	this.bottomTip(res.data.error);
		      });
		},
		cancelCollection: function() {
			var parm = {};
			parm.discoveryId = this.item.id;
			this.$http.post(this.BASE_URL+'/cancelDiscoveryCollection', parm).then(function(res) {
				if(res.data.errorNo==200){
					this.hasCollected = false;
					this.bottomTip(res.data.errorInfo);
				} else if(res.data.errorNo==400) {
					self.location="/login?redirectUrl="+window.location.href;
				} else {
					this.bottomTip(res.data.errorInfo);
				}
		      }, function(res) {
		      	this.bottomTip(res.data.error);
		      });
		},
		doComment : function(){
			var parm = {};
			parm.messageContent = this.commentContent;
			parm.discoveryId=this.item.id;
			parm.toId = this.item.userId;
			this.$http.post(this.BASE_URL+'/doComment', parm).then(function(res) {
				if(res.data.errorNo==400){
					self.location='/login?redirectUrl='+window.location.href;
				} else if(res.data.errorNo==200){
					this.commentContent = "";
					this.getCommentList();
					this.bottomTip("评论成功");
				} else {
					this.midTip(res.data.errorInfo);
				}
            }, function(res) {
            	this.midTip(res.data.error);
            });
		},
		commentForComment: function(commentId) {
			this.$refs.commentPage.commentId=commentId;
			this.$refs.commentPage.init();
			this.popupVisible=true;
		},
		closeCommentPage: function(arg) {
			this.popupVisible=arg;
			this.getCommentList();
		},
		viewIt: function(){
            this.showImg = false;
        },
        clickImg: function(){
			this.showImg = true;
        }
	}
}

</script>
<style scoped>
.item{background-color: #fff;padding:10px;margin-bottom:1px;}
.item div{padding:6px 2px;}
.item .footer{color: #aaa;}

#commentList{background-color: #fff;padding:2px;}
#commentList>ul{list-style:none;margin-left:-25px;}
#commentList>ul>li{margin-bottom: 20px;border-bottom:1px solid #eee;padding-bottom:5px;}
#commentList>ul>li .item-head{position:relative;display: inline-block;}
#commentList>ul>li>ul{list-style:none;}
#commentList>ul>li>ul>li{margin-bottom:10px;}

.commentArea{background-color:#eee;}
.commentArea div{padding:2px 15px;}
.mint-tab-item{padding:0;}
#comment-bar{background-color: #fff;}
#comment-bar span{margin-left:10px;}
#comment-bar img{padding:10px 5px 0 5px;}
#comment-bar input{line-height: 32px;border:0px;width: 60%;position: relative;top:-6px;}
</style>
