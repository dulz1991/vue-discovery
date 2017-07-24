<template>
  <div>

    <mt-header title="注册">
      <a href="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </a>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>

    <form class="form" action="javascript:;">
      <h2>注册</h2>
       <mt-field label="昵称" placeholder="请输入昵称" type="text" name="username" v-model="username"></mt-field> 
       <mt-field label="手机号" placeholder="请输入手机号" type="tel" name="mobile" v-model="mobile"></mt-field> 
       <mt-field label="密码" placeholder="请输入密码" type="password" name="password" v-model="password"></mt-field>    
       <br>
       <mt-button type="primary" size="large" @click="doRegist">注册</mt-button>
       <br>
       <mt-button plain size="large"  @click.native="jumpUrl('/')">返回首页</mt-button>
    </form>

  </div>
</template>

<script>
import {Header, Field, Button, Toast} from 'mint-ui';
export default {
  name: 'Regist',
  data () {
    return {
      username:'',
      password:'',
      mobile:'',
      msg: 'regist'
    }
  },
  mounted: function () {
	
  },
  components:{
    
  },
  methods: {
		doRegist: function () {
      if(this.username=='' || this.password=='' || this.mobile==''){
        let tip = this.bottomTip('用户名、手机号和密码不能为空');
        return;
      }

			var parm = this.getFormJson('.form');
			console.log(parm);
			this.$http.post(this.BASE_URL+'/doRegist',parm).then(function(res) {
				if(res.data.errorNo==200){
          this.bottomTip(res.data.tip);
					setTimeout("self.location='/login';",600);
				} else {
          this.bottomTip(res.data.errorInfo);
				}
      }, function(res) {
        console.log(res);
        this.bottomTip(res.data);
      });
		}
	}
}
</script>

<style type="text/css" scoped="">
h2{text-align: center;}
.form{margin-top:80px;}
</style>
