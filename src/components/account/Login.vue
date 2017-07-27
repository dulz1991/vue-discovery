<template>
  <div>
  
    <mt-header title="登录">
      <!-- <a href="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </a> -->
      <mt-button slot="right">
        <a href="/regist" class="link-btn">注册</a>
      </mt-button>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>

    <form class="form" action="javascript:;">
        <h2>登录</h2>
	     <mt-field label="手机号" placeholder="请输入手机号" type="tel" name="username" v-model="username"></mt-field> 
       <mt-field label="密码" placeholder="请输入密码" type="password" name="password" v-model="password"></mt-field>	  
       <br>
       <mt-button type="primary" size="large" @click="doLogin">登录</mt-button>
       <br>
       <mt-button plain size="large"  @click.native="jumpUrl('/')">返回首页</mt-button>
       <br>
       <p style="text-align:center">没有账号? <a href="/regist" class="link-btn" style="color:#aaa">去注册</a></p>
    </form>
  
  </div>
</template>

<script>
import {Header, Field, Button, Toast} from 'mint-ui';
export default {
  name: 'Login',
  data () {
    return {
      username:'',
      password:'',
      msg: 'login'
    }
  },
  components:{
    /*vueheader:Header*/
  },
  mounted: function () {
	 
  },
  methods: {
		doLogin: function () {
      var flag = true;
      if(this.username=='' || this.password==''){
          flag = false;
          let tip = this.bottomTip('用户名或密码不能为空');
          /*setTimeout(() => {
            tip.close();
            self.location="";
          }, 600);*/
      }
      if(flag){
        var parm = {};
        parm.username = this.username;
        parm.password = this.password;
        console.log(parm);
        this.$http.post(this.BASE_URL+'/account/doLogin',parm).then(function(res) {
          if(res.data.errorNo==200){
            this.bottomTip('登录成功');
            var redirectUrl = this.getQueryString("redirectUrl");
            if(this.notBlank(redirectUrl)){
              setTimeout(() => {self.location=redirectUrl;}, 600);
            } else {
              setTimeout(() => {self.location='/user/index';}, 600);
            }
          } else {
            this.bottomTip(res.data.errorInfo);
          }
        }, function(res) {
          this.bottomTip(res.data.errorInfo);
        });
      }
			
		}
	}
}
</script>

<style type="text/css" scoped>
h2{text-align: center;}
.form{margin-top:80px;}
.link-btn{color:#fff; text-decoration: none;}
</style>
