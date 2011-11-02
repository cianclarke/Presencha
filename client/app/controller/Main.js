/**
 * @class Presencha.controller.Main
 *
 * The presentation controller for the touch interface
 */
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
    /**
     * Launching of the application
     */
    launch: function() {
        // TODO: Use routing to determine the API call we need to make
        // Set the proxy url of our slideshow store to this
        this.control({
            'slideshow': {
                // Handlers here.. select: this.showSlides,
                },
            '#presentationUploadButton': {
                // Form submission handler goes here
                tap: this.onUploadTap
            }
        });

        /* Retrieve the keys from the URL - looks something like /key/secretKey */
        var path = window.location.pathname;
        var keys = path.substring(1).split("/");
        var publicKey,
        secretKey;

        if (keys.length == 2) {
            publicKey = keys[0];
            secretKey = keys[1];
            PresenchaMsg.isPresenter = true;
            // TODO: check the secret key agains the API
        } else if (keys.length == 1) {
            publicKey = keys[0];
        } else {
            Ext.Msg.alert('No Slideshow Key', 'Please provide a slideshow key');
        }

        var slideStore = this.getSlideshowStore();

        /* Change the proxy of our store to have the correct URL. */
        var newProxy = {
            type: 'ajax',
            url: 'http://api.presencha.com/slideshow/' + publicKey
        }
        slideStore.setProxy(newProxy);


        slideStore.on({
            'load': this.addSlides,
            scope: this
        });

        slideStore.load();

        var vp = this.getViewport();

        window.onkeydown = this.keyboardEvent;


    },

    /**
     * Show the slides from the list
     */
    showSlides: function() {
        // handler functions here var list = this.getSlideList();
        },

    /**
     * Handles uploading slides
     */
    onUploadTap: function() {
        Ext.Ajax.request({
            url: 'http://api.presencha.com/slideshow',
            isUpload: true,
            method: 'POST',
            scope: this,
            params: this.getPresoForm().down('formpanel').getValues(),
            success: function() {
                var vp = this.getViewport();

                vp.add({
                    xtype: 'slideshowsummary'
                });
                this.getViewport().setActiveItem(1);

            },
            failure: function() {
                debugger;
                console.log('Upload failed.')
            }
        })
    },

    /**
     * Add new slides to the carousel as a container with an image in it
     * @param {Object} data
     * @param {Array} p2
     */
    addSlides: function(data, p2) {
        var car = this.getSlideShow();
        if (!p2) return;
        var record = p2[0];

        var slides = record.get('slides');

        for (var i = 0; i < slides.length; i++) {
            slides[i].html = '<div class="slide-container"><img src="' + PresenchaMsg.getSlideUrl('http://api.presencha.com' + slides[i].url) + '"></div>';
            slides[i].xtype = 'container';
        }

        car.setItems(slides);

        if (PresenchaMsg.isPresenter) {
            PresenchaMsg.startSlideshow('test');
        } else {
            PresenchaMsg.joinSlideshow('test',
            function(from, message) {
                var c = PresenchaMsg.carousel;
                c.setActiveItem(message.slideNumber - 1);
            });
        }
    },

    /**
     * Take keyboard events
     * @param {Number} ev
     */
    keyboardEvent: function(ev) {
        //TODO: How to get the carousel view in scope here? Curry?
        var code = ev.keyCode;
        switch (code) {
        case 37:
            // left
            // go back a slide
            PresenchaMsg.carousel.previous();
            break;
        case 38:
            // up
            //go forward a slide
            PresenchaMsg.carousel.next();
            break;
        case 39:
            // right
            // go forward a slide
            PresenchaMsg.carousel.next();
            break;
        case 40:
            // down
            // go back a slide
            PresenchaMsg.carousel.previous();
            break;
        }


    }

});

