
var dataPanel = Ext.create('Ext.panel.Panel',{
		layout:'hbox',
		width:1000,
		height:500,
		border:false,
		defaults:{
			margin:'50 50 50 50'
		},
		items:[
		       {
		    	   xtype:'button',
		    	   width:100,
		    	   height:60,
		    	   text:'<font style="font-size:25px;">备份</font>',
		    	   handler:function(){
		    		   window.location.href='databeifen.action';
		    	   }
		       },
		       {
		    	   xtype:'button',
		    	   width:100,
		    	   height:60,
		    	   text:'<font style="font-size:25px;">还原</font>',
		    	   handler:function(){
//		    		   window.location.href='datahuanyuan.action';
		    		   var win = Ext.create('Ext.window.Window',{
		    			    title: '选择文件',
		    			    height: 150,
		    			    width: 300,
		    			    closeAction:'hide',
		    			    layout:'fit',
		    			    resizable :false,
		    			    items: [
		    			          {
		    			        	  xtype:'form',
		    			        	  items: [{
		    			        	        xtype: 'filefield',
		    			        	        name: 'file',
		    			        	        fieldLabel: '文件',
		    			        	        labelWidth: 40,
		    			        	        msgTarget: 'side',
		    			        	        allowBlank: false,
		    			        	        anchor: '100%',
		    			        	        labelAlign:'right',
		    			        	        margin:'20 10 20 10',
		    			        	        blankText :'请选择数据库文件',
		    			        	        buttonText: '选择'
		    			        	    }],
		    			        	    buttons: [{
		    			        	        text: '确定',
		    			        	        handler: function(btn) {
		    			        	            var form = this.up('form').getForm();
		    			        	            if(form.isValid()){
		    			        	                form.submit({
		    			        	                    url: 'datahuanyuan.action',
//		    			        	                    waitMsg: '还原中,请等待!',
		    			        	                    success: function(form, action) {
		    			     	    				       Ext.Msg.alert('提示', '数据还原成功！');
		    			     	    				    },
		    			     	    				    failure: function(form, action) {
		    			     	    				    	Ext.Msg.alert('提示', action.result.msg);
		    			     	    				    }
		    			        	                });
		    			        	            }
		    			        	            btn.up('window').hide();
		    			        	        }
		    			        	    }]
		    			          }  
		    			    ]
		    		   }).show();
		    	   }
		       }
		]

});