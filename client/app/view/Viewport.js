Ext.define('Presencha.view.Viewport', {
    extend: 'Ext.Panel',
    
    config: {
        fullscreen: true,
        items: [
            {
                xtype: 'slideshow',
                html: ' ..'
            }
        ]
    }
});