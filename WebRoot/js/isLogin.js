Ext.Ajax.request({
    url: 'sysUserisLogin.action',
    params: {},
    success: function(response){
        var text = Ext.decode(response.responseText);
        if(!text.success){
        	window.location.href="login.jsp";
        }
    }
});