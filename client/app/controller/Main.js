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
        debugger;
        var slidestore = this.getSlideshowStore();
        slidestore.on({
          'load': this.addSlides,
          scope: this
        });
        
        var vp = this.getViewport();
        if (queryString.key){
          // We want a slideshow
          vp.add({
            xtype: 'slideshow'
          });
          this.getSlideshowStore().load();
        }else{
          // We want a form upload
          vp.setActiveItem(0);
        }
        
        
        
        
        
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
                vp.removeAll();
                vp.add({ xtype: 'slideshowsummary' });
                
            },
            failure: function() {
                debugger;
                console.log('Upload failed.')
            }
        })
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
      
      this.getViewport().setActiveItem(1);
     
    car.setItems(slides);
    }

});
