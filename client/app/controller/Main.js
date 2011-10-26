Ext.define('Presencha.controller.Main', {
    extend: 'Ext.app.Controller',
    
    views: ['Slideshow'],
    models: ['Slide', 'Slideshow'],
    refs: [
        {
            ref: 'slideShow',
            selector: '#slideShow'
        }
    ],
    
    init: function() {
        this.control({
          'slideshow' : {
              // Handlers here.. select: this.showSlides, 
          }
        });
        
    },
    
    showSlides: function(){
        // handler functions here var list = this.getSlideList();
    }    
});