Ext.define('Presencha.view.FileUploadField', {
    extend: 'Ext.field.Field',
    xtype: 'fileuploadfield',
    
    config: {
        file: true
    },
    
    applyFile: function(file) {
        if(file) {
            file = this.add({
                xtype: 'component',
                html: ['<div class="x-input-el">',
                '<input type="file" name="' + this.getName() + '">',
                '</div>'
                ].join(" ")
            })
        }
        
        return file;
    },
    
    getValue: function() {
        return this.getFile().element.down('input').dom.value;
    }
})