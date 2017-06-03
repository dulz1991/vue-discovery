<template>
  <div class="row">
      <div class="col s12"><blockquote><h5 class="header">{{item.title}}</h5> </blockquote></div>
      <div class="col s6">{{item.username}}</div>
      <div class="col s6"><span class="flow-text">{{item.createTimeStr}}</span></div>
	  
	<div class="col s12">
		<div class="card-image">
			<img :src="baseImgUrl+item.imagePath" width="100%">
			<!-- <span class="card-title">{{item.title}}</span> -->
		</div>
		<div class="card-content">
			{{item.content}}
		</div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      title : '',
	  item : '',
	  baseImgUrl:''
    }
  },
  mounted: function () {
	jQuery.common.isLogin();
	this.baseImgUrl = BASE_IMG_URL;
	this.getDetail();
  },
  methods: {
		getDetail: function () {
			var id = jQuery.common.getQueryString("id");
			this.$http.get(BASE_URL+'/discoveryDetail?id='+id).then(function(res) {
				if(res.data.errorNo==404){
					self.location='/Notfound';
				}
				this.item=res.data.detail;
				document.title = res.data.detail.title;
            }, function(res) {
				Materialize.toast(res.data.error, 3000);
            });
			
		}
	}
}
</script>

</style>
