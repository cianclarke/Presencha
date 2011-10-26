Ext.define('Presencha.view.PresoForm', {
    extend: 'Ext.Panel',
    xtype: 'presoform',
    config: {
        layout: {
            type: 'vbox',
            pack: 'top'
        },
        scroll: 'vertical',
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
                xtype: 'panel',
                pack: 'center',
                type: 'hbox',
                align: 'stretch',
                items: {  
                  html: [
                    '<form id="slideshow"',
                    ' action="http://api.presencha.com/slideshow"',
                    ' enctype="multipart/form-data"',
                    ' method="POST">',
                    '<fieldset>',
                    '  <ul><li><label>Title</label></li>',
                    '    <li><input type="text" name="title" class="title">',
                    '  </li>',
                    '  <li><label>PDF</label></li>',
                    '    <input type="file" name="slides">',
                    '  </li></ul>',
                    '</fieldset>',
                    '</form>',
                  ].join(" ")
                }
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    { xtype: 'spacer' },
                    {
                        text: 'submit',
                        cls: 'green'
                    },
                    { xtype: 'spacer' }
                ] 
            }
        ]
    }
});