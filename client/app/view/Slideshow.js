Ext.define('Presencha.view.Slideshow', {
    extend: 'Ext.Panel', // TODO: Carousel?
    id: 'slideShow',
    xtype: 'slideshow',
    layout: 'card',
    config: {
        items: [ // TODO: Hardcoded for now
            {
                xtype: 'panel',
                html : 'page1'
            },
            {
                xtype: 'panel',
                html : 'page2'
            },
            {
                xtype: 'panel',
                html : 'page3'
            }
        ]
    }
});