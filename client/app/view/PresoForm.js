Ext.define('Presencha.view.PresoForm', {
    extend: 'Ext.Panel',
    xtype: 'presoform',
    config: {
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        
        items: [
            {
                xtype: 'toolbar',
                title: 'Upload your slideshow',
                docked: 'top'
            },
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
                ].join(" ")
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    { xtype: 'spacer' },
                    {
                        text: 'submit',
                        ui: 'confirm'
                    },
                    { xtype: 'spacer' }
                ] 
            }
        ]
    }
});