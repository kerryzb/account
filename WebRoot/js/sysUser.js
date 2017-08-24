//帐号
Ext.define('sysUser',{
	extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'username'},
        {name: 'password'},
        {name: 'truename'},
        {name: 'remark'},
        {name: 'updateDate'}
    ]
});

var sysUserStore = Ext.create('Ext.data.Store',{
	model: 'sysUser',
	pageSize:50,
	groupField :'building',
    proxy: {
        type: 'ajax',
        url: 'sysUserlist.action',
        reader: {
            type: 'json',
            root: 'list',
            totalProperty :'total'
        }
    },
    autoLoad: true,
    remoteSort: true
});

var sysUserGrid = Ext.create('Ext.grid.Panel',{
//	title: '帐号',
    store: sysUserStore,
    selModel:Ext.create('Ext.selection.CheckboxModel'),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
            	xtype:'button',
            	text:'新建',
            	handler:function(){
            		sysUserWin.down('form').getForm().reset();
            		sysUserWin.isNew = true;
            		sysUserWin.show();            		
            	}
            },
            {
            	xtype:'button',
            	text:'修改',
            	handler:function(){
            		var selections = this.up('grid').getSelectionModel().getSelection();
            		if(selections.length==0){
            			Ext.Msg.alert('提示','请先选择!'); return;
            		}
            		var record = this.up('grid').getSelectionModel().getLastSelected();
            		Ext.Ajax.request({
            		    url: 'sysUserfindById.action',
            		    params: {
            		        id: record.get('id')
            		    },
            		    success: function(response){
            		        var text = Ext.decode(response.responseText);
            		        var values = {
            		        	'sysUser.id':text.obj.id,
            		        	'sysUser.username':text.obj.username,
            		        	'sysUser.truename':text.obj.truename,
            		        	'sysUser.password':'******',
            		        	'sysUser.password2':'******',
            		        	'sysUser.remark':text.obj.remark
            		        };
            		        var form = sysUserWin.down('form').getForm();
            		        form.reset();
            		        form.setValues(values);
            		        sysUserWin.isNew = false;
            		        sysUserWin.show();
            		    }
            		});
            		
            	}
            },
            {
            	xtype:'button',
            	text:'删除',
            	handler:function(){
            		var selections = this.up('grid').getSelectionModel().getSelection();
            		if(selections.length==0){
            			Ext.Msg.alert('提示','请先选择!'); return;
            		}
            		Ext.MessageBox.confirm('提示','确认要删除吗?',function(btn){
            			if(btn == 'yes'){
            				Ext.each(selections,function(record,index){ 
            					Ext.Ajax.request({
                        		    url: 'sysUserdelete.action',
                        		    params: {
                        		        id: record.get('id')
                        		    },
                        		    success: function(response){
                        		        var text = Ext.decode(response.responseText);
                        		        if(text.success){
                        		        	sysUserStore.load();
                        		        }else{
                        		        	Ext.Msg.alert('提示',text.msg);
                        		        }
                        		    }
                        		});
                    		});
            			}
            		});
            	}
            }
        ]
    },
    {
    	xtype: 'toolbar',
        dock: 'top',
        items:[
			{
				   xtype:'textfield',
				   fieldLabel:'姓名',
				   labelAlign:'right',
				   labelWidth:60,
    	    	   width:200,
				   itemId:'truename',
				   listeners:{
					   specialkey:function(field, event){
						   if (event.keyCode==13){			
							   this.up('toolbar').down('#searchBtn').fireEvent('click');
						   }
    	    		   }
    	    	   }
			},
			{
				   xtype:'textfield',
				   fieldLabel:'用户名',
				   labelAlign:'right',
				   labelWidth:60,
    	    	   width:200,
				   itemId:'username',
				   listeners:{
					   specialkey:function(field, event){
						   if (event.keyCode==13){			
							   this.up('toolbar').down('#searchBtn').fireEvent('click');
						   }
    	    		   }
    	    	   }
			},	
			{
				   xtype:'button',
				   text:'查询',
				   margin:'0 10 0 10',
				   itemId:'searchBtn',
				   listeners:{
					   'click':function(){
						   var truename = this.up('toolbar').down('#truename').getValue();
						   var username = this.up('toolbar').down('#username').getValue();
						   this.up('grid').getStore().load({
							   params:{
								   truename:truename,
								   username:username
							   }           			   
						   }); 
					   }
				   }
			}
        ]
    },
    {
    	xtype: 'pagingtoolbar',
        store: sysUserStore,
        dock: 'bottom',
        displayInfo: true
    }],
    columns: [
        {
        	xtype: 'rownumberer',
        	width:40,
        	align:'center',
        	header:'序号'
        },
        { 
        	header: '姓名', 
        	dataIndex: 'truename',
        	align:'left'
        },
        { 
        	header: '用户名', 
        	dataIndex: 'username',
        	align:'left'
        },
//        { 
//        	header: '密码', 
//        	dataIndex: 'password',
//        	align:'center'
//        },
        { 
        	header: '备注', 
        	dataIndex: 'remark',
        	width:200,
        	flex:1,
        	align:'left'
        },
        { 
        	xtype:'datecolumn',
        	format:'Y-m-d H:i',
        	header: '更新时间', 
        	width:120,
        	dataIndex: 'updateDate',
        	align:'center'
        }
    ]
});

var sysUserWin = Ext.create('Ext.window.Window', {
    title: '帐号',
//    height: 200,
    width: 480,
    closeAction:'hide',
    layout:'fit',
    resizable :false,
    items: [
        {
        	xtype:'form',
        	defaults:{
        		margin:'10 10 10 10',
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
    	    	   name:'sysUser.truename'
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'用户名',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   name:'sysUser.username'
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'登际密码',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   itemId:'password',
    	    	   name:'sysUser.password'
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'确认密码',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   itemId:'password2',
    	    	   name:'sysUser.password2'
    	       },
    	       {
    	    	   xtype:'textarea',
    	    	   fieldLabel:'备注',
    	    	   width:425,
    	    	   labelAlign:'right',
    	    	   height:40,
    	    	   colspan:2,
    	    	   name:'sysUser.remark'
    	       },
    	       {
    	    	   xtype:'button',
    	    	   margin:'10 10 10 360',
    	    	   colspan:2,
    	    	   text:'&nbsp;&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;存&nbsp;&nbsp;&nbsp;',
    	    	   handler:function(btn){
    	    		   var form = this.up('form').getForm();
    	    		   if(form.isValid()){
    	    			   if(this.up('form').down('#password').getValue()!=this.up('form').down('#password2').getValue()){
    	    				   Ext.Msg.alert('提示', '密码不一致！');
    	    				   return;
    	    			   }
    	    			   var URL = '';
        	    		   if(this.up('window').isNew){
        	    			   URL = 'sysUseradd.action';
        	    		   }else{
        	    			   URL = 'sysUserupdate.action';
        	    		   }
    	    			   form.submit({
    	    				    url: URL,
    	    				    success: function(form, action) {
//    	    				       Ext.Msg.alert('提示', action.result.msg);
    	    				       btn.up('window').hide();
    	    				       sysUserStore.load();
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
        		   name:'sysUser.id'
        	   }
        	]
        }     
    ]
});
