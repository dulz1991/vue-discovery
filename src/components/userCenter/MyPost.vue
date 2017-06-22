<template>
	<div class="row">

		<vueHeadTitle :value="title"></vueHeadTitle>
		
		<div class="collection">
			<a class="collection-item" v-for="item in items" :href="'/detail?id=' + item.id ">
				<span class="badge blue" style="color:#fff;">点击:{{item.clickNum}} 评论:0</span>
				{{item.title}}
			</a>			
		</div>
	
	</div>
</template>

<script>
export default {
  name: 'myPost',
  data () {
    return {
    	title: '我发表的',
      isLogin : '',
      items: []
    }
  },
   mounted: function () {
		document.title= this.title;
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
		parm.pageNo=1;
		this.$http.get(this.BASE_URL+'/user/myPost', {params: parm}).then(function(res) {
			this.items = res.data.page.list;
		}, function(res) {
			Materialize.toast(res.data.error, 3000);
		});
	}
  }
}
</script>


