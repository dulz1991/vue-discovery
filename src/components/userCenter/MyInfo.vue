<template>
	<div>
		<mt-header fixed title="个人信息">
        <a href="/user/index" slot="left">
            <mt-button icon="back">返回</mt-button>
          </a>
          <mt-button slot="right">
            <a href="javascript:;" class="link-btn">...</a>
          </mt-button>
      </mt-header>
    <br><br>
  
    <br>
    <mt-cell is-link title="" @click.native="jumpUrl('/user/uploadAvatar')">
      <span></span>
        <img slot="icon" :src="MOBILE_IMG_URL+avatar+'!200!200'" width="120" style="padding:10px 0px;"> 
    </mt-cell>
    <mt-cell title="昵称" :value="username"></mt-cell>
		
	</div>
</template>

<script>
import { Header, Cell, Toast } from 'mint-ui'
export default {
  name: 'myInfo',
  data () {
    return {
    	username:'',
      avatar:''
    }
  },
  mounted: function () {
		this.init();
  },
  methods: {
	 init: function(){
	   this.$http.get(this.BASE_URL+'/user/index').then(function(res) {
        this.username=res.data.username;
        this.avatar=res.data.avatar;
      }, function(res) {
        this.bottomTip("获取数据异常")
      });
   }
  }
}
</script>


