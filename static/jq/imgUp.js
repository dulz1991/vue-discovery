 //下面用于多图片上传预览功能
function setImagePreviews(source, target) {
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
            dd.src="/static/img/uploadimg.png"; 
        }
    }  
    if(fileList.length==0){
        /*dd.style.width = '80px';
        dd.style.height = '82px';*/
        dd.src="/static/img/uploadimg.png"; 
    }
    return true;
}
