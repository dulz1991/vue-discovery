<template>
	<div>
		<navbar title="个人中心" showHome="true"></navbar>

		<mt-cell is-link title="" @click.native="jumpUrl('/user/info')">
			<span>{{username}}</span>
		  	<img slot="icon" :src="MOBILE_IMG_URL+avatar+'!200!200'" width="120" style="padding:10px 0px;"> 
		</mt-cell>
		<br>
		<mt-cell is-link title="发布图文" @click.native="jumpUrl('/post')">
			<span></span>
		  	<img slot="icon" :src="BASE_IMG_URL+'/img/plus.png'" width="24" height="24"> 
		</mt-cell>
		<mt-cell is-link title="我发布的" @click.native="jumpUrl('/user/myPost')">
			<span>{{myPostCount}}</span>
		  	<img slot="icon" :src="BASE_IMG_URL+'/img/list_24.png'" width="24" height="24"> 
		</mt-cell>
		<mt-cell is-link title="我评论的" @click.native="jumpUrl('/user/myComment')">
			<span>{{myCommentCount}}</span>
		  	<img slot="icon" :src="BASE_IMG_URL+'/img/comment_24.png'" width="24" height="24"> 
		</mt-cell>
		<mt-cell is-link title="我收藏的" @click.native="jumpUrl('/user/myCollection')">
			<span>{{myCollectionCount}}</span>
		  	<img slot="icon" :src="BASE_IMG_URL+'/img/star_red_24.png'" width="24" height="24"> 
		</mt-cell>
		<br>
		<mt-cell is-link title="反馈" @click.native="jumpUrl('/user/feedback')">
		  	<img slot="icon" :src="BASE_IMG_URL+'/img/feedback_24.png'" width="24" height="24"> 
		</mt-cell>
		<mt-cell is-link title="设置" @click.native="jumpUrl('/user/set')">
		  	<img slot="icon" :src="BASE_IMG_URL+'/img/setting_24.png'" width="24" height="24"> 
		</mt-cell>
	
	</div>
</template>

<script>
import { Header, Cell, Toast } from 'mint-ui'
import navbar from '@/components/include/Navbar'
export default {
  name: 'userCenterIndex',
  data () {
    return {
	  myPostCount:0,
	  myCollectionCount:0,
	  myCommentCount:0,
	  avatar: '',
	  username: ''
    }
  },
   mounted: function () {
		document.title="个人中心";
		this.init();
   },
   components:{
  	navbar
  },
  methods: {
	init: function(){
		this.$http.get(this.BASE_URL+'/user/index').then(function(res) {
			console.log(res.data)
			this.myPostCount = res.data.myPostCount;
			this.myCollectionCount = res.data.myCollectionCount;
			this.username=res.data.username;
			this.avatar=res.data.avatar;
			this.myCommentCount=res.data.myCommentCount;
		}, function(res) {
			this.bottomTip("获取数据异常")
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


