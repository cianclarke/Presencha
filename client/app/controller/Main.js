Ext.define('Presencha.controller.Main', {
    extend: 'Ext.app.Controller',
    
    views: ['PresoForm', 'Slideshow'],
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
        },
        {
          ref: 'viewport',
          selector: 'viewport'
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
        
        var queryString = Ext.urlDecode(window.location.search.substring(1));
        debugger;//FIXME: Setactiveitem not working
        var vp = this.getViewport();
        if (queryString.key){
          // We want a slideshow
          vp.setActiveItem(1);
          
        }else{
          // We want a form upload
          vp.setActiveItem(1);
        }
        
        
        
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
      
      
     
    car.setItems(slides);
    }

});
