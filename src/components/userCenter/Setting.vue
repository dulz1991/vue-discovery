<template>
	<div class="row">
		<navbar ref="navbar" title="设置"></navbar>

		<vueHeadTitle :value="title"></vueHeadTitle>

		<div class="collection">
			<a href="/user/changepwd" class="collection-item"><i class="fa fa-key"> 修改密码</i></a>
			<a href="#!" class="collection-item" v-on:click="doLogout"><i class="fa fa-sign-out"> 退出</i></a>
		 </div>
	</div>
</template>

<script>
import vueHeadTitle from '@/components/include/Title'
import navbar from '@/components/include/Navbar'
export default {
  name: 'userCenterIndex',
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
		this.$http.get(this.BASE_URL+'/logout').then(function(res) {
			if(res.data.errorNo==200){
				self.location='/';
			} else {
				Materialize.toast(res.data.errorInfo, 3000);
			}			
		});
	}
  }
}
</script>


