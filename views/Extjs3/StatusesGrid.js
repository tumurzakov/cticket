GO.cticket.StatusesGrid = function(config) {
    if (!config) {
        config = {};
    }

	GO.cticket.StatusesGrid.superclass.constructor.call(this, config);
}

Ext.extend(GO.cticket.StatusesGrid, GO.grid.MultiSelectGrid , {
	initComponent : function(){
		GO.cticket.StatusesGrid.superclass.initComponent.call(this);	
    },
    getColumns : function() {
		var columns = GO.cticket.StatusesGrid.superclass.getColumns.call(this);	
        columns.push({
			header: '#',
			dataIndex: 'count',
            align: 'right',
			id:'count'
        });
        return columns;
    }
});
