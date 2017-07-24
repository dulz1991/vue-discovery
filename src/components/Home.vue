<template>

  <div>
	<mt-header title="首页">
      <!-- <a href="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </a> -->
    </mt-header>

	<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" 
		:bottom-all-loaded="allLoaded" 
		@top-status-change="handleTopChange" @bottom-status-change="handleBottomChange"
	 	ref="loadmore">
	 	<!-- <mt-cell v-for="item in items" :title="item.title" :value="item.createTimeStr"></mt-cell> -->
		<div v-for="item in items" class="item">
			<div>
				<img :src="BASE_IMG_URL+item.avatar">
				{{item.userId}}
			</div>
			<img v-if="item.hasImg" :src="BASE_IMG_URL+item.imagePath">
		</div>
	  	<div slot="top" class="mint-loadmore-top">
	    	<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓下拉释放刷新</span>
	      	<span v-show="topStatus === 'loading'">Loading...</span>
	  	</div>
	  	<div slot="bottom" class="mint-loadmore-bottom">
	      	<span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↑上拉释放刷新</span>
	      	<span v-show="bottomStatus === 'loading'">Loading...</span>
	  	</div>
	</mt-loadmore>

	<!-- <div id="wrapper">
		<div id="scroller">
		
			<div id="pullDown">
				<span class="pullDownIcon"></span>
				<span class="pullDownLabel">数据刷新于：{{currentDatetime}}</span>
			</div>
	
			<div class="row" id="thelist">
				<div class="col s12 m6" v-for="item in items" style="padding:0;">
					<div id="" class="waves-effect white" @click="viewDetail(item.id)" style="text-align:left;width:100%;padding:10px 20px;margin-top:2px;">
					    <div class="" style="">
					      <blockquote><h6 class="header">{{item.title}}</h6></blockquote>
					      <img :src="BASE_IMG_URL+item.imagePath" v-if="item.hasImg" style="width:100%;" class="materialboxed">
					      <p>{{item.content}}</p>
					    </div>
					    <div style="border-top:0px solid #eee;padding-top:0px;color:#aaa;">
					      	<span>{{item.userId}}</span> | 
					      	<span>{{item.createTimeStr}}</span>
					    </div>
					  </div>
				</div>
			</div>	
	
		</div>
	</div> -->

		
  </div>
</template>

<script>
import { Loadmore, Header, Lazyload,Swipe, SwipeItem } from 'mint-ui';
export default {
	name: 'app',
  	data () {
    	return {
    		items:[],
    		topStatus: '',
    		bottomStatus:''
    	}
  	},
  	components:{
  		loadmore: Loadmore
  	},
  	mounted: function () {
		this.init();
  	},
  	methods: {
		init: function(){
			this.$http.get(this.BASE_URL+'/discovery/getList').then(function(res) {
				this.items=res.data.list;
            }, function(res) {
            	console.log(res.data);
            	this.midTip(res.data.error);
            });
		},
		loadTop: function(){
			setTimeout(() => {this.$refs.loadmore.onTopLoaded();}, 2000);
		},
		loadBottom() {
			setTimeout(() => {
				this.allLoaded = true;
		  		this.$refs.loadmore.onBottomLoaded();
			}, 2000);
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item{background-color: #fff;padding:10px;}
img{width: 100px;}
</style>
