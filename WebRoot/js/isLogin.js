var currentSysUser = {};
Ext.Ajax.request({
    url: 'sysUserisLogin.action',
    params: {},
    async: false,
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
        }else{
        	window.location.href="login.jsp";
        }
    }
});