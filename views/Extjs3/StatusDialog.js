/** 
 * Copyright Intermesh
 * 
 * This file is part of Group-Office. You should have received a copy of the
 * Group-Office license along with Group-Office. See the file /LICENSE.TXT
 * 
 * If you have questions write an e-mail to info@intermesh.nl
 * 
 * @version $Id: StatusDialog.js 14816 2013-05-21 08:31:20Z mschering $
 * @copyright Copyright Intermesh
 * @author Merijn Schering <mschering@intermesh.nl>
 */
 
GO.cticket.StatusDialog = Ext.extend(GO.dialog.TabbedFormDialog , {
	initComponent : function(){
		
		Ext.apply(this, {
			titleField:'name',
			title:GO.cticket.lang.status,
			formControllerUrl: 'cticket/status',
			height:440
		});
		
		GO.cticket.StatusDialog.superclass.initComponent.call(this);	
	},
	buildForm : function () {

		this.propertiesPanel = new Ext.Panel({
			url: GO.settings.modules.cticket.url+'action.php',
			border: false,
			baseParams: {task: 'status'},			
			title:GO.lang['strProperties'],			
			cls:'go-form-panel',waitMsgTarget:true,			
			layout:'form',
			autoScroll:true,
			items:[{
				xtype: 'textfield',
				name: 'name',
				anchor: '100%',
				allowBlank:false,
				fieldLabel: GO.lang.strName
			}, this.selectTemplate = new GO.form.ComboBox({
				fieldLabel: GO.cticket.lang.template,
				hiddenName:'template_id',
				anchor:'100%',
				emptyText:GO.lang.strPleaseSelect,
				store: GO.cticket.writableTemplatesStore,
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
				xtype: 'numberfield',
				name: 'position',
				anchor: '100%',
				fieldLabel: GO.cticket.lang.position
			}
			]
				
		});

		this.addPanel(this.propertiesPanel);	
	}
});
