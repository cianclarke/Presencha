Ext.define('Presencha.view.Viewport', {
    extend: 'Ext.Container',
    config: {
        fullscreen: true,
        layout: 'fit',
        items: [
            {
                xtype: 'slideshow'
                
            }
        ]
    }
});