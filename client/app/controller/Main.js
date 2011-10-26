Ext.define('Presencha.controller.Main', {
    extend: 'Ext.app.Controller',
    
    views: ['Slideshow', 'PresoForm'],
    models: ['Slide', 'Slideshow'],
    stores: ['Slideshow'],
    refs: [
        {
            ref: 'slideShow',
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
        
        var slidestore = this.getSlideshowStore();
        slidestore.on({
          'load': this.addSlides,
          scope: this
        });
        
    },
    addSlides: function(data, p2){
      var car = this.getSlideShow();
      var record = p2[0];
      
      var slides = record.get('slides');
      var title = record.get('title');
      
      for (var i=0; i<slides.length; i++){
        slides[i].src = slides[i].url;
        slides[i].xtype = "image";
      }
      
      
     
//    car.setItems([{xtype: 'panel', html: 'test'}])
    }

});
