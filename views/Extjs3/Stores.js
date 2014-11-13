GO.cticket.writableStatusesStore = new GO.data.JsonStore({
	url: GO.url('cticket/status/store'),
	fields: ['id', 'name']
});

GO.cticket.writableAdminStatusesStore = new GO.data.JsonStore({
	url: GO.url('cticket/status/store'),
	fields: ['id', 'name', 'template', 'position']
});

GO.cticket.readableStatusesStore = new GO.data.JsonStore({
	url: GO.url('cticket/status/store'),
	baseParams: {
        store: 'readableStatusesStore',
		limit:GO.settings.config.nav_page_size
	},
	fields: ['id','name','checked', 'count']
});

GO.cticket.writableTemplatesStore = new GO.data.JsonStore({
	url: GO.url('addressbook/template/store'),
	fields: ['id', 'name']	
});

