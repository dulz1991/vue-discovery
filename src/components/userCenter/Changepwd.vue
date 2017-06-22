<template>
  <div class="row">
    <vueHeadTitle :value="title"></vueHeadTitle>

    <form class="form">
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
      </form>

  </div>
</template>

<script>
import vueHeadTitle from '@/components/include/Title'
export default {
  name: 'Login',
  data () {
    return {
      title: '修改密码',
      msg: 'login'
    }
  },
  mounted: function () {
	 document.title= this.title;
	 jQuery.common.isLogin();
  },
  methods: {
		doChange: function () {
      /*if(!this.isLogin){
        self.location='/login';
        return;
      }*/
      var parm = jQuery.common.getFormJson('.form');
      parm.cookie_user = jQuery.common.getCookie(this.COOKIE_USERNAME);
      this.$http.post(this.BASE_URL+'/user/doChangepwd',parm).then(function(res) {
        if(res.data.errorNo==200){
          Materialize.toast(res.data.tip, 1000);
          setTimeout("self.location='/user/index';",500);
        } else {
          Materialize.toast(res.data.errorInfo, 3000);
        }
      }, function(res) {
        console.log(res);
        Materialize.toast(res.data.statusText, 3000);
      });
		}
	}
}
</script>
