<template>

  <div id="app" class="container">
	
	<div id="wrapper">
		<div id="scroller">
		
			<div id="pullDown">
				<span class="pullDownIcon"></span>
				<span class="pullDownLabel">下拉加载更多数据</span>
			</div>

			<div class="row" id="thelist">
				<div class="col s12 m6" v-for="item in items">

					<div class="card item" v-if="item.hasImg" :discoveryId="item.id">	
						<div class="card-image">
							<img :src="baseImgUrl+item.imagePath" >
							<span class="card-title">{{item.title}}</span>
							<a class="btn-floating halfway-fab waves-effect waves-light red" 
							:href="'/detail?id=' + item.id "><i class="fa fa-coffee"></i></a>
						</div>
						<div class="card-content">
							<p>{{item.content}}</p>
						</div>
					</div>
					<div class="card item" :discoveryId="item.id" v-else>
						<div class="col s12 m6">
							<div class="card blue-grey darken-1">
								<div class="card-content white-text">
									<span class="card-title">{{item.title}}</span>
									<p>{{item.content}}</p>
								</div>
								<div class="card-action">
									<a :href="'/detail?id=' + item.id " class="btn-floating halfway-fab waves-effect waves-light red"><i class="fa fa-coffee"></i></a>
								</div>
							</div>
						</div>
					</div>
				
				</div>
			</div>	
			
			<!--<ul id="thelist">-->
				<!--<li>Pretty row 1</li>-->
				<!--<li>Pretty row 2</li>-->
				<!--<li>Pretty row 3</li>-->
				<!--<li>Pretty row 4</li>-->
				<!--<li>Pretty row 5</li>-->
				<!--<li><input type="text"/></li>-->
				<!--<li><input type="text"/></li>-->
				<!--<li><input type="checkbox"/></li>-->
				<!--<li>Pretty row 6</li>-->
				<!--<li>Pretty row 7</li>-->
				<!--<li>Pretty row 8</li>-->
				<!--<li>Pretty row 9</li>-->
				<!--<li>Pretty row 10</li>-->
			<!--</ul>-->

			<div id="pullUp">
				<span class="pullUpIcon"></span>
				<span class="pullUpLabel">上拉加载更多数据</span>
			</div>

		</div>
	</div>
  
  <!--
		<div class="row">
			<div class="col s12 m6" v-for="item in items">

				<div class="card" v-if="item.hasImg">	
					<div class="card-image">
						<img :src="baseImgUrl+item.imagePath" >
						<span class="card-title">{{item.title}}</span>
						<a class="btn-floating halfway-fab waves-effect waves-light red" 
						:href="'/detail?id=' + item.id "><i class="fa fa-coffee"></i></a>
					</div>
					<div class="card-content">
						<p>{{item.content}}</p>
					</div>
				</div>
				<div class="card" v-else>
					<div class="col s12 m6">
						<div class="card blue-grey darken-1">
							<div class="card-content white-text">
								<span class="card-title">{{item.title}}</span>
								<p>{{item.content}}</p>
							</div>
							<div class="card-action">
								<a :href="'/detail?id=' + item.id " class="btn-floating halfway-fab waves-effect waves-light red"><i class="fa fa-coffee"></i></a>
							</div>
						</div>
					</div>
				</div>
			
			</div>
		</div>
	-->
		
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      items: [], //列表集合
	  baseImgUrl:'', //图片地址前缀
