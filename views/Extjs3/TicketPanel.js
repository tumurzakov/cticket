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
						'<td>#:</td>'+
						'<td>{id}</td>'+
					'</tr>'+
					'<tr>'+
						'<td>'+GO.cticket.lang.category+':</td>'+
						'<td>{category}</td>'+
					'</tr>'+
					'<tr>'+
						'<td>'+GO.cticket.lang.status+':</td>'+
						'<td>{status}</td>'+
					'</tr>'+
					'<tr>'+
						'<td colspan="2" class="display-panel-heading">{content}</td>'+
					'</tr>'+
					'<tr>'+
						'<td colspan="2">'+
                            '<table>' +
                                '<tpl for="statuses">'+
                                    '<tr>' + 
                                        '<td>{status}</td>' + 
                                        '<td>{created}</td>' + 
                                        '<td>'+
								            '<tpl if="!GO.util.empty(email_uid)">'+
                                                '<a href="#" onClick=\'GO.cticket.openStatusEmail({[JSON.stringify(values)]}, "{[this.getPanel()]}")\'>Draft</a>'+
                                            '</tpl>' +
                                        '</td>' + 
                                        '<td>'+
								            '<tpl if="sent">'+
                                                'Sent'+
                                            '</tpl>' +
                                        '</td>' + 
                                    '</tr>' + 
                                '</tpl>'+
                            '</table>'
                        '</td>'+
					'</tr>'+
				'</table>';																		

        var scope = this;
		Ext.apply(this.templateConfig, {
            getPanel: function() {
                if (!GO.cticket.tmp_panel) {
                    GO.cticket.tmp_panel = {};
                }
                var key = Math.random().toString(36).substring(7);
                GO.cticket.tmp_panel[key] = scope;
                return key;
            }
        });
    
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

GO.cticket.openStatusEmail = function(status, key) {
    var panel = GO.cticket.tmp_panel[key];
    var composer = GO.email.showComposer({
        uid: status.email_uid,
        task: 'opendraft',
        template_id: 0,
        mailbox: status.email_mailbox,
        account_id: status.email_account_id 
    });

    composer.on('save', function() {
        panel.reload();
    });

    composer.on('send', function() {
        panel.reload();
    });
}
