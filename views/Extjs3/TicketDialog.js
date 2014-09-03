/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: TicketDialog.js 14816 2013-05-21 08:31:20Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 * @author WilmarVB <wilmar@intermesh.nl>
 */
 
GO.cticket.TicketDialog = Ext.extend(GO.dialog.TabbedFormDialog , {
	
	customFieldType : "GO_Cticket_Model_Ticket",
	
	initComponent : function(){
		
		Ext.apply(this, {
			titleField:'name',
			goDialogId:'ticket',
			title:GO.cticket.lang.ticket,
			height: 560,
			formControllerUrl: 'cticket/ticket'
		});
		
		GO.cticket.TicketDialog.superclass.initComponent.call(this);	
	},
	
	buildForm : function () {
		
		this.selectLinkField = new GO.form.SelectLink({
			anchor:'100%'
		});

		this.propertiesPanel = new Ext.Panel({
			title:GO.lang['strProperties'],
			cls:'go-form-panel',
			layout:'form',
			labelWidth:160,
			items:[{
				xtype: 'textfield',
				name: 'name',
				width:300,
				anchor: '100%',
				maxLength: 100,
				allowBlank:false,
				fieldLabel: GO.lang.strName
			},this.selectCategory = new GO.form.ComboBox({
				fieldLabel: GO.cticket.lang.category_id,
				hiddenName:'category_id',
				anchor:'100%',
				emptyText:GO.lang.strPleaseSelect,
				store: GO.cticket.writableCategoriesStore,
				pageSize: parseInt(GO.settings.max_rows_list),
				valueField:'id',
				displayField:'name',
				mode: 'remote',
				triggerAction: 'all',
				editable: true,
				selectOnFocus:true,
				forceSelection: true,
				allowBlank: false
			}),this.selectStatus = new GO.form.ComboBox({
				fieldLabel: GO.cticket.lang.status_id,
				hiddenName:'status_id',
				anchor:'100%',
				emptyText:GO.lang.strPleaseSelect,
				store: GO.cticket.writableStatusesStore,
				pageSize: parseInt(GO.settings.max_rows_list),
				valueField:'id',
				displayField:'name',
				mode: 'remote',
				triggerAction: 'all',
				editable: true,
				selectOnFocus:true,
				forceSelection: true,
				allowBlank: false
			}), {
				xtype: 'checkbox',
				name: 'send_email',
                inputValue: '1',
				anchor: '100%',
				maxLength: 100,
				allowBlank:false,
				fieldLabel: GO.cticket.lang.sendEmail
            }, this.selectLinkField,
            this.selectUser = new GO.form.SelectUser({
                fieldLabel : GO.cticket.lang.manager,
                anchor : '100%'
            }),
			this.contentField = new Ext.form.TextArea({
				name: 'content',
				anchor: '100%',
				height: 280,
				hideLabel:true
			})]				
		});

        this.selectCategory.on('select', function() {
            this.loadStatuses();
        }, this);

        this.selectStatus.store.on('load', function(store, records) {
            if (records.length > 0) {
                this.selectStatus.setValue(records[0].id);
            }
        }, this);

		this.addPanel(this.propertiesPanel);
	},

    loadStatuses: function(category_id) {
        this.selectStatus.setRawValue("");
        this.selectStatus.store.baseParams.category_id = this.selectCategory.getValue();
        this.selectStatus.store.load();
    }
	
});
