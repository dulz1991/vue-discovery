import {Header, Field, Button, Toast} from 'mint-ui';
export default ({
	/**
	 * 是否登录
	 * @return {[type]} 返回是否登陆 布尔值
	 */
	wasLogin : function() {
		var isLogin = false;
		$.ajax({
			type: "GET",
			url: this.BASE_URL + "/loginResult",
			dataType : "json",
			async: false,
			data: {},
			success: function(data) {
				if(data.errorNo==400){
					isLogin = false;
				} else if(data.errorNo==200) {
					isLogin = true;
				}
			}
		});
		return isLogin;
	},

	/**
	 * 判断是否需要登录或权限访问
	 * @param  {[type]} url 拦截到的地址
	 * @return {[type]}     noLogin：未登录
	 */
	urlInteceptor : function(url) {
		//登录判断
		var result = '';
		if(url.indexOf('/user')==0){ 
			var isLogin = this.wasLogin();
		    if(!isLogin){
		    	result = 'noLogin';
		    }
		}
		return result;
	},

	/**
	 * 获取地址栏参数
	 * @param  {[type]} name [地址栏参数]
	 * @return {[type]}      [参数值]
	 */
	getQueryString : function(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null) {
			return unescape(r[2]);
		}
		return "";
	},

	/**
	 * 判断是否不为空
	 * @param  {[type]} vlaue [要判断的参数]
	 * @return {[type]}       [true：不为空；false：为空]
	 */
	notBlank : function(vlaue) {
		if(vlaue!='' && vlaue!=null && vlaue!=undefined){
			return true;
		}
		return false;
	},

	/**
	 * 表单序列化 不编码
	 * @param  {[type]} elem [description]
	 * @return {[type]}      [description]
	 */
	getFormJson : function(elem) {
        var o = {};
        var a = $(elem).serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },

    /**
     * 表单序列化 编码
     * @param  {[type]} elem [description]
     * @return {[type]}      [description]
     */
	getFormJsonEncode: function(elem) {
        var o = {};
        var a = $(elem).serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = encodeURIComponent(this.value) || '';
            }
        });
        /*o = encodeURI(encodeURI(o));*/
        return o;
    },

    /**
     * 底部提示
     * @param  {[type]} text [提示文字]
     * @param  {[type]} time [提示时间 默认为2s]
     * @return {[type]}      [description]
     */
    bottomTip:function(text,time){
    	if(!this.notBlank(time)){
    		time = 2000;
    	}
    	let instance = Toast({
        	message: text,
        	position: 'bottom',
        	duration: time
      	});
      	return instance;
    },
    midTip:function(text,time){
    	if(!this.notBlank(time)){
    		time = 2000;
    	}
    	let instance = Toast({
        	message: text,
        	position: 'middle',
        	duration: time
      	});
      	return instance;
    },
    topTip:function(text,time){
    	if(!this.notBlank(time)){
    		time = 2000;
    	}
    	let instance = Toast({
        	message: text,
        	position: 'top',
        	duration: time
      	});
      	return instance;
    },

    /**
     * 跳转
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    jumpUrl:function(url){
    	self.location=url;
    }
})

