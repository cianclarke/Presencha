Ext.define('Presencha.view.Viewport', {
    extend: 'Ext.Container',
    config: {
        fullscreen: true,
        layout: 'card',
        items: [
            { xtype: 'presoform' },
            { xtype: 'slideshow' }
        ]
    }
});
