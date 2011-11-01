/**
 * @class Presencha.model.Slideshow
 *
 * Model for a complete slide show
 */
Ext.define("Presencha.model.Slideshow", {
    extend: "Ext.data.Model",
    fields: [
         {name: "id", type: "string"}, // unique ID of this presentation as per the API
         {name: "title", type: "string"}, // Title of the presentation
         {name: "slides", type: "auto"}
         //{name: "audio", type: "string"} // audio URL?
     ],
     associations: [
         {type: 'hasMany', model: 'Presencha.model.Slide', name: 'slidess'}
     ],
     proxy: {
        type: 'ajax',
        url: 'http://api.presencha.com/slideshow/meh'
        //url: 'http://api.presencha.com/slideshow/abc'
     } // TODO - guess the proxy sits on the SlideShow, and it reaches to our API?
});

