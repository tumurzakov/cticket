GO.cticket.writableCategoriesStore = new GO.data.JsonStore({
	url: GO.url('cticket/category/store'),
	baseParams: {
		permissionLevel:GO.permissionLevels.write
	},	
	fields: ['id', 'name', 'user_name']	
});

GO.cticket.writableAdminCategoriesStore = new GO.data.JsonStore({
	url: GO.url('cticket/category/store'),
	baseParams: {
		permissionLevel:GO.permissionLevels.write
	},	
	fields: ['id', 'name', 'user_name']
});


GO.cticket.readableCategoriesStore = new GO.data.JsonStore({
	url: GO.url('cticket/category/store'),
	baseParams: {
		limit:GO.settings.config.nav_page_size
	},
	fields: ['id','user_name','acl_id','name','checked']
});

GO.cticket.writableStatusesStore = new GO.data.JsonStore({
	url: GO.url('cticket/status/store'),
	fields: ['id', 'name']	
});

GO.cticket.writableAdminStatusesStore = new GO.data.JsonStore({
	url: GO.url('cticket/status/store'),
	fields: ['id', 'name']
});


GO.cticket.readableStatusesStore = new GO.data.JsonStore({
	url: GO.url('cticket/status/store'),
	baseParams: {
		limit:GO.settings.config.nav_page_size
	},
	fields: ['id','name','checked']
});
