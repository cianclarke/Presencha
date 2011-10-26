Ext.define('Presencha.view.Slideshow', {
    extend: 'Ext.Carousel',
    id: 'slideShow',
    xtype: 'slideshow',
    config: {
      items: [{html: 'defaultItemHack'}]
    },
    initialize : function() {
    	this.callParent(arguments);
    	this.on('activeitemchange', function(carousel, value, oldValue, opts) {
    		//signal clients to go to the next slide
    		var slideNum = carousel.getItems().indexOf(value);
    		PresenchaMsg.goTo(slideNum);
//    		debugger;
    	});
    }
});


/*
 * 
	PresenchaMsg.startSlideshow(key);
 * 
	PresenchaMsg.joinSlideshow(key, function(from, message) {
       var carousel = c;
       c.setActiveItem(message.slideNumber);
   })
 * 
 */