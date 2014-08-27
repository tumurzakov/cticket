/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: TicketPanel.js 14816 2013-05-21 08:31:20Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 */
 
GO.cticket.TicketPanel = Ext.extend(GO.DisplayPanel,{
	model_name : "GO_Cticket_Model_Ticket",
	
	stateId : 'no-ticket-panel',

	//deprecated. tabbedformdialog refreshes active displaypanel automatically.
	editGoDialogId : 'ticket',
	
	editHandler : function(){
		GO.cticket.showTicketDialog(this.model_id);		
	},	
		
	initComponent : function(){	
		
		this.loadUrl=('cticket/ticket/display');
		
		this.encryptId=Ext.id();
		
		this.template = 

				'<table class="display-panel" cellpadding="0" cellspacing="0" border="0">'+
					'<tr>'+
						'<td colspan="2" class="display-panel-heading">'+GO.cticket.lang.ticket+': {name}</td>'+
					'</tr>'+
					'<tr>'+
						'<td>ID:</td>'+
						'<td>{id}</td>'+
					'</tr>'+
					'<tr>'+
						'<td>Content:</td>'+
						'<td>{content}</td>'+
					'</tr>'+
				'</table>';																		
				
		if(GO.customfields)
		{
			this.template +=GO.customfields.displayPanelTemplate;
		}

		if(GO.tasks)
			this.template +=GO.tasks.TaskTemplate;

		if(GO.calendar)
			this.template += GO.calendar.EventTemplate;
		
		if(GO.workflow)
			this.template +=GO.workflow.WorkflowTemplate;

		this.template += GO.linksTemplate;	
				
		if(GO.files)
		{
			Ext.apply(this.templateConfig, GO.files.filesTemplateConfig);
			this.template += GO.files.filesTemplate;
		}
		Ext.apply(this.templateConfig, GO.linksTemplateConfig);
		
		if(GO.comments)
		{
			this.template += GO.comments.displayPanelTemplate;
		}		

		this.template += GO.createModifyTemplate;

		GO.cticket.TicketPanel.superclass.initComponent.call(this);
	}
	
});			
