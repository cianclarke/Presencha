Ext.define('Presencha.view.Slideshow', {
    extend: 'Ext.Carousel',
    id: 'slideShow',
    xtype: 'slideshow',
    config: {
      items: [{html: 'defaultItemHack'}]
    }
});