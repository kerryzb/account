//出入账
Ext.define('transferAccount',{
	extend: 'Ext.data.Model',
    fields: [
         {name: 'id'},
	     {name: 'fromPlatformID'},
	     {name: 'fromPlatformName'},
	     {name: 'fromPlatformBalance'},
	     {name: 'toPlatformID'},
	     {name: 'toPlatformName'},
	     {name: 'toPlatformBalance'},
	     {name: 'transferDate'},
	     {name: 'amount'},
	     {name: 'remark'},
	     {name: 'updateDate'}
    ]
});

var transferAccountStore = Ext.create('Ext.data.Store',{
	model: 'transferAccount',
	pageSize:50,
    proxy: {
        type: 'ajax',
        url: 'transferAccountlist.action',
        reader: {
            type: 'json',
            root: 'list',
            totalProperty :'total'
        }
    },
    autoLoad: true,
    remoteSort: true
});

var transferAccountGrid = Ext.create('Ext.grid.Panel',{
//	title: '出入账',
    store: transferAccountStore,
    features: [
   		{
   		    ftype: 'summary'
   		}
   	],
    selModel:Ext.create('Ext.selection.CheckboxModel'),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
            	xtype:'button',
            	text:'新建',
            	handler:function(){
            		transferAccountWin.down('form').getForm().reset();
            		transferAccountWin.isNew = true;
            		transferAccountWin.show();            		
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
            		    url: 'transferAccountfindById.action',
            		    params: {
            		        id: record.get('id')
            		    },
            		    success: function(response){
            		        var text = Ext.decode(response.responseText);
            		        transferAccountWin.isNew = false;
            		        transferAccountWin.show();       		        
            		        var values = {
            		        	'transferAccount.id':text.obj.id,
            		        	'transferAccount.sysUserID':text.obj.sysUserID,
            		        	'transferAccount.fromPlatformID':text.obj.fromPlatformID,
            		        	'transferAccount.fromPlatformName':text.obj.fromPlatformName,
            		        	'transferAccount.toPlatformID':text.obj.toPlatformID,
            		        	'transferAccount.toPlatformName':text.obj.toPlatformName,
            		        	'transferAccount.transferDate':text.obj.transferDate?new Date(text.obj.transferDate.replace('T',' ')):null,
            		        	'transferAccount.amount':text.obj.amount,
            		        	'transferAccount.remark':text.obj.remark
            		        };
            		        var form = transferAccountWin.down('form').getForm();
            		        form.reset();
            		        form.setValues(values);
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
                        		    url: 'transferAccountdelete.action',
                        		    params: {
                        		        id: record.get('id')
                        		    },
                        		    success: function(response){
                        		        var text = Ext.decode(response.responseText);
                        		        if(text.success){
                        		        	transferAccountStore.load();
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
				   fieldLabel:'平台名称',
				   labelAlign:'right',
				   labelWidth:60,
    	    	   width:200,
				   itemId:'platformName',
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
						   var platformName = this.up('toolbar').down('#platformName').getValue();
						   this.up('grid').getStore().load({
							   params:{
								   platformName:platformName
							   }           			   
						   }); 
					   }
				   }
			}
        ]
    },
    {
    	xtype: 'pagingtoolbar',
        store: transferAccountStore,
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
        	xtype:'datecolumn',
        	format:'Y-m-d',
        	header: '转账时间', 
        	dataIndex: 'transferDate',
        	align:'center',
        	summaryRenderer: function(value, summaryData, dataIndex) {
                return '合计';
            }
        },   
        { 
        	header: '转账金额', 
        	xtype:'numbercolumn',
        	dataIndex: 'amount',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'red',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
            }
        },
        { 
        	header: '转入平台', 
        	dataIndex: 'toPlatformName',
        	align:'left',
        	tdCls:'blue'
        },
        { 
        	header: '转入平台总金额', 
        	xtype:'numbercolumn',
        	dataIndex: 'toPlatformBalance',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'blue',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
            }
        },
        { 
        	header: '转出平台', 
        	dataIndex: 'fromPlatformName',
        	align:'left',
        	tdCls:'green'
        },
        { 
        	header: '转出平台总金额', 
        	xtype:'numbercolumn',
        	dataIndex: 'fromPlatformBalance',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'green',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
            }
        },
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

