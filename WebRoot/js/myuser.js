/**
 * 我的账户
 */
var myuserPanel = Ext.create('Ext.form.Panel',{
		defaults:{
			margin:'20 10 0 10',
			labelWidth:60
		},       
		layout:{
			type:'table',
			columns:2
		},
		items:[
		       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'姓名',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   name:'sysUser.truename',
    	    	   value: currentSysUser.truename
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'用户名',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   readOnly:true,
    	    	   name:'sysUser.username',
    	    	   value: currentSysUser.username
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'登际密码',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   itemId:'password',
    	    	   name:'sysUser.password',
    	    	   value: '******'
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'确认密码',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   itemId:'password2',
    	    	   name:'sysUser.password2',
    	    	   value: '******'
    	       },
    	       {
    	    	   xtype:'textarea',
    	    	   fieldLabel:'备注',
    	    	   width:425,
    	    	   labelAlign:'right',
    	    	   height:70,
    	    	   colspan:2,
    	    	   name:'sysUser.remark',
    	    	   value: currentSysUser.remark
    	       },
    	       {
    	    	   xtype:'button',
    	    	   margin:'20 10 20 360',
    	    	   colspan:2,
    	    	   text:'&nbsp;&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;存&nbsp;&nbsp;&nbsp;',
    	    	   handler:function(btn){
    	    		   var form = this.up('form').getForm();
    	    		   if(form.isValid()){
    	    			   if(this.up('form').down('#password').getValue()!=this.up('form').down('#password2').getValue()){
    	    				   Ext.Msg.alert('提示', '密码不一致！');
    	    				   return;
    	    			   }
    	    			   form.submit({
    	    				    url: 'sysUserupdate.action',
    	    				    success: function(form, action) {
    	    				    	console.log(form);
    	    				    	console.log(action);
    	    				       Ext.Msg.alert('提示', action.result.msg);
    	    				    },
    	    				    failure: function(form, action) {
    	    				    	Ext.Msg.alert('提示', action.result.msg);
    	    				    }
    	    				});
    	    		   }
    	    	   }
    	       },
    	       {
        		   xtype:'hidden',
        		   name:'sysUser.id',
        		   hidden:true,
    	    	   value: currentSysUser.id
        	   },
    	       {
    	    	   xtype:'hidden',
    	    	   name:'sysUser.role',
        		   hidden:true,
    	    	   value: currentSysUser.role
    	       }
		]

});