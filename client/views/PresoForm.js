Presencha.views.PresoForm = Ext.extend(Ext.Panel, {

  initComponent: function() {
    Ext.apply(this, {
      layout: {
        type: 'vbox',
        pack: 'center'
      },
      dockedItems: [
        {
          xtype: 'toolbar',
          title: 'Upload your slideshow'
        },
        {
          xtype: 'toolbar',
          dock: 'bottom',
          items: [
            { xtype: 'spacer' },
            {
              text: 'submit',
              ui: 'confirm'
            },
            { xtype: 'spacer' }
          ]
        }
      ],
      items: [
        {
          html: [
            '<form id="slideshow"',
            ' action="http://api.presencha.com/slideshow"',
            ' enctype="multipart/form-data"',
            ' method="POST">',
            '<fieldset>',
            '  <label>Title:',
            '    <input type="text" name="title">',
            '  </label><br/>',
            '  <label>PDF:',
            '    <input type="file" name="slides">',
            '  </label>',
            '</fieldset>',
            '</form>',
          ]
        }
      ]
    })
    Presencha.views.PresoForm.superclass.initComponent.apply(this, arguments);
  }
});
Ext.reg('Presencha.views.PresoForm', Presencha.views.PresoForm)