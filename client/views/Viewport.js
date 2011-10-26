Presencha.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function() {
        //put instances of cards into app.views namespace
        Ext.apply(Presencha.views, {
            //contactsList: new app.views.ContactsList(),
            //contactDetail: new app.views.ContactDetail(),
            //contactForm: new app.views.ContactForm()
        });
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
                { xtype: 'Presencha.views.PresoForm'},
                {
                  xtype: 'panel',
                  html: 'hello world'
                },
            ]
        });
        Presencha.views.Viewport.superclass.initComponent.apply(this, arguments);
    }
});
