Ext.define('Presencha.view.PresoForm', {
    extend: 'Ext.Panel',
    xtype: 'presoform',
    config: {
        layout: 'fit',
        
        items: [
            {
                xtype: 'toolbar',
                title: 'Upload your slideshow',
                docked: 'top'
            },
            {
                xtype: 'formpanel',
                items: [
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'title',
                                name: 'title'
                            },
                            {
                                xtype: 'fileuploadfield',
                                label: 'PDF',
                                name: 'pdf'
                            }
                        ]
                    }
                ]
            },
            // {
            //     id: 'htmlFormPanel',
            //     html: [
            //       '<form id="slideshowForm"',
            //       ' action="http://api.presencha.com/slideshow"',
            //       ' enctype="multipart/form-data"',
            //       ' method="POST">',
            //       '<fieldset>',
            //       '  <label>Title:',
            //       '    <input type="text" name="title">',
            //       '  </label><br/>',
            //       '  <label>PDF:',
            //       '    <input type="file" name="slides">',
            //       '  </label>',
            //       '</fieldset>',
            //       '</form>',
            //     ].join(" ")
            // },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    { xtype: 'spacer' },
                    {
                        text: 'submit',
                        ui: 'confirm',
                        id: 'presentationUploadButton'
                    },
                    { xtype: 'spacer' }
                ] 
            }
        ]
    }
});