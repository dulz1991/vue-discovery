jQuery.common = {
		
	/**
	 * 删除
	 */
	deleteById: function(_id, _deleteUrl, _isRefrush, _jumpUrl) {
		$.ajax({
			type: "GET",
			url: _deleteUrl,
			dataType : "json",
			data: {
				idList : _id
			},
			success: function(data) {
				if (data.errorNo != 0) {
					alert(data.errorInfo);
				} else {
					if(_isRefrush){
						self.location.href=_jumpUrl;
					} else {
						alert(data.errorInfo);
					}
				}
			}
		});
	},
	
	/**
	 * 删除
	 */
	deleteByParm: function(_parm, _deleteUrl, _isRefrush, _jumpUrl) {
		$.ajax({
			type: "GET",
			url: _deleteUrl,
			dataType : "json",
			data: _parm,
			success: function(data) {
				if (data.errorNo != 0) {
					alert(data.errorInfo);
				} else {
					if(_isRefrush){
						self.location.href=_jumpUrl;
					} else {
						alert(data.errorInfo);
					}
				}
			}
		});
	},
	
	updateObjByParm: function(_obj, _updateUrl, _isRefrush, _jumpUrl) {
		$.ajax({
			type: "POST",
			url: _updateUrl,
			dataType : "json",
			data: _obj,
			success: function(data) {
				if (data.errorNo != 0) {
					alert(data.errorInfo);
				} else {
					if(_isRefrush){
						self.location.href=_jumpUrl;
					} else {
						alert(data.errorInfo);
					}
				}
			}
		});
	},
	
	/* 含文件的表单提交 */
	ajaxFileSubmit : function(elem ,_submitUrl,_isRefrush, _jumpUrl, _parm) {
		$(elem).ajaxSubmit({  
            type:'post',  
            cache: false,  
            url: _submitUrl, 
			data : _parm,
            dataType : 'json', //返回值类型 一般设置为json  
            success : function(data, status) {  
	        	if(data.errorNo==200){
	        		if(_isRefrush){
	        			self.location= _jumpUrl;
	        		}
				} else {
					Materialize.toast(data.errorInfo, 3000);
				}
	        },  
	        error : function(data, status, e) {  
	        	Materialize.toast(data.errorInfo, 3000);
	        }   
        });
	},
	
	/**
	 * 
	 * @param elem
	 * @param _submitUrl
	 * @param _isRefrush
	 * @param _jumpUrl
	 */
	saveObj : function(elem ,_submitUrl,_isRefrush, _jumpUrl) {
		var parm = this.getFormJson(elem);
		$.ajax({  
            type:'post',  
            cache: false,  
            url: _submitUrl, 
            data:parm,
            dataType : 'json', //返回值类型 一般设置为json  
            success : function(data, status) {  
	        	if(data.errorNo==0){
	        		if(_isRefrush){
	        			self.location= _jumpUrl;
	        		}
				} else {
					alert(data.errorInfo);
				}
	        },  
	        error : function(data, status, e) {  
	        	alert(data.errorInfo); 
	        }   
        });
	},
	
	saveObjByParm : function(_parm ,_submitUrl,_isRefrush, _jumpUrl) {
		$.ajax({  
            type:'post',  
            cache: false,  
            url: _submitUrl, 
            data:_parm,
            dataType : 'json', //返回值类型 一般设置为json  
            success : function(data, status) {  
	        	if(data.errorNo==0){
	        		if(_isRefrush){
	        			self.location= _jumpUrl;
	        		}
				} else {
					alert(data.errorInfo);
				}
	        },  
	        error : function(data, status, e) {  
	        	alert(data.errorInfo); 
	        }   
        });
	},
	
	/* 联动刷新select */
	refreshSelect : function(_currentElem, _targetElem, _getUrl){
		var parentId = $(_currentElem).val();
		$.ajax({
			type: "GET",
			url: _getUrl,
			dataType : "json",
			data: {
				id : parentId 
			},
			success: function(data) {
				if (data.errorNo == 0) {
					if(data.list==undefined){
						return;
					}
					var html = '';
					var len = data.list.length;
					for (var i = 0; i < len; i++) {
						var item = data.list[i];
						html += '<option value="'+item.id+'">'+item.typeName+'</option>';
					}
					$(_targetElem).html(html);
				} 
			}
		});
	},
	
	login : function(_elem ,_submitUrl) {
		var parm = this.getFormJson(_elem);
		$.ajax({  
            type:'post',  
            cache: false,  
            url: _submitUrl, 
            data:parm,
            dataType : 'json', //返回值类型 一般设置为json  
            success : function(data, status) {  
	        	if(data.errorNo==0){
	        		var url = data.url;
	        		self.location= url;
				} else {
					alert(data.errorInfo);
				}
	        },  
	        error : function(data, status, e) {  
	        	alert(data.errorInfo); 
	        }   
        });
	},
	
	//表单序列化
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
		
	//cookie操作
	setCookie: function (name, value, days) {
		if(days<0){
			days = 36500;
		}
		var d = new Date;
		d.setTime(d.getTime() + 24*60*60*1000*days);
		window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
	},
	getCookie: function (name) {
		var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		return v ? v[2] : null;
	},
	deleteCookie: function (name) {
		jQuery.common.setCookie(name, "", -1); 
	},
	
	//判断是否为空
	notBlank: function (vlaue) {
		if(vlaue!='' && vlaue!=null && vlaue!=undefined){
			return true;
		}
		return false;
	},
	
	//判断是否登录并作相对应的处理
	isLogin: function(){
		var username = jQuery.common.getCookie("cookie_user");
		if(jQuery.common.notBlank(username)){
			//隐藏nav的登录和注册
			$('.brand-logo').hide();
			return true;
		} else {
			//显示nav的登录和注册
			$('.brand-logo').show();
			return false;
		}
	},
	
	//获取地址栏参数
	getQueryString: function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	},
	
	//json集合间拼接
	appendJson: function(source, destination){
		for(var property in source){
			destination.push(source[property])
		}
		return destination;
	}
	
}