//	  myScroll:'',
      pullDownEl:'',
      pullDownOffset:'',
      pullUpEl:'',
      pullUpOffset:''
    }
  },
  mounted: function () {
	document.title="首页";
	this.baseImgUrl = BASE_IMG_URL;
	jQuery.common.isLogin();
	
	this.init();
	this.getList();
  },
  methods: {
		init:function(){
			var obj=document.getElementById('app');
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			document.addEventListener('DOMContentLoaded', function () { setTimeout(this.loaded, 200); }, false);
			this.loaded();
		},
		getList: function () {
			this.$http.get(BASE_URL+'/discoveryList').then(function(res) {
				this.items=res.data.list;
            }, function(res) {
				Materialize.toast(res.data, 3000);
            });
		},
		loaded: function(){
			var _this = this;
			//$('#pullDown') = $('#pullDown');
			this.pullDownOffset = $('#pullDown').height();
			//$('#pullUp') = $('#pullUp');
			this.pullUpOffset = $('#pullUp').height();
			var myScroll = new iScroll('wrapper', {
				useTransition: true,
				topOffset: this.pullDownOffset,
				onRefresh: function () {
					if ($('#pullDown').hasClass('loading')) {
						$('#pullDown').removeClass('loading');
						$('#pullDown').find('.pullDownLabel').text('下拉加载更多数据');
					} else if ($('#pullUp').hasClass('loading')) {
						$('#pullUp').removeClass('loading');
						$('#pullUp').find('.pullUpLabel').text('上拉加载更多数据');
					}
				},
				onScrollMove: function () {
					if (this.y > 5 && !$('#pullDown').hasClass('flip')) {
						$('#pullDown').addClass('flip');
						$('#pullDown').find('.pullDownLabel').text('释放加载数据...');
						this.minScrollY = 0;
					} else if (this.y < 5 && $('#pullDown').hasClass('flip')) {
						$('#pullDown').removeClass('flip');
						$('#pullDown').find('.pullDownLabel').text('下拉刷新...');
						this.minScrollY = -this.pullDownOffset;
					} else if (this.y < (this.maxScrollY - 5) && !$('#pullUp').hasClass('flip')) {
						$('#pullUp').addClass('flip');
						$('#pullUp').find('.pullUpLabel').text('释放加载数据...');
						this.maxScrollY = this.maxScrollY;
					} else if (this.y > (this.maxScrollY + 5) && $('#pullUp').hasClass('flip')) {
						$('#pullUp').removeClass('flip');
						$('#pullUp').find('.pullUpLabel').text('上拉加载更多...');
						this.maxScrollY = this.pullUpOffset;
					}
				},
				onScrollEnd: function () {
					if ($('#pullDown').hasClass('flip')) {
						$('#pullDown').removeClass('flip');
						$('#pullDown').addClass('loading');
						$('#pullDown').find('.pullDownLabel').text('拼命加载中...');
						//this.refreshScrollBar();
						pullDownAction();	// Execute custom function (ajax call?)
					} else if ($('#pullUp').hasClass('flip')) {
						$('#pullUp').removeClass('flip');
						$('#pullUp').addClass('loading');
						$('#pullUp').find('.pullUpLabel').text('拼命加载中...');
						
						pullUpAction();	// Execute custom function (ajax call?)
						$('#pullUp').find('.pullUpLabel').text('数据已全部加载完毕');
					}
				}
			});
			
			//刷新滚动区域的滚动条的位置（此方法在添加数据后调用）
			function refreshScrollBar() {
				console.log("刷新滚动条");
				setTimeout(function () {
					myScroll.refresh();
				}, 1000);
			}
			//下拉刷新
			function pullDownAction(){
				console.log("下拉");
				setTimeout(function () {
					var parm = {};
					var discoveryId = $('#thelist').find('div.item').eq(0).attr('discoveryId');
					parm.discoveryId = discoveryId;
					parm.type = 'down';
					_this.$http.get(BASE_URL+'/discoveryList', {params: parm}).then(function(res) {
						if(res.data.errorNo==200){
							if(res.data.list != undefined && res.data.list.length>=res.data.pageSize){
								_this.items = jQuery.common.appendJson(_this.items, res.data.list);
							} 
						} else {
							Materialize.toast('数据已最新', 3000);
						}
					}, function(res) {
						Materialize.toast(res.data, 3000);
					});
					
					refreshScrollBar();
					console.log($("#thelist").height())
				}, 1000);
			}
			//上拉刷新
			function pullUpAction(){
				console.log("上拉");
				setTimeout(function () {
					var parm={};
					var lastIndex = $('#thelist').find('div.item').length;
					var discoveryId = $('#thelist').find('div.item').eq(lastIndex-1).attr('discoveryId');
					parm.discoveryId = discoveryId;
					parm.type = 'up';
					_this.$http.get(BASE_URL+'/discoveryList', {params: parm}).then(function(res) {
						if(res.data.errorNo==200){
							console.log(res.data.list);
							if(res.data.list != undefined && res.data.list.length>=0){
								_this.items = jQuery.common.appendJson(res.data.list, _this.items);
							} 
						} else {
							Materialize.toast('没有更多数据了', 3000);
						}
					}, function(res) {
						Materialize.toast(res.data, 3000);
					});
					
					console.log($("#thelist").height());
					refreshScrollBar();
				}, 1000);
			}

			setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
		},
		
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
</style>
