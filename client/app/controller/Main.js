Ext.define('Presencha.controller.Main', {
    extend: 'Ext.app.Controller',
    
    views: ['Slideshow', 'PresoForm', 'FileUploadField', 'SlideshowSummary'],
    models: ['Slide', 'Slideshow'],
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
        }
    ],
    
    init: function() {
        this.control({
          'slideshow' : {
              // Handlers here.. select: this.showSlides, 
          },
          '#presentationUploadButton': {
              // Form submission handler goes here
              tap: this.onUploadTap
          }
        });
        
    },
    
    showSlides: function(){
        // handler functions here var list = this.getSlideList();
    },
    
    onUploadTap: function() {
        Ext.Ajax.request({
            url: 'http://api.presencha.com/slideshow',
            isUpload: true,
            method: 'POST',
            params: this.getPresoForm().down('formpanel').getValues(),
            success: function() {
                debugger;
            },
            failure: function() {
                debugger;
            }
        })
    }
});
