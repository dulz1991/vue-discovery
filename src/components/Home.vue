<template>
  <div id="app" class="container">
		<div class="row">
			
			<div class="col s12 m6" v-for="item in items">
				
				<div class="card" v-if="item.hasImg">
					<div class="card-image">
						<img :src="item.imgPath" >
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
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      items: []
    }
  },
  mounted: function () {
	document.title="首页";
	jQuery.common.isLogin();
	this.getList();
  },
  methods: {
		getList: function () {
			this.$http.get(BASE_URL+'/discoveryList').then(function(res) {
				this.items=res.data.page.list;
            }, function(res) {
				Materialize.toast(res.data, 3000);
            });
			
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
</style>
