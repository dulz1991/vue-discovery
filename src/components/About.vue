<template>
	<div>
		<mt-header fixed title="关于本站">
        	<a href="/user/set" slot="left">
            	<mt-button icon="back">返回</mt-button>
          	</a>
          	<mt-button slot="right">
            	<a href="javascript:;" class="link-btn">...</a>
          	</mt-button>
      	</mt-header>
    	<br><br>

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
export default {
  name: 'about',
  data () {
    return {
      
    }
  },
  components:{
  	
  },
  mounted: function () {
	
  },
}
</script>

