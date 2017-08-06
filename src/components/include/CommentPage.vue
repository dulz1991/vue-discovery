<template>

<div>

  <div class="closeBtn" @click="closeCommentPage">x</div>

  <div style="padding:10px;"v-if="hasComment">
    <div>
      <img :src="BASE_IMG_URL+comment.fromAvatar" class="avatar">
      <span class="item-head">{{comment.fromName}}</span>
    </div>
    <div>{{comment.messageContent}}</div>
  </div>

  <div id="commentList">
    <ul>
      <li v-for="c in commentList" style="border-bottom:1px solid #eee;padding-bottom:5px;">
        <div>
          <img :src="BASE_IMG_URL+c.fromAvatar" class="avatar">
          <span class="item-head">{{c.fromName}}</span>
        </div>
        <div @click="commentForComment(c.id)">{{c.messageContent}}</div>
        <ul>
          <li  v-for="d in c.commentList">
            <div>
              <img :src="BASE_IMG_URL+d.fromAvatar" class="avatar">
              <span class="item-head">{{d.fromName}}</span>
            </div>
            <div>{{d.messageContent}}</div> 
          </li>
        </ul>
      </li>
    </ul>
  </div>

  <!-- 底部栏 -->
  <mt-tabbar fixed v-model="selected">
      <mt-tab-item>
        <div id="comment-bar">
          <span><input type="text" name="" placeholder="输入评论内容" v-model="commentContent"></span>
          <span>
            <img :src="this.BASE_IMG_URL + '/img/upload_24.png'" 
            @click="doComment">
          </span>
        </div>
      </mt-tab-item>
  </mt-tabbar>

</div>
</template>

<script>
import { Header, Toast, Tabbar, TabItem, Field, Lazyload, InfiniteScroll, Popup } from 'mint-ui'
export default {
  name: 'comment_page',
  data () {
    return {
      commentId:'',
      comment:'',
      commentList:[],
      hasComment:false,
      commentContent:''
    }
  },
  /*props: ['commentId'],*/
  mounted: function () {
    /*this.init();*/
  },
  methods: {
    init: function(){
      if(this.commentId==''){
        return;
      }
      var parm = {};
      parm.commentId = this.commentId;
      this.$http.get(this.BASE_URL+'/getCommentListForComment', {params: parm}).then(function(res) {
        if(res.data.comment!=undefined){
          this.comment = res.data.comment;
          this.hasComment=true;  
        } else {
          this.comment = '';
          this.hasComment=false;  
        }
        
        if(res.data.list != undefined){
          this.commentList = res.data.list; 
        } else {
          this.commentList=[];
        }
        /*if(res.data.list != undefined && res.data.list.length>=res.data.pageSize){
          this.hasComment = true;
        } else {
          this.hasComment = false;
        }*/
            
      }, function(res) {
        this.bottomTip(res.data.error);
      });
    },
    closeCommentPage: function(){
      this.$emit("listenToChileEnevt",false);
    },
    doComment : function(){
      var parm = {};
      parm.messageContent = this.commentContent;
      parm.discoveryId=this.comment.discoveryId;
      parm.toId = this.comment.fromId;
      parm.commentId = this.commentId;
      console.log(parm)
      this.$http.post(this.BASE_URL+'/doComment', parm).then(function(res) {
        if(res.data.errorNo==400){
          self.location='/login?redirectUrl='+window.location.href;
        } else if(res.data.errorNo==200){
          this.commentContent = "";
          this.init();
        } else {
          this.midTip(res.data.errorInfo);
        }
      }, function(res) {
        this.midTip(res.data.error);
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#commentList{background-color: #fff;padding:2px; height: 100%;margin-bottom: 20px;}
#commentList ul{list-style:none;}
#commentList ul li{margin-bottom: 10px;}

.mint-tab-item{padding:0;}
#comment-bar{background-color: #fff;}
#comment-bar span{margin-left:10px;}
#comment-bar img{padding:10px 5px 0 5px;}
#comment-bar input{line-height: 32px;border:0px;width: 60%;position: relative;top:-6px;}

.closeBtn{border:1px solid #f00; width:32px;height:32px;float: right;margin:10px 10px 0 0;border-radius:16px;
font-size: 22px; cursor: pointer;text-align: center;color: #f00;}
</style>
