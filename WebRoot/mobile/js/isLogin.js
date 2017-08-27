var currentSysUser = {};
$.ajax({
    url : 'sysUserisLogin.action',
    data:{},
    cache : false, 
    async : false,
    type : "POST",
    dataType : 'json',
    success : function (result){
    	if(result.success){
        	currentSysUser = {
	        	id:result.obj.id,
	        	role:result.obj.role,
	        	username:result.obj.username,
	        	truename:result.obj.truename,
	        	remark:result.obj.remark
	        };
        }else{
        	window.location.href="login.html";
        }
    }
});