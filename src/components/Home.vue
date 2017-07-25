<template>

  <div>
	<mt-header fixed title="首页">
      <!-- <a href="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </a> -->
      <mt-button v-if="!isLogin" slot="right">
      	<a href="/login" class="link-btn">登录</a>
      </mt-button>
    </mt-header>
	<br><br>
	<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" 
		@top-status-change="handleTopChange" @bottom-status-change="handleBottomChange"
	 	ref="loadmore">
		<div v-for="item in items" class="item">
			<div>
				<img :src="BASE_IMG_URL+item.avatar" class="avatar">
				<span class="item-head">{{item.username}}</span>
			</div>
			<div>{{item.content}}</div>
			<div><img v-if="item.hasImg" :src="BASE_IMG_URL+item.imagePath" class="imgList"></div>
			<div class="footer">
				<span>评论: {{item.commentCount}}</span>
				<span>收藏: {{item.collectionCount}}</span>
			</div>
		</div>
	  	<div slot="top" class="mint-loadmore-top">
	    	<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓下拉释放刷新</span>
	      	<span v-show="topStatus === 'loading'"><mt-spinner type="snake">Loading...</mt-spinner></span>
	  	</div>
	  	<div slot="bottom" class="mint-loadmore-bottom" style="margin-bottom: 0px;">
	      	<span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↑上拉释放刷新</span>
	      	<span v-show="bottomStatus === 'loading'"><mt-spinner type="snake">Loading...</mt-spinner></span>
	  	</div>
	</mt-loadmore>
	
	<tabbar></tabbar>
		
  </div>
</template>

<script>
import { Loadmore, Header, Lazyload,Swipe, SwipeItem, Spinner, Indicator } from 'mint-ui'
import tabbar from '@/components/include/Tabbar'
export default {
	name: 'app',
  	data () {
    	return {
    		items:[],
    		topStatus: '',
    		bottomStatus:'',
    		isLogin: true
    	}
  	},
  	components:{
  		loadmore: Loadmore,
  		tabbar
  	},
  	mounted: function () {
		this.init();
  	},
  	methods: {
		init: function(){
			Indicator.open({
				text: '加载中...',
				 spinnerType: 'fading-circle'
			});
			this.$http.get(this.BASE_URL+'/discovery/getList').then(function(res) {
				this.isLogin = res.data.isLogin;
				Indicator.close();
				if(res.data.errorNo==200){
					this.items=res.data.list;	
				} else {
					this.midTip(res.data.errorInfo);
				}
            }, function(res) {
            	console.log(res.data);
            	this.midTip(res.data.error);
            });
		},
		loadTop: function(){
			var parm = {};
			parm.type=2;
			parm.discoveryId = this.items[0].id;
			setTimeout(() => {this.$refs.loadmore.onTopLoaded();}, 1000);
			this.$http.get(this.BASE_URL+'/discovery/getList',{params:parm}).then(function(res) {
				if(res.data.errorNo==200){
					this.items = this.appendJson(res.data.list, this.items);
				} else {
					this.midTip(res.data.errorInfo);
				}
            }, function(res) {
            	console.log(res.data);
            	this.midTip(res.data.error);
            });
		},
		loadBottom() {
			var parm = {};
			parm.type=1;
			parm.discoveryId = this.items[this.items.length-1].id;
			setTimeout(() => {
					/*this.allLoaded = true;*/
			  		this.$refs.loadmore.onBottomLoaded();
				}, 2000);
			this.$http.get(this.BASE_URL+'/discovery/getList',{params:parm}).then(function(res) {
				if(res.data.errorNo==200){
					this.items = this.appendJson(res.data.list, this.items);
				} else {
					this.midTip(res.data.errorInfo);
				}
				
            }, function(res) {
            	console.log(res.data);
            	this.midTip(res.data.error);
            });
		},
		handleTopChange(status) {
	    	this.topStatus = status;
	    },
	    handleBottomChange(status) {
	    	this.bottomStatus = status;
	    }
	}
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item{background-color: #fff;padding:10px;margin-bottom:1px;}
.item div{padding:6px 2px;}
.item .item-head{position:relative;top:-12px;}
.item .footer{color: #aaa;}
.imgList{width: 150px;}
.avatar{width:40px;border-radius: 20px;}
.mint-spinner-snake{margin: auto auto;}
.mint-tabbar{}
.link-btn{color:#fff; text-decoration: none;}
</style>
