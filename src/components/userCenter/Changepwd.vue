<template>
  <div>
      <navbar title="修改密码" showBack="true" backUrl="/user/set"></navbar>
      
      <form class="form" action="javascript:;">
        <h2></h2>
        <mt-field label="旧密码" placeholder="请输入旧密码" type="password" name="oldPwd" v-model="oldPwd"></mt-field> 
        <mt-field label="新密码" placeholder="请输入新密码" type="password" name="newPwd" v-model="newPwd"></mt-field>    
       <br>
       <mt-button type="primary" size="large" @click="doChange">确认</mt-button>
       <br>
      </form>

  </div>
</template>

<script>
import {Header, Field, Button, Toast} from 'mint-ui'
import navbar from '@/components/include/Navbar'
export default {
  name: 'changepwd',
  data () {
    return {
      oldPwd: '',
      newPwd:''
    }
  },
  components:{
    navbar
  },
  mounted: function () {
	 
  },
  methods: {
		doChange: function () {
      /*if(!this.isLogin){
        self.location='/login';
        return;
      }*/
      var parm = {};
      parm.oldPwd=this.oldPwd;
      parm.newPwd=this.newPwd;
      this.$http.post(this.BASE_URL+'/user/doChangepwd',parm).then(function(res) {
        if(res.data.errorNo==200){
          this.bottomTip("密码修改成功");
          setTimeout("self.location='/user/index';",600);
        } else {
          this.bottomTip(res.data.errorInfo);
        }
      }, function(res) {
        console.log(res);
        this.bottomTip(res.statusText);
      });
		}
	}
}
</script>
