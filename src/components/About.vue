<template>
	<div>
    <navbar title="关于本站" showBack="true" backUrl="/user/set"></navbar>
		
		<div class="padding10">
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
import { Header, Cell, Toast } from 'mint-ui'
import navbar from '@/components/include/Navbar'
export default {
  name: 'about',
  data () {
    return {
      
    }
  },
  components:{
  	navbar
  },
  mounted: function () {
	
  },
}
</script>

