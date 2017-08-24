
window.onresize=function(){
	var height = document.body.clientHeight;
	Ext.getCmp('consoleCon').setHeight(height-10);
};

Ext.onReady(function() {
	new Ext.Viewport({
		layout : "fit",
		items : [ {
//			title : "账本管理",
//			layout:'fit',
			items : [
			    {
			    	xtype:'container',
			    	layout:'fit',
			    	width:'100%',
			    	height:500,
//			    	layout: 'card',  
//		            activeItem: 0,
//		            layoutConfig: {  
//		                animate: true   
//		            },  
			    	id:'consoleCon',
			    	listeners:{
			    		render:function(){
			    			var height = document.body.clientHeight;
			    			this.setHeight(height-5);
			    		}
			    	},
			    	items:[
			    	    {
			    	    	xtype:'tabpanel',
			    	    	width:'100%',
			    	    	height:'100%',
			    	    	cls:'ui-tab-bar',
			    	    	defaults:{
			    	    		layout:'fit'
			    	    	},
			    	    	items:[
								{
									 title:'平台',
									 items:[
									     platformGrid
									 ]
								},  
								{
									 title:'交易记录',
									 items:[
									     tradeRecordGrid
									 ]
								},
								{
									 title:'转账管理',
									 items:[
									     transferAccountGrid
									 ]
								},
								{
									 title:'出入账查询',
									 items:[
									     transferGrid
									 ]
								},
								{
									 title:'系统帐号',
									 hidden:currentSysUser.role=='admin'?false:true,
									 items:[
									     sysUserGrid
									 ]
								},
								{
									 title:'管理数据',
									 hidden:currentSysUser.role=='admin'?false:true,
									 items:[
									     dataPanel
									 ]
								},
								{
									 title:'退出系统',
									 itemId:'exit',
									 items:[
									     
									 ]
								}
			    	    	],
			    	    	listeners:{
			    	    		tabchange : function( tabPanel, newCard, oldCard, eOpts){
//			    	    			if(newCard.down('grid')!=null){
//			    	    				newCard.down('grid').getStore().load();
//			    	    			}		
			    	    			if(newCard.itemId == 'exit'){
			    	    				window.location.href="sysUserlogout.action";			    	    				
			    	    			}
			    	    		}
			    	    	}
			    	    }   
			    	]
			    }
			]
		} ]
	});
});