GO.cticket.SelectCategory = Ext.extend(GO.form.ComboBox, {
    fieldLabel: GO.cticket.lang.category_id,
    hiddenName:'category_id',
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
});
