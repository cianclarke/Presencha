Presencha.models.Slideshow = Ext.regModel("Presencha.models.Slideshow", {
    fields: [
        {name: "id", type: "string"}, // unique ID of this presentation as per the API
        {name: "name", type: "string"}, // Title of the presentation
        {name: "audio", type: "string"} // audio URL?
    ],
    associations: [
        {type: 'hasMany', model: 'Slide', name: 'slides'}
    ],
    /*proxy: {
      
    }*/ // TODO - guess the proxy sits on the SlideShow, and it reaches to our API?

});

Presencha.stores.slideshow = new Ext.data.Store({
  model: "Presencha.models.Slideshow"
});
