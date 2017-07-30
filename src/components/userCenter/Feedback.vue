<template>
	<div>
		<mt-header fixed title="反馈">
        <a href="/user/index" slot="left">
            <mt-button icon="back">返回</mt-button>
          </a>
          <mt-button slot="right">
            <a href="javascript:;" class="link-btn">...</a>
          </mt-button>
      </mt-header>
    <br><br>
    
    <div class="padding10">
      <h4>暂时也没有什么好反馈的...</h4>
      <img src="/static/images/tu1.jpg" />
    </div>
		
	</div>
</template>

<script>
import { Header, Cell } from 'mint-ui'
export default {
  name: 'feedback',
  data () {
    return {
    	
    }
  },
   mounted: function () {
   },
   components:{
  	
  },
  methods: {
  }
}
</script>


