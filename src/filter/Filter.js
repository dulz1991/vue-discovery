import Vue from 'vue'
Vue.filter('formatDate', function (value) {
    var datetime = new Date(value);
   var year=datetime.getFullYear(); 
   var month=datetime.getMonth()+1; 
   var day=datetime.getDate(); 
   var hour=datetime.getHours(); 
   var minute=datetime.getMinutes(); 
   var second=datetime.getSeconds(); 
   function add0(t){
      return t<10?'0'+t:t
   }
   return year+"-"+add0(month)+"-"+add0(day)+" "+add0(hour)+":"+add0(minute)+":"+add0(second);
});