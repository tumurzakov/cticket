/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: MainPanel.js 14816 2013-05-21 08:31:20Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 */

 
GO.cticket.MainPanel = function(config){
	
	if(!config)
	{
		config = {};
	}

	this.centerPanel = new GO.cticket.CticketGrid({
		region:'center',
		id:'no-center-panel',
		border:true
	});
	
    this.categoriesPanel = new GO.grid.MultiSelectGrid({
        region: 'north',
        height: 200,
		id:'ct-multiselect-categories',
		title:GO.cticket.lang.categories,
		loadMask:true,
		store: GO.cticket.readableCategoriesStore,
		width: 210,
		split:true,
		allowNoSelection:true,
		collapsible:true,
		collapseMode:'mini',
		bbar: new GO.SmallPagingToolbar({
			items:[this.searchField = new GO.form.SearchField({
				store: GO.cticket.readableCategoriesStore,
				width:120,
				emptyText: GO.lang.strSearch
			})],
			store:GO.cticket.readableCategoriesStore,
			pageSize:GO.settings.config.nav_page_size
		}),
		relatedStore: this.centerPanel.store
	});

    this.statusesPanel = new GO.grid.MultiSelectGrid({
        region: 'center',
		id:'ct-multiselect-statuses',
		title:GO.cticket.lang.statuses,
		loadMask:true,
		store: GO.cticket.readableStatusesStore,
		split:true,
		allowNoSelection:true,
		collapsible:true,
		collapseMode:'mini',
		bbar: new GO.SmallPagingToolbar({
			items:[this.searchField = new GO.form.SearchField({
				store: GO.cticket.readableStatusesStore,
				width:120,
				emptyText: GO.lang.strSearch
			})],
			store:GO.cticket.readableStatusesStore,
			pageSize:GO.settings.config.nav_page_size
		}),
		relatedStore: this.centerPanel.store
	});

    this.westPanel = new Ext.Panel({
        width: 210,
        region: 'west',
        layout: 'fit',
        items: [{
            layout: 'border',
            items: [this.categoriesPanel, this.statusesPanel]
        }]
    });

	this.centerPanel.on("delayedrowselect",function(grid, rowIndex, r){
		this.eastPanel.load(r.data.id);		
	}, this);

	this.centerPanel.on('rowdblclick', function(grid, rowIndex){
		this.eastPanel.editHandler();
	}, this);
	
	this.eastPanel = new GO.cticket.TicketPanel({
		region:'east',
		id:'no-east-panel',
		width:440,
		collapsible:true,
		collapseMode:'mini',
		border:true
	});
	
	config.tbar=new Ext.Toolbar({
		cls:'go-head-tb',
		items: [{
			grid: this.centerPanel,
			xtype:'addbutton',
			handler: function(b){
				this.eastPanel.reset();

				GO.cticket.showTicketDialog(0, {
						loadParams:{
							category_id: b.buttonParams.id						
						}
				});
			},
			scope: this
		},{
			xtype:'deletebutton',
			grid:this.centerPanel,
			handler: function(){
				this.centerPanel.deleteSelected({
					callback : this.eastPanel.gridDeleteCallback,
					scope: this.eastPanel
				});
			},
			scope: this
		},{
			iconCls: 'no-btn-categories',
			text: GO.cticket.lang.manageCategories,
			cls: 'x-btn-text-icon',
			handler: function(){
				if(!this.categoriesDialog)
				{
					this.categoriesDialog = new GO.cticket.ManageCategoriesDialog();
					this.categoriesDialog.on('change', function(){
						this.categoriesPanel.store.reload();
						GO.cticket.writableCategoriesStore.reload();
					}, this);
				}
				this.categoriesDialog.show();
			},
			scope: this
		},{
			iconCls: 'no-btn-statuses',
			text: GO.cticket.lang.manageStatuses,
			cls: 'x-btn-text-icon',
			handler: function(){
				if(!this.statusesDialog)
				{
					this.statusesDialog = new GO.cticket.ManageStatusesDialog();
					this.statusesDialog.on('change', function(){
						this.statusesPanel.store.reload();
						GO.cticket.writableStatusesStore.reload();
					}, this);
				}
				this.statusesDialog.show();
			},
			scope: this
				
		}
		]
		});

	config.items=[
	this.westPanel,
	this.centerPanel,
	this.eastPanel
	];	
	
	config.layout='border';
	GO.cticket.MainPanel.superclass.constructor.call(this, config);	
};


Ext.extend(GO.cticket.MainPanel, Ext.Panel, {
	afterRender : function()
	{
		GO.dialogListeners.add('ticket',{
			scope:this,
			save:function(){
				this.centerPanel.store.reload();
			}
		});

		GO.cticket.readableCategoriesStore.load();
		GO.cticket.readableStatusesStore.load();
		
		GO.cticket.MainPanel.superclass.afterRender.call(this);
	}
});

GO.cticket.showTicketDialog = function(ticket_id, config){

	if(!GO.cticket.ticketDialog)
		GO.cticket.ticketDialog = new GO.cticket.TicketDialog();
	
	GO.cticket.ticketDialog.show(ticket_id, config);
}


/*
 * This will add the module to the main tabpanel filled with all the modules
 */
 
GO.moduleManager.addModule('cticket', GO.cticket.MainPanel, {
	title : GO.cticket.lang.tickets,
	iconCls : 'go-tab-icon-cticket'
});
/*
 * If your module has a linkable item, you should add a link handler like this. 
 * The index (no. 1 in this case) should be a unique identifier of your item.
 * See classes/base/links.class.inc for an overview.
 * 
 * Basically this function opens a project window when a user clicks on it from a 
 * panel with links. 
 */

GO.linkHandlers["GO_Cticket_Model_Ticket"]=function(id){
	if(!GO.cticket.linkWindow){
		var ticketPanel = new GO.cticket.TicketPanel();
		GO.cticket.linkWindow= new GO.LinkViewWindow({
			title: GO.cticket.lang.ticket,
			items: ticketPanel,
			ticketPanel: ticketPanel,
			closeAction:"hide"
		});
	}
	GO.cticket.linkWindow.ticketPanel.load(id);
	GO.cticket.linkWindow.show();
	return GO.cticket.linkWindow;
}

GO.linkPreviewPanels["GO_Cticket_Model_Ticket"]=function(config){
	config = config || {};
	return new GO.cticket.TicketPanel(config);
}


/* {LINKHANDLERS} */


GO.newMenuItems.push({
	text: GO.cticket.lang.ticket,
	iconCls: 'go-model-icon-GO_Cticket_Model_Ticket',
	handler:function(item, e){		
		GO.cticket.showTicketDialog(0, {
			link_config: item.parentMenu.link_config			
		});
	}
});
/* {NEWMENUITEMS} */


