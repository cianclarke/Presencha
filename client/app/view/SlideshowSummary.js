/**
 * @class Presencha.view.SlideshowSummary
 *
 * Summary of the slideshow links
 */
Ext.define('Presencha.view.SlideshowSummary', {
    extend: 'Ext.Panel',
    xtype: 'slideshowsummary',
    config: {
        layout: 'fit',
        html: 'asdfasd',
        tpl: [
            '<h1>Find your form here</h1>',
            '<p>Public: http://presencha.com/{key}</p>',
            '<p>Presenter: http://presencha.com/{key}/{secretkey}</p>',
        ]
    }
});