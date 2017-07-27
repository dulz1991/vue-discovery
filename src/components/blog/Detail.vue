<template>
<div>
	<mt-header fixed title="">
      	<a href="/" slot="left">
        	<mt-button icon="back">返回</mt-button>
      	</a>
      	<mt-button v-if="!isLogin" slot="right">
      		<a href="/login" class="link-btn">登录</a>
      	</mt-button>
    </mt-header>
    <br><br>

    <div class="item">
		<div>
			<img :src="BASE_IMG_URL+item.avatar" class="avatar">
			<span class="item-head">{{item.username}}</span>
		</div>
		<div>{{item.content}}</div>
		<div>
			<img v-lazy="BASE_IMG_URL+item.imagePath" v-if="item.imagePath" width="98%">
			<!-- <img :src="BASE_IMG_URL+item.imagePath" v-if="item.imagePath" width="98%"> -->
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
			<li v-for="c in commentList" style="border-bottom:1px solid #eee;padding-bottom:5px;">
				<div>
					<img :src="BASE_IMG_URL+c.fromAvatar" class="avatar">
					<span class="item-head">{{c.fromName}}</span>
				</div>
				<div>{{c.messageContent}}</div>
				<ul>
					<li  v-for="d in c.commentList">
						<div>
							<img :src="BASE_IMG_URL+d.fromAvatar" class="avatar">
							<span class="item-head">{{d.fromName}}</span>
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
	      		<span><input type="text" name="" placeholder="输入评论内容"></span>
	      		<span><img :src="this.BASE_IMG_URL + '/img/upload_24.png'"></span>
	      		<span>
	      			<img :src="this.BASE_IMG_URL + '/img/star_black_24.png'" v-if="!hasCollected" 
	      			@click="addCollection">
	      			<img :src="this.BASE_IMG_URL + '/img/star_red_24.png'" v-if="hasCollected"
	      			@click="cancelCollection">
	      		</span>
      		</div>
      	</mt-tab-item>
    </mt-tabbar>
	
</div>
</template>

<script>
import { Header, Toast, Tabbar, TabItem, Field, Lazyload, InfiniteScroll } from 'mint-ui'
export default {
  name: 'Detail',
  data () {
    return {
      title : '',
	  item : '',
	  commentList: [],
	  hasComment:false,

	  commentId: '',
	  toId: '',
	  replyToName:'',
	  discoveryId: '',
	  hasCollected: false //是否已收藏
    }
  },
  mounted: function () {
  	document.title='详情页';
	this.getDetail();
	//this.getCommentList();
  },
  components:{
  	
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
			var parm = {};
			parm.type='down';
			parm.discoveryId = this.item.id;
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
		}
		/*doComment : function(){
			var messageContent = $('input[name="messageContent"]').val();
			var parm = jQuery.common.getFormJson('.form');
			var cookie_user = jQuery.common.getCookie(this.COOKIE_USERNAME);
			parm.cookie_user = cookie_user;
			this.$http.post(this.BASE_URL+'/auth/discovery/doComment', parm).then(function(res) {
				if(res.data.errorNo==400){
					Materialize.toast(res.data.errorInfo, 3000);
					setTimeout("self.location='/login';",800);
				} else if(res.data.errorNo==404){
					self.location='/Notfound';
				} else if(res.data.errorNo==-1){
					Materialize.toast(res.data.errorInfo, 3000);
				} else {
					$('input[name="messageContent"]').val("");
					this.getCommentList();
					// TODO
				}
            }, function(res) {
				Materialize.toast(res.data.error, 3000);
            });
		},
		showModal: function(obj){
			this.commentId =$(obj.target).attr('commentId');
			this.toId = $(obj.target).attr('fromId');
			this.replyToName = $(obj.target).attr('fromName');
			this.discoveryId = $('input[name="hiddenId"]').val();
			$('#modal1').modal('open');
		},
		commentSubmit: function(){
			var parm = jQuery.common.getFormJson('.replyForm');
			parm.cookie_user = jQuery.common.getCookie(this.COOKIE_USERNAME);
			var _this = this;
			this.$http.post(this.BASE_URL+'/auth/doCommentForComment', parm).then(function(res) {
				if(res.data.errorNo==200){
					var _commentId = parm.commentId;
					var _username = jQuery.common.getCookie(this.COOKIE_USERNAME);
					var _html = '';
					_html += '<div>'+_username+'： '+parm.messageContent+'</div>';
					$("#commentItem"+_commentId).find('.commentArea').append(_html);
				} else {
					Materialize.toast(res.data.errorInfo, 3000);
				}
		      }, function(res) {
					Materialize.toast(res.data.error, 3000);
		      });
		},
		*/
	}
}

</script>
<style scoped>
.item{background-color: #fff;padding:10px;margin-bottom:1px;}
.item div{padding:6px 2px;}
.item .item-head{position:relative;top:-12px;}
.item .footer{color: #aaa;}

#commentList{background-color: #fff;padding:2px;}
#commentList ul{list-style:none;margin-left:-25px;}
#commentList ul li{margin-bottom: 20px;}

.commentArea{background-color:#eee;}
.commentArea div{padding:2px 15px;}
.mint-tab-item{padding:0;}
#comment-bar{background-color: #fff;}
#comment-bar span{margin-left:10px;}
#comment-bar img{padding:10px 5px 0 5px;}
#comment-bar input{line-height: 32px;border:0px;width: 60%;position: relative;top:-6px;}
</style>
