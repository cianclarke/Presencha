Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'Presencha',
    
    controllers: ['Main'],
    
    launch: function() {
        Ext.create('Presencha.view.Viewport');
    }
});