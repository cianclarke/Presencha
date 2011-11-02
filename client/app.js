Ext.Loader.setConfig({
    enabled: true,
});

Ext.application({
    name: 'Presencha',
	appFolder: '/app',
    
    controllers: ['Main'],
    
    launch: function() {
        Ext.create('Presencha.view.Viewport');
        
        //set up the messaging
        Ext.io.setup({
            key : 'presencha',
            logLevel : 'debug',
            pollingDuration : 1000
        });
        Ext.io.init();
    }
});

/**
 * @class PresenchaMsg
 */
Ext.define('PresenchaMsg', {
	singleton : true,
    /**
     * Presentation key
     */
	key : '',
	
	/**
	 * Are we the presenter?
	 */
	isPresenter : false,
    /**
     * Current queue
     */
	queue : null,
	
	constructor : function() {
		//
	},

    /**
     * Start a slideshow (as a superuser)
     * @param {String} key
     * @param {Function} callback
     */
	startSlideshow : function(key, callback) {
		PresenchaMsg.key = key;
		Ext.io.messaging.getQueue(key, function(queue) {
			PresenchaMsg.queue = queue;
        	PresenchaMsg.isPresenter = true;
        	
        	if(callback) callback(queue);
		});
	},

    /**
     * Presenter method to go to a certain slide number
     * @param {Number} slideNumber
     */
	goTo : function(slideNumber) {
		if(!PresenchaMsg.isPresenter) return;
		PresenchaMsg.queue.publish({
			slideNumber : slideNumber
		});
	},

    /**
     * Join a slideshow
     * @param {String} key
     * @param {Function} onGoTo
     * @param {Function} onSetup
     */
	joinSlideshow : function(key, onGoTo, onSetup) {
		PresenchaMsg.key = key;
		PresenchaMsg._onMsg = onGoTo;
		Ext.io.messaging.getQueue(key, function(queue) {
			PresenchaMsg.queue = queue;
        	PresenchaMsg.queue.subscribe(PresenchaMsg._onMsg);
        	
        	if(onSetup) callback(onSetup);
		});
	},

    /**
     * Get the URL for a slide
     * @param {String} url
     * @return {String}
     */
	getSlideUrl : function(url) {
		var n = Math.ceil(Math.random() * 3);
		return 'http://src.sencha.io/' + url;
	},

    /**
     * End the slide show
     * @param {Function} callback
     * @param {Object} scope
     */
	stopSlideshow : function(callback, scope) {
		PresenchaMsg.queue.unsubscribe(callback, scope);
	},

    /**
     * Handle a message
     * @private
     * @param {String} from
     * @param {String} message
     */
	_onMsg : function(from, message) {
		alert(JSON.stringify(message));
	}
});
