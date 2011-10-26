Ext.define('Presencha.controller.Main', {
    extend: 'Ext.app.Controller',
    
    views: ['Slideshow', 'PresoForm'],
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
    
    init: function() {
        this.control({
          'slideshow' : {
              // Handlers here.. select: this.showSlides, 
          },
          'presoform': {
              // Form submission handler goes here
          }
        });
        
    },
    
    showSlides: function(){
        // handler functions here var list = this.getSlideList();
    }    
});