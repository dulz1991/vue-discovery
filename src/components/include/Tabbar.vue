<template>
  <div>
    <mt-tabbar fixed v-model="selected">
      <mt-tab-item id="Home" @click.native="jumpUrl('/')">
        <img slot="icon" :src="BASE_IMG_URL+'/img/home_red.png'">
        首页
      </mt-tab-item>
      <mt-tab-item id="Mine" @click.native="jumpUrl('/user/index')">
        <img slot="icon" :src="BASE_IMG_URL+'/img/person_blue.png'">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';
export default {
  name: 'tabbar',
  data () {
    return {
      selected:'Home'
    }
  },
  mounted: function () {
    
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
