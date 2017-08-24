//平台
Ext.define('platform',{
	extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'name'},
        {name: 'username'},
        {name: 'loginPassword'},
        {name: 'tradePassword'},
        {name: 'gesturePassword'},
        {name: 'type'},
        {name: 'amount'},
        {name: 'tradingAmount'},
        {name: 'availableBalance'},
        {name: 'remark'},
        {name: 'udpateDate'}
    ]
});

var platformStore = Ext.create('Ext.data.Store',{
	model: 'platform',
	pageSize:50,
	groupField :'type',
    proxy: {
        type: 'ajax',
        url: 'platformlist.action',
        reader: {
            type: 'json',
            root: 'list',
            totalProperty :'total'
        }
    },
    autoLoad: true,
    remoteSort: true
});

var platformGrid = Ext.create('Ext.grid.Panel',{
//	title: '平台',
    store: platformStore,
    selModel:Ext.create('Ext.selection.CheckboxModel'),
//    features:[
//          Ext.create('Ext.grid.feature.Grouping', {
//     	    groupHeaderTpl: '平台类型: {name} ({rows.length})',
//     	    startCollapsed: false 
//     	}),
//     	{
//        	  ftype: 'summary'
//     	}
//     ],
    features: [
//	    {
//	        ftype: 'groupingsummary',
//	        groupHeaderTpl: '{name}',
//	        hideGroupedHeader: false,
//	        enableGroupingMenu: true
//	    },
	    {
	        ftype: 'summary'
	    }
	],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
            	xtype:'button',
            	text:'新建',
            	handler:function(){
            		platformWin.down('form').getForm().reset();
            		platformWin.isNew = true;
            		platformWin.show();            		
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
            		    url: 'platformfindById.action',
            		    params: {
            		        id: record.get('id')
            		    },
            		    success: function(response){
            		        var text = Ext.decode(response.responseText);
            		        var values = {
            		        	'platform.id':text.obj.id,
            		        	'platform.sysUserID':text.obj.sysUserID,
            		        	'platform.name':text.obj.name,
            		        	'platform.username':text.obj.username,
            		        	'platform.loginPassword':text.obj.loginPassword,
            		        	'platform.tradePassword':text.obj.tradePassword,
            		        	'platform.gesturePassword':text.obj.gesturePassword,
            		        	'platform.type':text.obj.type,
            		        	'platform.amount':text.obj.amount,
            		        	'platform.tradingAmount':text.obj.tradingAmount,
            		        	'platform.availableBalance':text.obj.availableBalance,
            		        	'platform.remark':text.obj.remark
            		        };
            		        var form = platformWin.down('form').getForm();
            		        form.reset();
            		        form.setValues(values);
            		        platformWin.isNew = false;
            		        platformWin.show();
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
                        		    url: 'platformdelete.action',
                        		    params: {
                        		        id: record.get('id')
                        		    },
                        		    success: function(response){
                        		        var text = Ext.decode(response.responseText);
                        		        if(text.success){
                        		        	platformStore.load();
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
				   itemId:'name',
				   listeners:{
					   specialkey:function(field, event){
						   if (event.keyCode==13){			
							   this.up('toolbar').down('#searchBtn').fireEvent('click');
						   }
    	    		   }
    	    	   }
			},
			{
				xtype:'combobox',
	        	fieldLabel:'平台类型',
	        	labelAlign:'right',
	        	labelWidth:60,
	        	width:200,
	        	editable:true,
	        	itemId:'type',
	        	minChars: 1,
 	    	    typeAhead :true,
	        	store:{
 	    		   xtype:'store',
 	    		   fields:['type'],
 	    		   proxy: {
	    		         type: 'ajax',
	    		         url: 'platformlistType.action',
	    		         reader: {
	    		        	 type: 'json',
	    		             root: 'list'
	    		         }
	    		   },
	    		   autoLoad: true
 	    	    },
	        	displayField:'type',
	        	valueField:'type',
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
						   var name = this.up('toolbar').down('#name').getValue();
						   var type = this.up('toolbar').down('#type').getValue();
						   this.up('grid').getStore().load({
							   params:{
								   name:name,
								   type:type
							   }           			   
						   }); 
					   }
				   }
			}
        ]
    },
    {
    	xtype: 'pagingtoolbar',
        store: platformStore,
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
        	header: '平台类型', 
        	dataIndex: 'type',
        	align:'left',
        	summaryRenderer: function(value, summaryData, dataIndex) {
                return '合计';
            }
        },
        { 
        	header: '平台名称', 
        	dataIndex: 'name',
        	width: 150,
        	align:'left'
        },
        { 
        	header: '平台总金额', 
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
        	header: '交易中金额', 
        	xtype:'numbercolumn',
        	dataIndex: 'tradingAmount',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'blue',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
            }
        },  
        { 
        	header: '可用余额', 
        	xtype:'numbercolumn',
        	dataIndex: 'availableBalance',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'green',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
            }
        },  
        { 
        	header: '平台账号', 
        	dataIndex: 'username',
        	width:200,
        	align:'left'
        },
        { 
        	header: '平台登陆密码', 
        	dataIndex: 'loginPassword',
        	align:'left'
        },
        { 
        	header: '平台交易密码', 
        	dataIndex: 'tradePassword',
        	align:'left'
        },        
        { 
        	header: '平台手势密码', 
        	dataIndex: 'gesturePassword',        	
        	align:'left'
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
        	dataIndex: 'udpateDate',
        	width:120,
        	align:'center'
        }
    ]
});

