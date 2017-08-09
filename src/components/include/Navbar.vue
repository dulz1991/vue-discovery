<template>
    <div class="">
        <mt-header fixed :title="title">
          
            <a href="/" slot="left" v-if="showHome">
              <mt-button icon="home"><i class="fa fa-home fa-faw"></i>首页</mt-button>
            </a>

            <a :href="backUrl" slot="left" v-if="showBack">
              <mt-button icon="back">返回</mt-button>
            </a>
            
            <mt-button v-if="!isLogin" slot="right">
              <a href="/login" class="link-btn">登录</a>
            </mt-button>

            <mt-button v-if="isLogin" slot="right" @click="gotoCenter">
              <img :src="avatar" class="avatar">
            </mt-button>
          
          </mt-header>
        <br><br>
    </div>
</template>

<script>
import { Header } from 'mint-ui'
export default {
  name: 'navbar',
  data () {
    return {
      isLogin:false,
      username:'',
      avatar:''
    }
  },
  props: [
    'title', 
    'showHome',//是否显示返回首页按钮
    'showBack', //是否显示返回
    'backUrl' //返回的url
  ],
  mounted: function () {
    /*document.title = this.title*/
    this.init();
  },
  methods: {
    init: function(){
      this.$http.get(this.BASE_URL+'/loginResult').then(function(res) {
        if(res.data.errorNo==400){
          this.isLogin = false;
        } else if(res.data.errorNo==200) {
          this.isLogin = true;
          this.avatar=this.BASE_IMG_URL+res.data.avatar;
        }    
      });
      
    },
    gotoCenter: function(){
      self.location="/user/index";
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
