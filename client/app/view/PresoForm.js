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
                                name: 'slideshow'
                            }
                        ]
                    }
                ]
            },
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