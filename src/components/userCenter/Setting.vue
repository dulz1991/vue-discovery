<template>
	<div>
		<navbar title="设置" showBack="true" backUrl="/user/index"></navbar>

		<br>
		<mt-cell is-link title="关于本站" value="" @click.native="jumpUrl('/about')"></mt-cell>
		<!-- <mt-cell title="帮助中心" value="" @click.native="jumpUrl('/help')"></mt-cell> -->
    	<mt-cell is-link title="修改密码" value="" @click.native="jumpUrl('/user/changepwd')"></mt-cell>
    	<br>
    	<mt-cell title="退出" value="" @click.native="doLogout"></mt-cell>

		<!-- <div class="collection">
			<a href="/user/changepwd" class="collection-item"><i class="fa fa-key"> 修改密码</i></a>
			<a href="#!" class="collection-item" v-on:click="doLogout"><i class="fa fa-sign-out"> 退出</i></a>
		 </div> -->
	</div>
</template>

<script>
import { Header, Cell, Toast } from 'mint-ui'
import navbar from '@/components/include/Navbar'
export default {
  name: 'setting',
  data () {
    return {
    	
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
	},
	doLogout: function(){
		console.log(1)
		this.$http.get(this.BASE_URL+'/account/doLogout').then(function(res) {
			if(res.data.errorNo==200){
				self.location='/';
			} else {
				console.log(res.data)
				this.bottomTip(res.data.errorInfo);
			}			
		});
	}
  }
}
</script>


