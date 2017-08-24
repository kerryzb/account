//交易记录
Ext.define('tradeRecord',{
	extend: 'Ext.data.Model',
	fields: [
	     {name: 'id'},
	     {name: 'platformName'},
	     {name: 'platfromType'},
	     {name: 'isTradeFinish'},
	     {name: 'amount'},
	     {name: 'tradeDate'},
	     {name: 'tradeEndDate'},
	     {name: 'tradeDuration'},
	     {name: 'gains'},
	     {name: 'redPackets'},
	     {name: 'gainsAll'},
	     {name: 'remark'},
	     {name: 'updateDate'}
	 ]
});

var tradeRecordStore = Ext.create('Ext.data.Store',{
	model: 'tradeRecord',
	pageSize:50,
    proxy: {
        type: 'ajax',
        url: 'tradeRecordlist.action',
        reader: {
            type: 'json',
            root: 'list',
            totalProperty :'total'
        }
    },
    autoLoad: true,
    remoteSort: true
});

var tradeRecordGrid = Ext.create('Ext.grid.Panel',{
//	title: '交易记录',
    store: tradeRecordStore,
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
            		tradeRecordWin.down('form').getForm().reset();
            		tradeRecordWin.isNew = true;
            		tradeRecordWin.show();            		
            	}
            },
            {
            	xtype:'button',
            	text:'修改',
            	handler:function(){
            		var selections = this.up('grid').getSelectionModel().getSelection();
            		if(selections.length!==1){
            			Ext.Msg.alert('提示','请选择一条记录!'); return;
            		}
            		var record = this.up('grid').getSelectionModel().getLastSelected();
            		if(record.get('isTradeFinish')=='1'){
            			Ext.Msg.alert('提示','该交易已经完成，不可修改!'); return;
            		}
            		Ext.Ajax.request({
            		    url: 'tradeRecordfindById.action',
            		    params: {
            		        id: record.get('id')
            		    },
            		    success: function(response){
            		        var text = Ext.decode(response.responseText);
            		        tradeRecordWin.isNew = false;
            		        tradeRecordWin.show();       		
            		        
            		        var values = {
            		        	'tradeRecord.id':text.obj.id,
            		        	'tradeRecord.sysUserID':text.obj.sysUserID,
            		        	'tradeRecord.platformID':text.obj.platformID,
            		        	'tradeRecord.platformName':text.obj.platformName,
            		        	'tradeRecord.platfromType':text.obj.platfromType,
            		        	'tradeRecord.isTradeFinish':text.obj.isTradeFinish,
            		        	'tradeRecord.amount':text.obj.amount,
            		        	'tradeRecord.tradeDate':text.obj.tradeDate?new Date(text.obj.tradeDate.replace('T',' ')):null,
            		        	'tradeRecord.tradeEndDate':text.obj.tradeEndDate?new Date(text.obj.tradeEndDate.replace('T',' ')):null,
            		        	'tradeRecord.tradeDuration':text.obj.tradeDuration,
            		        	'tradeRecord.gains':text.obj.gains,
            		        	'tradeRecord.redPackets':text.obj.redPackets,
            		        	'tradeRecord.gainsAll':text.obj.gainsAll,
            		        	'tradeRecord.remark':text.obj.remark
            		        };
            		        var form = tradeRecordWin.down('form').getForm();
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
            		if(selections.length!==1){
            			Ext.Msg.alert('提示','请选择一条记录!'); return;
            		}
            		Ext.MessageBox.confirm('提示','确认要删除吗?',function(btn){
            			if(btn == 'yes'){
            				Ext.each(selections,function(record,index){ 
            					if(record.get('isTradeFinish')=='1'){
                        			Ext.Msg.alert('提示','该交易已经完成，不可删除!'); return;
                        		}
            					Ext.Ajax.request({
                        		    url: 'tradeRecorddelete.action',
                        		    params: {
                        		        id: record.get('id')
                        		    },
                        		    success: function(response){
                        		        var text = Ext.decode(response.responseText);
                        		        if(text.success){
                        		        	tradeRecordStore.load();
                        		        }else{
                        		        	Ext.Msg.alert('提示',text.msg);
                        		        }
                        		    }
                        		});
                    		});
            			}
            		});
            	}
            },
            {
            	xtype:'button',
            	text:'完成交易',
            	handler:function(){
            		var selections = this.up('grid').getSelectionModel().getSelection();
            		if(selections.length!==1){
            			Ext.Msg.alert('提示','请选择一条记录!'); return;
            		}
            		Ext.MessageBox.confirm('提示','确认完成交易吗?',function(btn){
            			if(btn == 'yes'){
            				Ext.each(selections,function(record,index){ 
            					if(record.get('isTradeFinish')=='1'){
                        			Ext.Msg.alert('提示','该交易已经完成，不可重复操作!'); return;
                        		}
            					Ext.Ajax.request({
                        		    url: 'tradeRecordfinish.action',
                        		    params: {
                        		        id: record.get('id')
                        		    },
                        		    success: function(response){
                        		        var text = Ext.decode(response.responseText);
                        		        if(text.success){
                        		        	tradeRecordStore.load();
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
				xtype:'combobox',
	        	fieldLabel:'平台类型',
	        	labelAlign:'right',
	        	labelWidth:60,
	        	width:200,
	        	editable:true,
	        	itemId:'platfromType',
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
				xtype:'combobox',
	        	fieldLabel:'交易状态',
	        	labelAlign:'right',
	        	labelWidth:60,
	        	width:200,
	        	editable:false,
	        	itemId:'isTradeFinish',
	        	store:{
	        		xtype:'store',
	        		fields:['typename','typevalue'],
	        		data:[{'typename':'交易中','typevalue':'0'},
	        		      {'typename':'已完成','typevalue':'1'},
	        		      {'typename':'全部','typevalue':''}]
	        	},
	        	displayField:'typename',
	        	valueField:'typevalue',
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
						   var platfromType = this.up('toolbar').down('#platfromType').getValue();
						   var isTradeFinish = this.up('toolbar').down('#isTradeFinish').getValue();
						   this.up('grid').getStore().load({
							   params:{
								   platformName:platformName,
								   platfromType:platfromType,
								   isTradeFinish:isTradeFinish
							   }           			   
						   }); 
					   }
				   }
			}
        ]
    },
    {
    	xtype: 'pagingtoolbar',
        store: tradeRecordStore,
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
        	header: '交易时间', 
        	dataIndex: 'tradeDate',
        	align:'center',
        	summaryRenderer: function(value, summaryData, dataIndex) {
                return '合计';
            }
        },
        { 
        	header: '交易状态', 
        	dataIndex: 'isTradeFinish',
        	align:'center',
        	renderer:function(value){
        		if(value=='0'){
        			return '<span class="blue">交易中</span>';
        		}else{
        			return '<span class="green">已完成</span>';
        		}
        	}
        },
        { 
        	header: '平台名称', 
        	dataIndex: 'platformName',
        	align:'left'
        },
        { 
        	header: '平台类型', 
        	dataIndex: 'platfromType',
        	align:'left'
        },
        { 
        	header: '投资本金', 
        	xtype:'numbercolumn',
        	dataIndex: 'amount',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'blue',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
            }
        },
        { 
        	header: '总收益', 
        	xtype:'numbercolumn',
        	dataIndex: 'gainsAll',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'red',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
            }
        },
        { 
        	header: '投资收益', 
        	xtype:'numbercolumn',
        	dataIndex: 'gains',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'green',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
            }
        },
        { 
        	header: '返利红包', 
        	xtype:'numbercolumn',
        	dataIndex: 'redPackets',
        	format:'0,000.00',
        	align:'right',
        	tdCls:'purple',
        	summaryType: 'sum',
        	summaryRenderer: function(value, summaryData, dataIndex) {
        		return Ext.util.Format.number(value, '0,000.00');
            }
        }, 
        { 
        	header: '投放时长', 
        	dataIndex: 'tradeDuration',
        	align:'left'
        },        
        { 
//        	xtype:'datecolumn',
//        	format:'Y-m-d',
        	header: '到期时间', 
        	dataIndex: 'tradeEndDate',
        	align:'center',
        	renderer:function(value,td,record){
        		if(value!=null){
        			var endDate = new Date(value.replace('T',' '));
        			var isTradeFinish = record.get('isTradeFinish');
        			if(isTradeFinish=='0'){
        				var today = new Date();
        				if(today>=endDate){
        					return '<span class="red">'+Ext.Date.format(endDate, 'Y-m-d')+'</span>';
        				}else{
        					return '<span class="blue">'+Ext.Date.format(endDate, 'Y-m-d')+'</span>';
        				}
        			}else{
        				return Ext.Date.format(endDate, 'Y-m-d');
        			}
        		}else{
        			return '';
        		}
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

var tradeRecordWin = Ext.create('Ext.window.Window', {
    title: '交易记录',
//    height: 200,
    width: 480,
    closeAction:'hide',
    layout:'fit',
    resizable :false,
    items: [
        {
        	xtype:'form',
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
    	    	   xtype:'combobox',
    	    	   fieldLabel:'平台名称',
    	    	   labelAlign:'right',
    	    	   width:425,
    	    	   colspan:2,
    	    	   allowBlank:false,
    	    	   name:'tradeRecord.platformID',
    	    	   itemId:'platformID',
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
    	    				   var type = record.get('type');
    	    				   this.up('form').down('#platformName').setValue(platformName);
    	    				   this.up('form').down('#platfromType').setValue(type);
    	    			   }
    	    		   }
    	    	   }
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'平台类型',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   itemId: 'platfromType',
    	    	   name:'tradeRecord.platfromType'
    	       },
    	       {
    	    	   xtype:'datefield',
    	    	   fieldLabel:'交易时间',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   allowBlank:false,
    	    	   format:'Y-m-d',
    	    	   name:'tradeRecord.tradeDate'
    	       },
    	       {
    	    	   xtype:'datefield',
    	    	   fieldLabel:'到期时间',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   format:'Y-m-d',
    	    	   name:'tradeRecord.tradeEndDate'
    	       },
    	       {
    	    	   xtype:'textfield',
    	    	   fieldLabel:'投放时长',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'tradeRecord.tradeDuration'
    	       },
    	       {
    	    	   xtype:'numberfield',
    	    	   fieldLabel:'投资金额',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'tradeRecord.amount',
    	    	   itemId:'amount',
    	    	   minValue:0,
    	    	   decimalPrecision:2
    	       },
    	       {
    	    	   xtype:'numberfield',
    	    	   fieldLabel:'投资收益',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'tradeRecord.gains',
    	    	   itemId:'gains',
    	    	   minValue:0,
    	    	   decimalPrecision:2,
    	    	   listeners:{
    	    		   change:function(combo,newvalue,oldvalue){
    	    			   var gains = this.up().down('#gains').getValue();
    	    			   var redPackets = this.up().down('#redPackets').getValue();
    	    			   var gainsAll = 0;
    	    			   if(gains!=null&&gains!=''){
    	    				   gainsAll += gains;
    	    			   }
    	    			   if(redPackets!=null&&redPackets!=''){
    	    				   gainsAll += redPackets;
    	    			   }
    	    			   this.up().down('#gainsAll').setValue(gainsAll);
    	    		   }
    	    	   }
    	       },
    	       {
    	    	   xtype:'numberfield',
    	    	   fieldLabel:'返利红包',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'tradeRecord.redPackets',
    	    	   itemId:'redPackets',
    	    	   minValue:0,
    	    	   decimalPrecision:2,
    	    	   listeners:{
    	    		   change:function(combo,newvalue,oldvalue){
    	    			   var gains = this.up().down('#gains').getValue();
    	    			   var redPackets = this.up().down('#redPackets').getValue();
    	    			   var gainsAll = 0;
    	    			   if(gains!=null&&gains!=''){
    	    				   gainsAll += gains;
    	    			   }
    	    			   if(redPackets!=null&&redPackets!=''){
    	    				   gainsAll += redPackets;
    	    			   }
    	    			   this.up().down('#gainsAll').setValue(gainsAll);
    	    		   }
    	    	   }
    	       },
    	       {
    	    	   xtype:'numberfield',
    	    	   fieldLabel:'总收益',
    	    	   labelAlign:'right',
    	    	   width:200,
    	    	   name:'tradeRecord.gainsAll',
    	    	   itemId:'gainsAll',
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
    	    	   name:'tradeRecord.remark'
    	       },
    	       {
    	    	   xtype:'button',
    	    	   margin:'20 10 10 360',
    	    	   colspan:2,
    	    	   text:'&nbsp;&nbsp;&nbsp;保&nbsp;&nbsp;&nbsp;存&nbsp;&nbsp;&nbsp;',
    	    	   handler:function(btn){
    	    		   var URL = '';
    	    		   if(this.up('window').isNew){
    	    			   URL = 'tradeRecordadd.action';
    	    		   }else{
    	    			   URL = 'tradeRecordupdate.action';
    	    		   }
    	    		   var form = this.up('form').getForm();
    	    		   
    	    		   var amountField = form.findField('tradeRecord.amount');
    	    		   if(amountField.getValue()==null||amountField.getValue==''){
    	    			   amountField.setValue(0);
    	    		   }
    	    		   
    	    		   if(form.isValid()){
    	    			   form.submit({
    	    				    url: URL,
    	    				    success: function(form, action) {
//    	    				       Ext.Msg.alert('提示', action.result.msg);
    	    				       btn.up('window').hide();
    	    				       tradeRecordStore.load();
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
        		   name:'tradeRecord.id'
        	   },
        	   {
        		   xtype:'hidden',
        		   name:'tradeRecord.sysUserID',
        		   itemId:'sysUserID'
        	   },
        	   {
        		   xtype:'hidden',
        		   name:'tradeRecord.isTradeFinish'
        	   },
        	   {
        		   xtype:'hidden',
        		   name:'tradeRecord.platformName',
        		   itemId:'platformName'
        	   }
        	]
        }     
    ]
});
