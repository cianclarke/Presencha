/**
 * @class Presencha.view.FileUploadField
 *
 * File uploader view
 */
Ext.define('Presencha.view.FileUploadField', {
    extend: 'Ext.field.Field',
    xtype: 'fileuploadfield',
    
    config: {
        /**
         * @cfg {Boolean} file Enable file uploading
         */
        file: true
    },
    /**
     * Add a file to the form's upload field based on the given filename
     * @param {String} file
     * @return {String} file
     */
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

    /**
     * Get the filename of the file being uploaded
     */
    getValue: function() {
        return this.getFile().element.down('input').dom.value;
    }
})