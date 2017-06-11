<template>
	<div class="row">
		<vueHeadTitle :value="title"></vueHeadTitle>

		<div class="collection">
			<a href="/user/changepwd" class="collection-item"><i class="fa fa-key"> 修改密码</i></a>
			<a href="#!" class="collection-item" v-on:click="doLogout"><i class="fa fa-sign-out"> 退出</i></a>
		 </div>
	</div>
</template>

<script>
import vueHeadTitle from '@/components/include/Title'
export default {
  name: 'userCenterIndex',
  data () {
    return {
    	title: '设置',
      isLogin : ''
    }
  },
   mounted: function () {
		document.title=this.title;
		this.isLogin = jQuery.common.isLogin();
		this.init();
   },
  methods: {
	init: function(){
		
	},
	doLogout: function(){
		jQuery.common.deleteCookie(this.COOKIE_USERNAME);
		self.location='/';
	}
  }
}
</script>


