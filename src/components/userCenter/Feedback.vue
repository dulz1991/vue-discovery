<template>
	<div>
    <navbar title="反馈" showBack="true" backUrl="/user/index"></navbar>
    
    <div class="padding10">
      <h4>暂时也没有什么好反馈的...</h4>
      <img src="/static/images/tu1.jpg" />
    </div>
		
	</div>
</template>

<script>
import { Header, Cell } from 'mint-ui'
import navbar from '@/components/include/Navbar'
export default {
  name: 'feedback',
  data () {
    return {
    	
    }
  },
   mounted: function () {
   },
   components:{
  	navbar
  },
  methods: {
  }
}
</script>


