/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: ManageStatusDialog.js 14816 2013-05-21 08:31:20Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 */
 
GO.cticket.ManageStatusesDialog = function(config){
	
	
	if(!config)
	{
		config={};
	}
		
	this.statusesGrid = new GO.cticket.ManageStatusesGrid();

	config.maximizable=true;
	config.layout='fit';
	config.modal=false;
	config.resizable=true;
	config.width=600;
	config.height=400;
	config.closeAction='hide';
	config.title= GO.cticket.lang.manageStatuses;					
	config.items= this.statusesGrid;
	config.buttons=[{
			text: GO.lang['cmdClose'],
			handler: function(){				
				this.hide();				
			},
			scope:this
		}					
	];
	
	GO.cticket.ManageStatusesDialog.superclass.constructor.call(this, config);

	this.on('hide', function(){
		if(this.statusesGrid.changed)
		{
			this.fireEvent('change');
			this.statusesGrid.changed=false;
		}
	}, this);
	
	this.addEvents({'change':true});
}

Ext.extend(GO.cticket.ManageStatusesDialog, GO.Window,{

});
