Ext.define('Presencha.view.Slideshow', {
    extend: 'Ext.Carousel', // TODO: Carousel?
    id: 'slideShow',
    xtype: 'slideshow',
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