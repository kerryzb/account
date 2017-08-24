var currentSysUser = {};
Ext.Ajax.request({
    url: 'sysUserisLogin.action',
    params: {},
    success: function(response){
        var text = Ext.decode(response.responseText);
        if(text.success){
        	currentSysUser = {
	        	id:text.obj.id,
	        	role:text.obj.role,
	        	username:text.obj.username,
	        	truename:text.obj.truename,
	        	remark:text.obj.remark
	        };
        	console.log(currentSysUser.role);
        }else{
        	window.location.href="login.jsp";
        }
    }
});