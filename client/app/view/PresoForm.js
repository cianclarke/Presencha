/**
 * @class Presencha.view.PresoForm
 *
 * Presentation upload form
 */
Ext.define('Presencha.view.PresoForm', {
    extend: 'Ext.Panel',
    xtype: 'presoform',
    config: {
        layout: 'fit',
        items: [
            {
                xtype: 'panel',
                html: '<img class="vector" src="resources/images/logo.png">',
                cls: 'mascott'
            },
            {
                xtype: 'toolbar',
                title: 'Upload your slideshow',
                docked: 'top'
            },
            {
                xtype: 'formpanel',
                cls: 'upload',
                items: [
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'textfield',
                                label: 'Title',
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
                        cls: 'green',
                        id: 'presentationUploadButton'
                    },
                    { xtype: 'spacer' }
                ] 
            }
        ]
    }
});