var transferAccountWin = Ext.create('Ext.window.Window', {
    title: '出入账',
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
    	    	   xtype:'combobox',
    	    	   fieldLabel:'转入平台',
    	    	   labelAlign:'right',
    	    	   width:425,
    	    	   colspan:2,
    	    	   name:'transferAccount.toPlatformID',
    	    	   itemId:'toPlatformID',
    	    	   minChars: 1,
    	    	   typeAhead :true,
    	    	   hideTrigger:false,
    	    	   store:{
    	    		   xtype:'store',
    	    		   fields:['id','name','type'],
    	    		   proxy: {
		    		         type: 'ajax',
		    		         url: 'platformlistByName.action',
		    		         reader: {
		    		        	 type: 'json',
		    		             root: 'list'
		    		         }
		    		   },
		    		   autoLoad: true
    	    	   },
    	    	   displayField:'name',
    	    	   valueField:'id',
    	    	   listeners:{
    	    		   change:function(combo,newvalue,oldvalue){
    	    			   var record = this.findRecord( 'id', newvalue);
    	    			   if(record){
    	    				   var platformName = record.get('name');
    	    				   this.up('form').down('#toPlatformName').setValue(platformName);
    	    			   }
    	    		   }
    	    	   }
    	       },
    	       {
    	    	   xtype:'combobox',
    	    	   fieldLabel:'转出平台',
    	    	   labelAlign:'right',
    	    	   width:425,
    	    	   colspan:2,
    	    	   name:'transferAccount.fromPlatformID',
    	    	   itemId:'fromPlatformID',
    	    	   minChars: 1,
    	    	   typeAhead :true,
    	    	   hideTrigger:false,
    	    	   store:{
    	    		   xtype:'store',
    	    		   fields:['id','name','type'],
    	    		   proxy: {
		    		         type: 'ajax',
		    		         url: 'platformlistByName.action',
		    		         reader: {
		    		        	 type: 'json',
		    		             root: 'list'
		    		         }
		    		   },
		    		   autoLoad: true
    	    	   },
    	    	   displayField:'name',
    	    	   valueField:'id',
    	    	   listeners:{
    	    		   change:function(combo,newvalue,oldvalue){
    	    			   var record = this.findRecord( 'id', newvalue);
    	    			   if(record){
    	    				   var platformName = record.get('name');
    	    				   this.up('form').down('#fromPlatformName').setValue(platformName);
    	    			   }
    	    		   }
    	    	   }
    	       },
    	       {
    	    	   xtype:'datefield',
    	    	   fieldLabel:'转账日期',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   format:'Y-m-d',
    	    	   name:'transferAccount.transferDate'
    	       },
    	       {
    	    	   xtype:'numberfield',
    	    	   fieldLabel:'转账金额',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   name:'transferAccount.amount',
    	    	   itemId:'amount',
    	    	   minValue:0,
    	    	   decimalPrecision:2
    	       },
    	       {
    	    	   xtype:'textarea',
    	    	   fieldLabel:'备注',
    	    	   width:425,
    	    	   labelAlign:'right',
    	    	   height:40,
    	    	   colspan:2,
    	    	   name:'transferAccount.remark'
    	       },
    	       {
    	    	   xtype:'button',
    	    	   margin:'10 10 10 360',
    	    	   colspan:2,
    	    	   text:'&nbsp;&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;存&nbsp;&nbsp;&nbsp;',
    	    	   handler:function(btn){
    	    		   var URL = '';
    	    		   if(this.up('window').isNew){
    	    			   URL = 'transferAccountadd.action';
    	    		   }else{
    	    			   URL = 'transferAccountupdate.action';
    	    		   }
    	    		   var form = this.up('form').getForm();
    	    		   if(form.isValid()){
    	    			   form.submit({
    	    				    url: URL,
    	    				    success: function(form, action) {
//    	    				       Ext.Msg.alert('提示', action.result.msg);
    	    				       btn.up('window').hide();
    	    				       transferAccountStore.load();
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
        		   name:'transferAccount.id'
        	   },
        	   {
        		   xtype:'hidden',
        		   name:'transferAccount.sysUserID'
        	   },
        	   {
        		   xtype:'hidden',
        		   itemId:'fromPlatformName',
        		   name:'transferAccount.fromPlatformName'
        	   },
        	   {
        		   xtype:'hidden',
        		   itemId:'toPlatformName',
        		   name:'transferAccount.toPlatformName'
        	   }
        	]
        }     
    ]
});
