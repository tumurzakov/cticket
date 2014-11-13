/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: ManageStatusesGrid.js 14816 2013-05-21 08:31:20Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 */
 

GO.cticket.ManageStatusesGrid = Ext.extend(GO.grid.GridPanel,{
	changed : false,
	
	initComponent : function(){
		
		Ext.apply(this,{
			standardTbar:true,
			standardTbarDisabled:!GO.settings.modules.cticket.write_permission,
			store: GO.cticket.writableAdminStatusesStore,
			border: false,
			paging:true,
			view:new Ext.grid.GridView({
				autoFill: true,
				forceFit: true,
				emptyText: GO.lang['strNoItems']		
			}),
			cm:new Ext.grid.ColumnModel({
				defaults:{
					sortable:true
				},
				columns:[
				{
					header: GO.lang.strName, 
					dataIndex: 'name'
				},{
					header: GO.cticket.lang.position, 
					dataIndex: 'position'
				},{
					header: GO.cticket.lang.template,
					dataIndex: 'template',
					sortable: false
				}		
				]
			})
		});
		
		GO.cticket.ManageStatusesGrid.superclass.initComponent.call(this);
		
		GO.cticket.writableAdminStatusesStore.load();	
	},
	
	dblClick : function(grid, record, rowIndex){
		this.showStatusDialog(record.id);
	},
	
	btnAdd : function(){				
		this.showStatusDialog();	  	
	},
	showStatusDialog : function(id){
		if(!this.statusDialog){
			this.statusDialog = new GO.cticket.StatusDialog();

			this.statusDialog.on('save', function(){   
				this.store.load();
				this.changed=true;	    			    			
			}, this);	
		}
		this.statusDialog.show(id);	  
	},
	deleteSelected : function(){
		GO.cticket.ManageStatusesGrid.superclass.deleteSelected.call(this);
		this.changed=true;
	}
});
