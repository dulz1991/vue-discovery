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
    },

    /**
     * 拼接json列表
     * @param  {[type]} source      [description]
     * @param  {[type]} destination [description]
     * @return {[type]}             [description]
     */
    appendJson: function(source, destination){
		for(var property in source){
			destination.push(source[property])
		}
		return destination;
	},

    /**
     * 图片上传预览
     * @param {[type]} source [description]
     * @param {[type]} target [description]
     */
    setImagePreviews: function(source, target){
        var docObj = document.getElementById(source);
        var dd = document.getElementById(target);
        dd.innerHTML = "";
        var fileList = docObj.files;
        for (var i = 0; i < fileList.length; i++) {    
            if (docObj.files && docObj.files[i]) {
                /*dd.style.width = '80px';
                dd.style.height = '82px';*/
                dd.src=window.URL.createObjectURL(docObj.files[i]); 
            } else {
                /*dd.style.width = '80px';
                dd.style.height = '82px';*/
                dd.src="/static/images/z_add.png"; 
            }
        }  
        if(fileList.length==0){
            /*dd.style.width = '80px';
            dd.style.height = '82px';*/
            dd.src="/static/images/z_add.png"; 
        }
        return true;
    },

    /* 含文件的表单提交 */
    ajaxFileSubmit : function(elem ,_submitUrl,_isRefrush, _jumpUrl) {
        var _this = this;
        $(elem).ajaxSubmit({  
            type:'post',  
            cache: false,  
            url: _submitUrl, 
            dataType : 'json', //返回值类型 一般设置为json  
            success : function(data, status) {  
                if(data.errorNo==200){
                    if(_isRefrush){
                        self.location= _jumpUrl;
                        return;
                    }
                    if(_this.notBlank(data.errorInfo)){
                        _this.bottomTip(data.errorInfo);    
                    } else {
                        _this.bottomTip("上传成功");    
                    }
                } else {
                    _this.bottomTip(data.errorInfo);
                }
            },  
            error : function(data, status, e) {  
                _this.bottomTip("上传失败");
            }   
        });
    },
})

