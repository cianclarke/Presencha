Presencha.views.PresoForm = Ext.extend(Ext.Panel, {
  html: 'Upload yer PDF here.',
  
  initComponent: function() {
    Presencha.views.PresoForm.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('Presencha.views.PresoForm', Presencha.views.PresoForm)