<template>
		<div class="zxf_pagediv" v-if="showPageBar">
			<!-- 上一页 -->
			<a href="javascript:;" class="prebtn" @click="turnPage(page.current-1)" v-if="page.current>1">上一页</a>
			<span class="disabled" v-if="page.current<=1">上一页</span>

			<!-- 中间页 -->
			<span v-if="page.current >4 && page.pageNum > page.shownum">
				<a href="javascript:;" class="zxfPagenum" @click="turnPage(1)">1</a>
				<a href="javascript:;" class="zxfPagenum" @click="turnPage(2)">2</a>
				<span>...</span>
			</span>
			<span v-for="i in end">
				<span v-if="i <= page.pageNum && i >=1 && i >=start">
					<span :class="'zxfPagenum '+page.activepage" v-if="i == page.current">{{i}}</span>
					<a href="javascript:;" class="zxfPagenum" @click="turnPage(i)" v-else-if="i == page.current+1">{{i}}</a>
					<a href="javascript:;" class="zxfPagenum" @click="turnPage(i)" v-else>{{i}}</a>
				</span>
			</span>
			<span v-if="end < page.pageNum">...</span>
			
			<!-- 尾部 -->
			<span>共<b>{{page.pageNum}}</b>页，</span>
			<span>到第<input type="text" class="zxfinput" id="selectedPage"
			onkeyup="this.value=this.value.replace(/\D/g,'')"  onafterpaste="this.value=this.value.replace(/\D/g,'')" :value="page.current"/>页</span>
			<span class="zxfokbtn" @click="turnSelectedPage">确定</span>

			<!-- 下一页 -->
			<span class="disabled" v-if="page.current >= page.pageNum">下一页</span>
			<a href="javascript:;" class="nextbtn" @click="turnPage(page.current+1)"
			 v-if="page.current < page.pageNum">下一页</a>
		</div>
</template>
<script>
	export default{
		name: 'vue_page',
		data: function (){
			return {
				page:{
					pageNum : '1',
					current : '1',
					shownum : '10',
					pageSize : '2',
					activepage : 'current',
					activepaf : 'nextpage'
				},
				numshow:'',
				numbefore:'',
				numafter:'',
				start:'',
				end:'',
				showPageBar: false
			}
		},
		props: {
			value : ''
		},
		components: {
		},
		mounted:function () {
			/*this.$nextTick(function () {
		        this.$on('childMethod', function () {
		        	//父组件里使用方式：
		        	//this.$refs.vue_page.$emit('childMethod') // 方法1
      				//this.$refs.vue_page.callMethod() // 方法2
		          	console.log('监听成功')
		        })
		    })*/
		},
		methods: {
			pageInit: function(){
				var pageinit = this.page;

				if(pageinit.pageNum>1){
					this.showPageBar = true;
				} else {
					this.showPageBar = false;
					return;
				}
				if (pageinit.shownum<5) {
					pageinit.shownum = 5;
				}
				if (pageinit.pageNum<pageinit.shownum) {
					pageinit.shownum = pageinit.pageNum;
				}
				this.numshow = pageinit.shownum-4;
				this.numbefore = parseInt((pageinit.shownum - 5)/2);
				if ((pageinit.shownum - 5)%2>0) {
					this.numafter = this.numbefore + 1;
				} else{
					this.numafter = this.numbefore;
				}


				if (pageinit.current >4 && pageinit.current < pageinit.pageNum-this.numshow && pageinit.pageNum > pageinit.shownum) {	
					this.start  = pageinit.current - this.numbefore,this.end = pageinit.current + this.numafter;
				}else if(pageinit.current >4 && pageinit.current >= pageinit.pageNum-this.numshow && pageinit.pageNum > pageinit.shownum){
					this.start  = pageinit.pageNum - this.numshow,this.end = pageinit.pageNum;
				}else{
					if (pageinit.pageNum <= pageinit.shownum) {
						this.start = 1,this.end = pageinit.shownum;
					} else{
						this.start = 1,this.end = pageinit.shownum-1;
					}
				}
	  		},
	  		turnPage: function(pageNo){
	  			this.page.current=pageNo;
	  			this.$emit('turnPage',pageNo);
	  			/*this.$parent.init(pageNo);*/
	  		},
	  		turnSelectedPage: function(){
	  			var selectedPage = $('#selectedPage').val();
	  			if(selectedPage>this.page.pageNum){
	  				$('#selectedPage').val(this.page.pageNum);
	  				selectedPage = this.page.pageNum;
	  			} else if(selectedPage<1){
					$('#selectedPage').val('1');
	  				selectedPage = 1;
	  			}
	  			this.page.current=selectedPage;
	  			this.$emit('turnPage',selectedPage);
	  			/*this.$parent.init(selectedPage);*/
	  		}
	  		/*callMethod () {
	        	console.log('调用成功')
	        }*/
		}
	}
</script>