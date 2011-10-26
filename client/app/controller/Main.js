Ext.define('Presencha.controller.Main', {
    extend: 'Ext.app.Controller',
    
    views: ['Slideshow'],
    models: ['Slide', 'Slideshow'],
    stores: ['Slideshow'],
    refs: [
        {
            ref: 'Slideshow',
            selector: 'slideShow'
        }
    ],
    
    launch: function() {
      // TODO: Use routing to determine the API call we need to make
      // Set the proxy url of our slideshow store to this
        
        this.control({
          'slideshow' : {
          }
        });
        debugger;
        var slidestore = this.getSlideshowStore();
        slidestore.on({
          'load': this.addSlides
        });
        
        
    },
    addSlides: function(data){
      debugger;
      //this.getSlideshow().add
    }

});

