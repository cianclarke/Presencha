Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'Presencha',
    
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
        
		//test code
        /*PresenchaMsg.startSlideshow('test-id', function() {
        	PresenchaMsg.joinSlideshow('test-id', function(from, message) {
        		alert(JSON.stringify(message));
        	})
        	PresenchaMsg.goTo(4);
        });*/
    }
});

Ext.define('PresenchaMsg', {
	singleton : true,
	key : '',
	
	/**
	 * Are we the presenter?
	 */
	isPresenter : false,
	queue : null, //current queue
	
	constructor : function() {
		//
	},
	
	/**
	 * Start a slideshow (as a superuser)
	 */
	startSlideshow : function(key, callback) {
		PresenchaMsg.key = key;
		Ext.io.messaging.getQueue(key, function(queue) {
			PresenchaMsg.queue = queue;
        	PresenchaMsg.isPresenter = true;
        	
        	if(callback) callback(queue);
		});
	},
	
	goTo : function(slideNumber) {
		PresenchaMsg.queue.publish({
			slideNumber : slideNumber
		});
	},
	
	joinSlideshow : function(key, onGoTo, onSetup) {
		PresenchaMsg.key = key;
		PresenchaMsg._onMsg = onGoTo;
		Ext.io.messaging.getQueue(key, function(queue) {
			PresenchaMsg.queue = queue;
        	PresenchaMsg.queue.subscribe(PresenchaMsg._onMsg);
        	
        	if(onSetup) callback(onSetup);
		});
	},
	
	stopSlideshow : function(callback, scope) {
		PresenchaMsg.queue.unsubscribe(callback, scope);
	},
	
	_onMsg : function(from, message) {
		alert(JSON.stringify(message));
	}
});
