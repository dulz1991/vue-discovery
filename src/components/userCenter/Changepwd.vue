<template>
  <div>
      <mt-header fixed title="修改密码">
          <a href="/user/set" slot="left">
              <mt-button icon="back">返回</mt-button>
            </a>
            <mt-button slot="right">
              <a href="javascript:;" class="link-btn">...</a>
            </mt-button>
        </mt-header>
      <br><br>

      <form class="form" action="javascript:;">
        <h2></h2>
        <mt-field label="旧密码" placeholder="请输入旧密码" type="password" name="oldPwd" v-model="oldPwd"></mt-field> 
        <mt-field label="新密码" placeholder="请输入新密码" type="password" name="newPwd" v-model="newPwd"></mt-field>    
       <br>
       <mt-button type="primary" size="large" @click="doChange">确认</mt-button>
       <br>
      </form>

    <!-- <form class="form">
      <div class="row">
          <div class="input-field col s12">
            <input id="password" name="oldPwd" type="password" class="validate">
            <label for="password">旧密码</label>
          </div>
      </div>
    
      <div class="row">
          <div class="input-field col s12">
            <input id="password" name="newPwd" type="password" class="validate">
            <label for="password">新密码</label>
          </div>
       </div>
    
        <div class="row">
          <div class="col s12">
            <div class="input-field inline">
              <a class="waves-effect waves-light btn" v-on:click="doChange">确认</a>
              <a href="/user/set" class="waves-effect waves-light waves-orange btn" style="background-color:#aaa;">返回</a>
            </div>
          </div>
        </div>
      </form> -->

  </div>
</template>

<script>
import {Header, Field, Button, Toast} from 'mint-ui';
export default {
  name: 'changepwd',
  data () {
    return {
      oldPwd: '',
      newPwd:''
    }
  },
  components:{
    
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
