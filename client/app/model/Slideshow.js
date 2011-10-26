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
        url: 'http://api.presencha.com/slideshow/69695693bad66a65bf35a8d4027265e6'
        //url: 'http://api.presencha.com/slideshow/abc'
     } // TODO - guess the proxy sits on the SlideShow, and it reaches to our API?
});

