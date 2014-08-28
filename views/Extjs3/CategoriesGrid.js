GO.cticket.CategoriesGrid = function(config) {
    if (!config) {
        config = {};
    }

	GO.cticket.CategoriesGrid.superclass.constructor.call(this, config);
}

Ext.extend(GO.cticket.CategoriesGrid, GO.grid.MultiSelectGrid , {
	initComponent : function(){
		GO.cticket.CategoriesGrid.superclass.initComponent.call(this);	
    },
    getColumns : function() {
		var columns = GO.cticket.CategoriesGrid.superclass.getColumns.call(this);	
        columns.push({
			header: '#',
			dataIndex: 'count',
            align: 'right',
			id:'count'
        });
        return columns;
    }
});
