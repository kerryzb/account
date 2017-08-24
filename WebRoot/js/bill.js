//账单
Ext.define('bill',{
	extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'platformID'},
        {name: 'platformName'},
        {name: 'date'},
        {name: 'month'},
        {name: 'amount'},
        {name: 'tradingAmount'},
        {name: 'availableBalance'},
        {name: 'amountCompare'},
        {name: 'tradingAmountCompare'},
        {name: 'availableBalanceCompare'}
    ]
});

var billStore = Ext.create('Ext.data.Store',{
	model: 'bill',
	pageSize:50,
	groupField :'type',
    proxy: {
        type: 'ajax',
        url: 'billlist.action',
        reader: {
            type: 'json',
            root: 'list',
            totalProperty :'total'
        }
    },
    autoLoad: true,
    remoteSort: true
});

var billGrid = Ext.create('Ext.grid.Panel',{
//	title: '账单',
    store: billStore,
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
            	text:'生成账单',
            	handler:function(){
            		Ext.MessageBox.confirm('提示','确定要生成账单吗?',function(btn){
            			if(btn == 'yes'){
        					Ext.Ajax.request({
                    		    url: 'billgenerateBill.action',
                    		    params: {},
                    		    success: function(response){
                    		        var text = Ext.decode(response.responseText);
                    		        if(text.success){
                    		        	billStore.load();
                    		        }else{
                    		        	Ext.Msg.alert('提示',text.msg);
                    		        }
                    		    }
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
	        	fieldLabel:'月份',
	        	labelAlign:'right',
	        	labelWidth:60,
	        	width:200,
	        	editable:true,
	        	itemId:'month',
	        	minChars: 1,
 	    	    typeAhead :true,
//	        	store:{
// 	    		   xtype:'store',
// 	    		   fields:['type'],
// 	    		   proxy: {
//	    		         type: 'ajax',
//	    		         url: 'platformlistType.action',
//	    		         reader: {
//	    		        	 type: 'json',
//	    		             root: 'list'
//	    		         }
//	    		   },
//	    		   autoLoad: true
// 	    	    },
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
						   var month = this.up('toolbar').down('#month').getValue();
						   this.up('grid').getStore().load({
							   params:{
								   name:name,
								   month:month
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
        	header: '月份', 
        	dataIndex: 'month',
        	align:'left',
        	summaryRenderer: function(value, summaryData, dataIndex) {
                return '合计';
            }
        },        
        { 
        	header: '平台总金额', 
        	xtype:'numbercolumn',
        	dataIndex: 'amount',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'red'
        },  
        { 
        	header: '总金额比较', 
        	xtype:'numbercolumn',
        	dataIndex: 'amountCompare',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'red'
        },  
        { 
        	header: '交易中金额', 
        	xtype:'numbercolumn',
        	dataIndex: 'tradingAmount',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'blue'
        },  
        { 
        	header: '交易中金额比较', 
        	xtype:'numbercolumn',
        	dataIndex: 'tradingAmountCompare',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'blue'
        },  
        { 
        	header: '可用余额', 
        	xtype:'numbercolumn',
        	dataIndex: 'availableBalance',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'green'
        },  
        { 
        	header: '可用余额比较', 
        	xtype:'numbercolumn',
        	dataIndex: 'availableBalanceCompare',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'green'
        },  
        { 
        	header: '平台名称', 
        	dataIndex: 'platformName',
        	width: 150,
        	align:'left',
        	renderer: function(value) {
                if(value){
                	return value;
                }else{
                	return '<span class="red">合计项</span>';
                }
            }
        },
        { 
        	xtype:'datecolumn',
        	format:'Y-m-d',
        	header: '账单日期', 
        	dataIndex: 'date',
        	width:90,
        	align:'center'
        }
    ]
});

