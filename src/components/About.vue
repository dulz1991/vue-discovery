<template>
	<div class="row">
		
		<div class="row col s12">
			<blockquote><h5 class="header">{{title}}</h5></blockquote>
			<p>本站用于交友学习，抒发情怀（发发牢骚）。或者发表各种有意思的事情。</p>
			<p>大家对本站有任何意见或建议，欢迎批评指教。</p>
			<p>
				另外,由于本站资金短缺，有好心人可怜，求打赏...！
				<img src="/static/images/timg.gif">
			</p>
		</div>
		
	</div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      title: '关于本站'
    }
  },
  mounted: function () {
	document.title = this.title;
	jQuery.common.isLogin();
  },
}
</script>

