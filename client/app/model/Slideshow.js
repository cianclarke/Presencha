Ext.define("Presencha.model.Slideshow", {
    extend: "Ext.data.Model",
    fields: [
         {name: "id", type: "string"}, // unique ID of this presentation as per the API
         {name: "name", type: "string"}, // Title of the presentation
         {name: "audio", type: "string"} // audio URL?
     ],
     associations: [
         {type: 'hasMany', model: 'Slide', name: 'slides'}
     ],
     proxy: {
        type: 'localstorage',
        id: 'Slideshow'
     } // TODO - guess the proxy sits on the SlideShow, and it reaches to our API?
});

Ext.define("Presencha.stores.slideshow", {
  extend: "Ext.data.Store",
  model: "Presencha.model.Slideshow",
  data: [
    {
      id: 'MyFirst',
      name: 'My First Slideshow',
      audio: 'http://www.presencha.com/MyFirst/audio.mp3',
      slides: [
          {
            image: 'http://www.presencha.com/MyFirst/1.png'
          },
          {
            image: 'http://www.presencha.com/MyFirst/2.png'
          }
      ]
    }
  ]
});