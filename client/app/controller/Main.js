Ext.define('Presencha.controller.Main', {
    extend: 'Ext.app.Controller',
    
    views: ['Slideshow', 'PresoForm', 'FileUploadField', 'SlideshowSummary'],
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
            ref: 'htmlform',
            selector: '#htmlFormPanel'
        },
        {
            ref: 'viewport',
            selector: 'viewport'
        },
        {
            ref: 'slideshowsummary',
            selector: 'slideshowsummary'
        }
    ],
    
    launch: function() {
      // TODO: Use routing to determine the API call we need to make
      // Set the proxy url of our slideshow store to this
        
        this.control({
          'slideshow' : {
              // Handlers here.. select: this.showSlides, 
          },
          '#presentationUploadButton': {
              // Form submission handler goes here
              tap: this.onUploadTap
          }
        });
        
        var queryString = Ext.urlDecode(window.location.search.substring(1));
        var url = "http://api.presencha.com/slideshow/" + queryString.key;
        
        var slidestore = this.getSlideshowStore();
        
        slidestore.on({
          'load': this.addSlides,
          scope: this
        });
        
        var vp = this.getViewport();
        
        
        
        
        
    },
    
    showSlides: function(){
        // handler functions here var list = this.getSlideList();
    },
    
    onUploadTap: function() {
        Ext.Ajax.request({
            url: 'http://api.presencha.com/slideshow',
            isUpload: true,
            method: 'POST',
            scope: this,
            params: this.getPresoForm().down('formpanel').getValues(),
            success: function() {
                var vp = this.getViewport();
                
                vp.add({ xtype: 'slideshowsummary' });
                this.getViewport().setActiveItem(1);
                
            },
            failure: function() {
                debugger;
                console.log('Upload failed.')
            }
        })
    },

    addSlides: function(data, p2){
      var car = this.getSlideShow();
      if (!p2) return;
      var record = p2[0];
      
      var slides = record.get('slides');
      var title = record.get('title');
      
      for (var i=0; i<slides.length; i++){
        slides[i].src = 'http://api.presencha.com' + slides[i].url;
        slides[i].xtype = "image";
      }
      debugger;
     
    car.setItems(slides, function(){
    
    if(PresenchaMsg.isPresenter) {
    PresenchaMsg.startSlideshow(key);
    }
    else {
    	PresenchaMsg.joinSlideshow(key, function(from, message) {
    	   var carousel = PresenchaMsg.carousel;
       	c.setActiveItem(message.slideNumber);
   	});
    }
    
    });
    }

});
