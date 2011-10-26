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
    
    launch: function() {
        window.vp = this.getViewport();
        window.ss = this.getSlideshowsummary();
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
                vp.setActiveItem(1);
            },
            failure: function() {
                debugger;
                console.log('Upload failed.')
            }
        })
    }
});
