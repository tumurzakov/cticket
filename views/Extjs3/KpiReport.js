GO.cticket.KpiReport = Ext.extend(Ext.Window , {
    width: 800,
    height: 600,
    layout: 'fit',
    title: GO.cticket.lang.kpi,

    tpl: new Ext.XTemplate(
        '<table class="ct-kpi">' +
            '<tpl for="users">' +
                '<tr class="ct-kpi-user"><td colspan="2">{name}</td></tr>' +
                '<tpl for="statuses">' +
                    '<tr class="ct-kpi-status">' +
                        '<td>{status}</td>'+
                        '<td>{count}</td>'+
                    '</tr>' +
                '</tpl>' +
            '</tpl>' +
        '</table>'
    ),

	initComponent : function(){

        this.userField = new GO.form.SelectUser({
            id: 'ct-kpi-user',
            fieldLabel: GO.cticket.lang.manager,
        });

        this.categoryField = new GO.cticket.SelectCategory({
            id: 'ct-kpi-category'
        });

        this.report = new Ext.Panel({
            border: false,
            height: 200,
            cls: 'ct-kpi-report',
            html: ''
        });

        this.items = [{
            layout: 'form',
            id: 'ct-kpi-form',
            bodyStyle: 'padding: 10px;',
            items: [{
                id: 'ct-kpi-from',
                xtype: 'datefield',
                value: new Date(),
                fieldLabel: GO.cticket.lang.from,
            },{
                id: 'ct-kpi-to',
                xtype: 'datefield',
                value: new Date(),
                fieldLabel: GO.cticket.lang.to,
            }, this.userField, this.categoryField, {
                xtype: 'button',
                text: GO.cticket.lang.report,
                handler: this.reportHandler,
                scope: this
            }, this.report 
            ]
        }]

		GO.cticket.KpiReport.superclass.initComponent.call(this);	
    },

    reportHandler: function() {
        Ext.Ajax.request({
            method: 'POST',
            url: GO.url('cticket/ticket/kpi'),
            params: {
                from: this.findById('ct-kpi-from').getValue(),
                to: this.findById('ct-kpi-to').getValue(),
                category_id: this.findById('ct-kpi-category').getValue(),
                user_id: this.findById('ct-kpi-user').getValue()
            },
            success: function(response) {
                var data = JSON.parse(response.responseText);
                this.tpl.overwrite(this.report.getEl(), data);
            },
            scope: this
        });
    }
});
