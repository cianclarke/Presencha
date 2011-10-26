Ext.define('Presencha.controller.Main', {
    extend: 'Ext.app.Controller',
    
    views: ['Slideshow', 'PresoForm'],
    models: ['Slide', 'Slideshow'],
    stores: ['Slideshow'],
    refs: [
        {
            ref: 'SlideShow',
            selector: '#slideShow'
        },
        {
            ref: 'presoForm',
            selector: 'presoform'
        }
    ],
    
    launch: function() {
      // TODO: Use routing to determine the API call we need to make
      // Set the proxy url of our slideshow store to this
        
        this.control({
          'slideshow' : {
              // Handlers here.. select: this.showSlides, 
          },
          'presoform': {
              // Form submission handler goes here
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