var platformWin = Ext.create('Ext.window.Window', {
    title: '平台',
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
        		labelWidth:80
        	},       
        	layout:{
        		type:'table',
        		columns:2
        	},
        	items:[
        	   {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'平台名称',
    	    	   labelAlign:'right',
    	    	   width:425,
    	    	   allowBlank:false,
    	    	   colspan:2,
    	    	   name:'platform.name'
    	       },
    	       {
    	    	   xtype:'combobox',
    	    	   fieldLabel:'平台类型',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   name:'platform.type',
    	    	   minChars: 1,
    	    	   typeAhead :true,
	   	           store:{
	    	    		   xtype:'store',
	    	    		   fields:['type'],
	    	    		   proxy: {
	   	    		         type: 'ajax',
	   	    		         url: 'platformlistType.action',
	   	    		         reader: {
	   	    		        	 type: 'json',
	   	    		             root: 'list'
	   	    		         }
	   	    		   },
	   	    		   autoLoad: true
	    	    	    },
	   	        	displayField:'type',
	   	        	valueField:'type',
    	       },
    	       {
    	    	   xtype:'numberfield',
    	    	   fieldLabel:'平台总金额',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'platform.amount',
    	    	   itemId:'amount',
    	    	   decimalPrecision:2
    	       },
    	       {
    	    	   xtype:'numberfield',
    	    	   fieldLabel:'交易中金额',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'platform.tradingAmount',
    	    	   itemId:'tradingAmount',
    	    	   minValue:0,
    	    	   decimalPrecision:2
    	       },
    	       {
    	    	   xtype:'numberfield',
    	    	   fieldLabel:'可用余额',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'platform.availableBalance',
    	    	   itemId:'availableBalance',
    	    	   decimalPrecision:2
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'平台账号',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'platform.username'
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'平台登陆密码',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'platform.loginPassword'
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'平台交易密码',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'platform.tradePassword'
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'平台手势密码',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'platform.gesturePassword'
    	       },
    	       {
    	    	   xtype:'textarea',
    	    	   fieldLabel:'备注',
    	    	   width:425,
    	    	   labelAlign:'right',
    	    	   height:40,
    	    	   colspan:2,
    	    	   name:'platform.remark'
    	       },
    	       {
    	    	   xtype:'button',
    	    	   margin:'10 10 10 360',
    	    	   colspan:2,
    	    	   text:'&nbsp;&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;存&nbsp;&nbsp;&nbsp;',
    	    	   handler:function(btn){
    	    		   var URL = '';
    	    		   if(this.up('window').isNew){
    	    			   URL = 'platformadd.action';
    	    		   }else{
    	    			   URL = 'platformupdate.action';
    	    		   }
    	    		   var form = this.up('form').getForm();
    	    		   if(form.isValid()){
    	    			   form.submit({
    	    				    url: URL,
    	    				    success: function(form, action) {
//    	    				       Ext.Msg.alert('提示', action.result.msg);
    	    				       btn.up('window').hide();
    	    				       platformStore.load();
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
        		   name:'platform.id'
        	   },
    	       {
    	    	   xtype:'hidden',
    	    	   name:'platform.sysUserID'
    	       }
        	]
        }     
    ]
});
