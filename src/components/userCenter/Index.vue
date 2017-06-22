<template>
	<div class="row">
		
		<br>
		<div class="col s12">
			  <div class="row valign-wrapper">
				<div class="col s4 waves-effect waves-light">
				  <img :src="BASE_IMG_URL+avatar" alt="" class="circle responsive-img" v-on:click="uploadAvatar"> <!-- notice the "circle" class -->
				</div>
				<div class="col s8">
				  <span class="black-text">
					<p>{{username}}</p>
					<p>
						<a href="/user/myPost">发表：{{myPostCount}}</a> | 
						<a href="#">收藏：{{myCollectionCount}}</a>
					</p>
				  </span>
				</div>
			  </div>
		</div>
		
		<div class="collection">
			<a href="/user/info" class="collection-item"><i class="fa fa-info-circle"> 我的资料</i></a>
			<a href="/user/myPost" class="collection-item"><span class="badge blue" style="color:#fff;">{{myPostCount}}</span><i class="fa fa-list"> 我发表的</i></a>
			<a href="/user/myComment" class="collection-item"><span class="badge blue" style="color:#fff;">0</span><i class="fa fa-comment"> 我评论的</i></a>
			<a href="/user/myComment" class="collection-item"><span class="badge blue" style="color:#fff;">0</span><i class="fa fa-comment-o"> 收到的回复</i></a>
			<a href="#!" class="collection-item"><span class="badge red" style="color:#fff;">{{myCollectionCount}}</span><i class="fa fa-star"> 我收藏的</i></a>
			<a href="/user/feedback" class="collection-item"><i class="fa fa-envelope"> 我要反馈</i></a>
			<a href="/user/set" class="collection-item"><i class="fa fa-cog"> 设置</i></a>
			<!-- <a href="#!" class="collection-item" v-on:click="doLogout"><i class="fa fa-sign-out"> 退出</i></a> -->
		 </div>
	
	</div>
</template>

<script>
export default {
  name: 'userCenterIndex',
  data () {
    return {
      isLogin : '',
	  myPostCount:0,
	  myCollectionCount:0,
	  avatar: '',
	  username: ''
    }
  },
   mounted: function () {
		document.title="用户中心";
		this.isLogin = jQuery.common.isLogin();
		this.init();
   },
  methods: {
	init: function(){
		if(!this.isLogin){
			self.location='/login';
			return;
		}
		var parm = {};
		var cookie_user = jQuery.common.getCookie(this.COOKIE_USERNAME);
		parm.cookie_user = cookie_user;
		this.$http.get(this.BASE_URL+'/user/index', {params: parm}).then(function(res) {
			this.myPostCount = res.data.myPostCount;
			this.myCollectionCount = res.data.myCollectionCount;
			this.username=res.data.username;
			this.avatar=res.data.avatar;
		}, function(res) {
			Materialize.toast(res.data.error, 3000);
		});
	},
	doLogout: function(){
		jQuery.common.deleteCookie(this.COOKIE_USERNAME);
		self.location='/';
	},
	uploadAvatar: function(){
		self.location="/user/uploadAvatar";
	}
  }
}
</script>


