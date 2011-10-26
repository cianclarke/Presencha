Ext.define('Presencha.view.Viewport', {
    extend: 'Ext.Panel',
    
    config: {
        fullscreen: true,
        layout: 'card',
        items: [
            { xtype: 'presoform'},
            {
                xtype: 'slideshow',
                html: ' ..'
            }
        ]
    }
});