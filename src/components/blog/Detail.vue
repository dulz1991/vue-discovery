<template>
<div class="row">
		<input type="hidden" name="hiddenId" :value="item.id">
      <div class="col s12"><blockquote><h5 class="header">{{item.title}}</h5> </blockquote></div>
      <div class="col s6">{{item.username}}</div>
      <div class="col s6"><span class="flow-text">{{item.createTimeStr}}</span></div>
	
		<!-- 内容区 -->
		<div class="col s12">
			<div class="card-image">
				<img :src="BASE_IMG_URL+item.imagePath" width="100%">
				<!-- <span class="card-title">{{item.title}}</span> -->
			</div>
			<div class="card-content">
				{{item.content}}
			</div>
		</div>
		
		<!-- 评论区 -->
		<div class="col s12" id="commentList" style="margin-top:10px;border-top:1px solid #ddd;">
			<div style="padding-top:15px;" class="commentItem" v-for="c in commentList" :commentId="c.commentId">
				<div class="chip">
					<img :src="BASE_IMG_URL + c.fromAvatar" alt="Contact Person">
					{{c.fromName}}
					<span style="padding-left:10px;">{{c.createTimeStr}}</span>
				</div>
				<div>{{c.messageContent}}</div>
			</div>
		</div>
		<div style="margin-top:15px;" v-if="hasComment">
			<h5 class="center-align" v-on:click="getCommentList">查看更多</h5>
		</div>
		<div style="margin-top:15px;margin-bottom:40px;" >
			<h5 class="center-align">&nbsp;</h5>
		</div>
			
	<!--
	<div class="fixed-action-btn toolbar">
    <a class="btn-floating btn-large grey lighten-1">
      <i class="large material-icons">mode_edit</i>
    </a>
    <ul>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">insert_chart</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">format_quote</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">publish</i></a></li>
      <li class="waves-effect waves-light"><a href="#!"><i class="material-icons">attach_file</i></a></li>
    </ul>
  </div>
  -->
	
	
	<div class="fixed-action-btn toolbar active" data-origin-bottom="617" data-origin-left="281" data-origin-width="56" data-open="true" style="text-align: center; width: 100%; bottom: 0px; left: 0px; transition: transform 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53), background-color 0s linear 0.2s; overflow: hidden; background-color: rgb(189, 189, 189);">
		<a class="btn-floating btn-large grey lighten-1" style="transition: transform 0.2s; overflow: visible;">
			<i class="large material-icons">mode_edit</i>
			<div class="fab-backdrop" style="transform: scale(9); transition: transform 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19); background-color: rgb(189, 189, 189);"></div>
		</a>
		<ul>
			<li class="waves-effect waves-light">
				<a href="#!" style="opacity: 1;">
				<form class="form">
					<input type="hidden" name="discoveryId" :value="item.id" />
					<input id="messageContent" type="text" class="messageContent" name="messageContent" 
					style="background-color:#fff;color:#666;width:75%;margin:2 4px;border-radius:20px;padding-left:6px;"
					placeholder="发表评论"	value="">
					<span style="margin-left:10px;" v-on:click="doComment">发表</span>
				</form>
				</a>
			</li>
		</ul> 
	</div>
	
	
</div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      title : '',
	  item : '',
	  commentList: [],
	  hasComment:false
    }
  },
  mounted: function () {
	jQuery.common.isLogin();
	this.getDetail();
	//this.getCommentList();
  },
  methods: {
		getDetail: function () {
			var id = jQuery.common.getQueryString("id");
			this.$http.get(this.BASE_URL+'/discoveryDetail?id='+id).then(function(res) {
				if(res.data.errorNo==404){
					self.location='/Notfound';
				}
				this.item=res.data.detail;
				document.title = res.data.detail.title;
				
				this.getCommentList();
            }, function(res) {
				Materialize.toast(res.data.error, 3000);
            });
		},
		getCommentList: function () {
			var _this = this;
			var parm = {};
			//最后一个评论
			var lastIndex = $('#commentList').find('div.commentItem').length;
			if(lastIndex>0){
				var commentId = $('#commentList').find('div.commentItem').eq(lastIndex-1).attr('commentId');
				parm.id=commentId;
				parm.type='down';
			}
			//这条评论的id
			var discoveryId = _this.item.id;
			parm.discoveryId = discoveryId;
			this.$http.get(this.BASE_URL+'/getCommentList', {params: parm}).then(function(res) {
				if(res.data.list != undefined && res.data.list.length>=res.data.pageSize){
					this.hasComment = true;
				} else {
					this.hasComment = false;
				}
				if(res.data.list != undefined && res.data.list.length>=0){
					this.commentList = jQuery.common.appendJson(res.data.list, this.commentList);
				}
            }, function(res) {
				Materialize.toast(res.data.error, 3000);
            });
		},
		doComment : function(){
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
		}
	}
}

</script>

</style>
