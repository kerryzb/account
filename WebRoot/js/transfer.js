//出入账查询
Ext.define('transfer',{
	extend: 'Ext.data.Model',
    fields: [
         {name: 'id'},
	     {name: 'sysUserID'},
	     {name: 'platformID'},
	     {name: 'platformName'},
	     {name: 'balance'},
	     {name: 'transferDate'},
	     {name: 'fromAmount'},
	     {name: 'toAmount'},
	     {name: 'remark'},
	     {name: 'updateDate'}
    ]
});

var transferStore = Ext.create('Ext.data.Store',{
	model: 'transfer',
	pageSize:50,
    proxy: {
        type: 'ajax',
        url: 'transferAccountlistTransfer.action',
        reader: {
            type: 'json',
            root: 'list',
            totalProperty :'total'
        }
    },
    autoLoad: true,
    remoteSort: true
});

var transferGrid = Ext.create('Ext.grid.Panel',{
//	title: '出入账查询',
    store: transferStore,
    features: [
   		{
   		    ftype: 'summary'
   		}
   	],
    selModel:Ext.create('Ext.selection.CheckboxModel'),
    dockedItems: [
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
        store: transferStore,
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
        	header: '平台名称', 
        	dataIndex: 'platformName',
        	align:'left',
        	tdCls:'blue',
        	align:'left',
        	summaryRenderer: function(value, summaryData, dataIndex) {
                return '合计';
            }
        },
        { 
        	xtype:'datecolumn',
        	format:'Y-m-d',
        	header: '转账时间', 
        	dataIndex: 'transferDate'
        },          
        { 
        	header: '转入金额', 
        	xtype:'numbercolumn',
        	dataIndex: 'toAmount',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'red',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
            }
        },
        { 
        	header: '转出金额', 
        	xtype:'numbercolumn',
        	dataIndex: 'fromAmount',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'green',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
        	}
        },        
        { 
        	header: '平台总金额', 
        	xtype:'numbercolumn',
        	dataIndex: 'balance',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'blue'
        },
        { 
        	header: '备注', 
        	dataIndex: 'remark',
        	width:200,
        	flex:1,
        	align:'left',
        	renderer:function(value){
        		if(value){
        			return '<span title="'+value+'">'+value+'</span>';
        		}
        		return '';
        	}
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

