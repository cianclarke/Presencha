Ext.util.MD5 = function(s,raw,hexcase,chrsz) {
	raw = raw || false;	
	hexcase = hexcase || false;
	chrsz = chrsz || 8;

	function safe_add(x, y){
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
	function bit_rol(num, cnt){
		return (num << cnt) | (num >>> (32 - cnt));
	}
	function md5_cmn(q, a, b, x, s, t){
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t){
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t){
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t){
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t){
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function core_md5(x, len){
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var a =  1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d =  271733878;
		for(var i = 0; i < x.length; i += 16){
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
			d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
			b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
			d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
			c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
			d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
			d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
			a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
			d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
			c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
			b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
			d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
			c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
			d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
			c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
			a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
			d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
			c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
			b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
			d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
			b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
			d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
			c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
			d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
			a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
			d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
			b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
			d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
			c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
			d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
			d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
			a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
			d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
			b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return [a, b, c, d];
	}
	function str2binl(str){
		var bin = [];
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
		}
		return bin;
	}
	function binl2str(bin){
		var str = "";
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < bin.length * 32; i += chrsz) {
			str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
		}
		return str;
	}
	
	function binl2hex(binarray){
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) + hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
		}
		return str;
	}
	return (raw ? binl2str(core_md5(str2binl(s), s.length * chrsz)) : binl2hex(core_md5(str2binl(s), s.length * chrsz))	);
};

Ext.define('Ext.util.LoggerConstants', {
  statics: {
    NONE: 10,
    ERROR: 4,
    WARNING: 3,
    INFO: 2,
    DEBUG: 1,

    STR_TO_LEVEL: {
      "debug": 1,
      "info": 2,
      "warn": 3,
      "error": 4,
      "none": 10,
    },
  }
});

Ext.define('Ext.util.Logger', {
  statics: {
    level: Ext.util.LoggerConstants.ERROR,

    setLevel: function(levelString) {
      if(Ext.util.LoggerConstants.STR_TO_LEVEL[levelString]) {
        Ext.util.Logger.level = Ext.util.LoggerConstants.STR_TO_LEVEL[levelString];
      } else {
        Ext.util.Logger.level = Ext.util.LoggerConstants.NONE;
      }
    },

    debug: function() {
      if(Ext.util.Logger.level <= Ext.util.LoggerConstants.DEBUG) {
        console.log.apply(console, arguments);
      }
    },

    info: function() {
      if(Ext.util.Logger.level <= Ext.util.LoggerConstants.INFO) {
        console.log.apply(console, arguments);
      }
    },

    warn: function() {
      if(Ext.util.Logger.level <= Ext.util.LoggerConstants.WARNING) {
        console.log.apply(console, arguments);
      }
    },

    error: function() {
      if(Ext.util.Logger.level <= Ext.util.LoggerConstants.ERROR) {
        console.log.apply(console, arguments);
      }
    }
  }
});



Ext.util.UUIDGenerator= {
	
	generate: function() { // totally random uuid
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	},

};
/**
 * {@img diagram.003.png Class Diagram}
 */
Ext.define('Ext.io', {

    statics: {
        config: {
            key: null,
            url: 'http://msg.sencha.io',
        },

        messaging: null,

        /**
         * Setup Ext.io for use
         */
        setup: function(config) {
            Ext.apply(Ext.io.config, config);
        },

        /**
         * @private
         */
        init: function() {
            if (!Ext.io.messaging) {
                if (Ext.io.config.logLevel) {
                    Ext.util.Logger.setLevel(Ext.io.config.logLevel);
                }

                if (!Ext.io.config.key) {
                    Ext.io.config.key = Ext.util.Cookie.getItem("connect.sid");
                }

                Ext.io.messaging = Ext.create('Ext.io.Messaging', Ext.io.config);
            }
        },

        /**
         * Get the current App.
         *
         * @param {Function} callback Returns an Ext.io.App
         * @param {Ext.io.App} callback.app
         * @param {Object} scope
         */
        getCurrentApp: function(callback, scope) {
            Ext.io.init();
            Ext.io.App.getCurrent(callback, scope);
        },

        /**
         * Get the current Device.
         *
         * @param {Function} callback Returns an Ext.io.Device
         * @param {Ext.io.Device} callback.device
         * @param {Object} scope
         */
        getCurrentDevice: function(callback, scope) {
            Ext.io.init();
            Ext.io.Device.getCurrent(callback, scope);
        },

        /**
         * Get the current user Group, if any.
         *
         * @param {Function} callback Returns an Ext.io.Group, if there is one
         * @param {Ext.io.Group} callback.group
         * @param {Object} scope
         */
        getCurrentGroup: function(callback, scope) {
            Ext.io.init();
            Ext.io.Group.getCurrent(callback, scope);
        },

        /**
         * Get the current User, if any.
         *
         * @param {Function} callback Returns an Ext.io.User, if there is one
         * @param {Ext.io.User} callback.user
         * @param {Object} scope
         */
        getCurrentUser: function(callback, scope) {
            Ext.io.init();
            Ext.io.User.getCurrent(callback, scope);
        },

        /**
         * Get a proxy interface for a service
         *
         * @param {String} name
         * @param {Function} callback Returns an Ext.io.Service or Ext.io.Proxy
         * @param {Ext.io.Service|Ext.io.Proxy} callback.service
         * @param {Object} scope
         */
        getService: function(name, callback, scope) {
            Ext.io.init();
            Ext.io.messaging.getService(name, callback, scope);
        },

        /**
         * Get a queue
         *
         * @param {String} name
         * @param {Function} callback Returns an Ext.io.Queue
         * @param {Ext.io.Queue} callback.queue
         * @param {Object} scope
         */
        getQueue: function(name, callback, scope) {
            Ext.io.init();
            Ext.io.messaging.getQueue(name, callback, scope);
        },

        /**
         * Send a message.
         * @deprecated
         *
         * @param {String} id
         * @param {Object} message
         * @param {Function} callback
         * @param {Object} scope
         * @param {Function} errCallback
         */
        send: function(id, message, callback, scope, errCallback) {
            Ext.io.init();

            if (!id) {
                Ext.util.Logger.error("id is not valid. Should be of the form 'target/name', e.g. client/861231");
                errCallback.call(scope, "MISSING_ID");
                return;
            }

            var params = id.split("/");
            var targetType = params[0];
            var targetId = params[1];

            switch (targetType) {
            case "client":
                {
                    Ext.io.messaging.transport.sendToClient(targetId, message, callback, scope);
                };
                break;

            case "service":
                {
                    Ext.io.messaging.transport.sendToService(targetId, message, callback, scope);
                };
                break;

            case "queue":
                {
                    Ext.io.messaging.pubsub.publish(targetId, message, callback, scope);
                };
                break;

            default:
                {
                    Ext.util.Logger.error("Target is not valid. Should be one of 'client', 'service' or 'queue' : " + targetType);
                    callback.call(scope, "INVALID_TARGET", null);
                };
                break;
            }
        },

        /**
         * Subscribe to a Service or Queue.
         * @deprecated
         *
         * @param {String} id
         * @param {Function} callback
         * @param {Object} scope
         * @param {Function} errCallback
         */
        subscribe: function(id, callback, scope, errCallback) {
            Ext.io.init();

            if (!id) {
                Ext.util.Logger.error("id is not valid. Should be of the form 'target/name', e.g. client/861231");
                errCallback.call(scope, "MISSING_ID");
                return;
            }

            var params = id.split("/");
            var targetType = params[0];
            var targetId = params[1];

            switch (targetType) {
            case "service":
                {
                    Ext.io.messaging.transport.subscribe(targetId, function(err, response) {
                        if (err) {
                            errCallback.call(scope, err, response);
                        } else {
                            Ext.io.messaging.transport.setListener(targetId, function(envelope) {
                                callback.call(scope, envelope.service, envelope.msg);
                            }, this);
                        }
                    }, this);
                };
                break;

            case "queue":
                {
                    Ext.io.messaging.pubsub.subscribe(targetId, callback, scope, errCallback);
                };
                break;

            default:
                {
                    Ext.util.Logger.error("Target is not valid. Should be one of 'service' or 'queue' : " + targetType);
                    errCallback.call(scope, "INVALID_TARGET");
                };
                break;
            }

        },

        /**
         * Unsubscribe from a Service or Queue.
         * @deprecated
         *
         * @param {String} id
         * @param {Function} callback
         * @param {Object} scope
         * @param {Function} errCallback
         */
        unsubscribe: function(id, callback, scope, errCallback) {
            Ext.io.init();

            if (!id) {
                Ext.util.Logger.error("id is not valid. Should be of the form 'target/name', e.g. client/861231");
                errCallback.call(scope, "MISSING_ID");
                return;
            }

            var params = id.split("/");
            var targetType = params[0];
            var targetId = params[1];

            switch (targetType) {
            case "service":
                {
                    Ext.io.messaging.transport.unsubscribe(targetId, callback, scope);
                };
                break;

            case "queue":
                {
                    Ext.io.messaging.pubsub.unsubscribe(targetId, callback, scope);
                };
                break;

            default:
                {
                    Ext.util.Logger.error("Target is not valid. Should be one of 'service' or 'queue' : " + targetType);
                    errCallback.call(scope, "INVALID_TARGET");
                };
                break;
            }
        },

        /**
         * Listen for messages from a Service.
         * @deprecated
         *
         * @param {String} name A service name.
         * @param {Function} callback
         * @param {Object} scope
         */
        listen: function(name, callback, scope) {
            Ext.io.init();
            Ext.io.messaging.transport.setListener(name, function(envelope) {
                callback.call(scope, envelope.from, envelope.msg);
            }, this);
        }
    }
});


Ext.define('Ext.io.Transport', {
	
  naming: null,

  transport: null,

  oldConsoleLog: null,

  listeners: {},

  /** @private
  * Mapping of transport classes to short name
  * transportName provided by config used for transport lookup.
  */
  transportClasses: {
    "polling": 'Ext.io.transports.PollingTransport',
    "socket": "Ext.io.transports.SocketIoTransport",
  },

  config: {
    key: '',
    url: 'http://msg.sencha.io',
    clientId: '',
    piggybacking: true,
    maxEnvelopesPerReceive: 10,
    transportName: ""
  },

  constructor: function(config, naming) {
    this.initConfig(config);
    this.naming = naming;

    if(!this.getClientId()) {
      this.setClientId(this.naming.getClientId());
    }
    config.clientId = this.getClientId();
    var me = this;
    this.transportName = config.transportName || "polling";

    Ext.util.Logger.info("Using transport name ", this.transportName);

    this.transport = Ext.create(this.transportClasses[this.transportName], config);
    this.transport.start();
    this.transport.on('receive', function(envelope) {me.receive(envelope);});

    return this;
  },

  setListener: function(serviceName, listener, scope) {
    this.listeners[serviceName] = {listener:listener, scope:scope};
  },

  removeListener: function(serviceName) {
    delete this.listeners[serviceName];
  },

  sendToService: function(serviceName, payload, callbackFunction, scope) {
    this.send({service: serviceName, msg: payload}, callbackFunction, scope)
  },

  sendToClient: function(targetClientId, payload, callbackFunction, scope) {
    this.send({to: targetClientId, service: "courier", msg: payload}, callbackFunction, scope);
  },

  send: function(envelope, callbackFunction, scope) {
    var self = this;

    envelope.from = this.getClientId();

    Ext.util.Logger.debug("Transport.send " + JSON.stringify(envelope));

    this.transport.send(envelope, function(err, response) {
      if(callbackFunction){
        callbackFunction.call(scope, err, response);
      }
    });

  },

  receive: function(envelope) {
    Ext.util.Logger.debug("Transport.receive " + JSON.stringify(envelope));

    // dispatch it to the correct service listener
    if(this.listeners[envelope.service]) {
      var map = this.listeners[envelope.service];
      map.listener.call(map.scope, envelope);
    } else {
      Ext.util.Logger.error("No listener for " + envelope.service);
    }
  },

  subscribe: function(serviceName, callbackFunction, scope) {
    Ext.util.Logger.debug("Transport.subscribe " + serviceName);

    var params = { key: this.getKey(), client_id: this.getClientId(), service: serviceName };

    this.transport.subscribe(params, function(err, response) {
      if(callbackFunction){
        callbackFunction.call(scope, err, response);
      }
    });

  },

  unsubscribe: function(serviceName, callbackFunction, scope) {
    Ext.util.Logger.debug("Transport.unsubscribe " + serviceName);

    var params = { key: this.getKey(), client_id: this.getClientId(), service: serviceName };

    this.transport.unsubscribe(params, function(err, response) {
      if(callbackFunction){
        callbackFunction.call(scope, err, response);
      }
    });

  }

});



Ext.define('Ext.io.Rpc', {
	
  currentCallId: 0,

  callMap: {},

  transport: null,

  config: {
  },

  constructor: function(config, transport) {
    this.initConfig(config);
    this.transport = transport;

    return this;
  },

  generateCallId: function() {
    return ++this.currentCallId;
  },

  subscribe: function(envelope) {
    // got a response envelope, now handle it
    this.callback(envelope.msg["corr-id"], envelope);
  },

  dispatch: function(envelope, callbackFunction) {
    var corrId = this.generateCallId();
    envelope.msg["corr-id"] = corrId;
    envelope.from = this.transport.getClientId();

    this.callMap[corrId] = callbackFunction;

    // send the envelope
    this.transport.send(envelope, function() {
      // no-op
    }, this);
  },

  callback: function(corrId, envelope) {
    corrId = parseInt(corrId);
    if (!this.callMap[corrId]) {
      Ext.util.Logger.warn("No associated call with this envelope available: " + corrId);
    } else {
      this.callMap[corrId](envelope.msg.result);
      delete this.callMap[corrId];
    }
  },

  call: function(callbackFunction, serviceName, style, method, args) {
    // register for rpc-direct receive calls
    this.transport.setListener("rpc", this.subscribe, this);

    // register for serviceName receive calls (subscriber rpc)
    this.transport.setListener(serviceName, this.subscribe, this);

    switch(style) {
      case "subscriber":
        var envelope = {service: serviceName, from: this.transport.getClientId(), msg: {method: method, args: args}};
        this.dispatch(envelope, callbackFunction);
        break;
      case "direct":
        var envelope = {service: 'rpc', from: this.transport.getClientId(), msg: {service: serviceName, method: method, args: args}};
        this.dispatch(envelope, callbackFunction);
        break;
      default:
			  Ext.util.Logger.error(style + " is an invalid RPC style. Should be 'direct' or 'subscriber'");
        throw "Invalid RPC style: " + style;
        break;
    }
  }

});


Ext.define('Ext.io.Proxy', {
	
  name: null,

  descriptor: null,

  rpc: null,

  constructor: function(name, descriptor, rpc) {
    this.name = name;
    this.descriptor = descriptor;
    this.rpc = rpc;

    if(this.descriptor.kind != 'rpc') {
			Ext.util.Logger.error(this.name + " is not a RPC service");
      throw "Error, proxy does not support non-RPC calls";
    }

    this._createMethodProxies();

    return this;
  },

  _createMethodProxies: function() {
    var self = this;
    for(var i = 0; i < this.descriptor.methods.length; i++) {
      var methodName = this.descriptor.methods[i];
      self[methodName] = self._createMethodProxy(methodName);
    }
  },

  _createMethodProxy: function(methodName) {
    var self = this;

    return function() {
      arguments.slice = Array.prototype.slice;
      var serviceArguments = arguments.slice(0);
      var style = self.descriptor.style[0];
      if(self.descriptor.style.indexOf("subscriber") > 0) {
        style = "subscriber"; // prefer subscriber style if available
      }

      self.rpc.call(serviceArguments[0], self.name, style, methodName, serviceArguments.slice(1));
    }
  }

});


Ext.define('Ext.io.Service', {
	
  name: null,

  descriptor: null,

  transport: null,

  constructor: function(name, descriptor, transport) {
    this.name = name;
    this.descriptor = descriptor;
    this.transport = transport;

    return this;
  },

  send: function(message, callback, scope) {
    this.transport.sendToService(this.name, message, callback, scope);
  },

  receive: function(callback, scope) {
    this.transport.setListener(this.name, function(envelope) {
      callback.call(scope, envelope.from, envelope.msg);
    }, this);
  },

  subscribe: function(callback, scope, errCallback) {
    var self = this;

    self.transport.subscribe(self.name, function(err, response) {
      if(err) {
        if(errCallback) {
          errCallback.call(scope, err, response);
        }
      } else {
        self.transport.setListener(self.name, function(envelope) {
          callback.call(scope, envelope.service, envelope.msg);
        }, self);
      }
    }, self);
  },

  unsubscribe: function(callback, scope, errCallback) {
    Ext.io.messaging.transport.unsubscribe(this.name, function(err, response) {
      if(err) {
        if(errCallback) {
          errCallback.call(scope, err, response);
        }
      } else {
        callback.call(scope, err, response);
      }
    }, this);
  }
});



Ext.define('Ext.io.Messaging', {

  proxyCache : {},

  queueCache: {},

  naming: null,

  transport: null,

  rpc: null,

  pubsub: null,

  config: {
  },

  constructor: function(config) {
    this.initConfig(config);

    this.naming = Ext.create('Ext.io.Naming', config, this);
    this.transport = Ext.create('Ext.io.Transport', config, this.naming);
    this.rpc = Ext.create('Ext.io.Rpc', config, this.transport);
    this.pubsub = Ext.create('Ext.io.PubSub', config, this.transport);

    return this;
  },

  getService: function(serviceName, callback, scope) {
    var self = this;

    var service = this.proxyCache[serviceName];
    if(service) {
      callback.call(scope, service);
    } else {
      self.naming.getServiceDescriptor(serviceName, function(serviceDescriptor) {
        if(serviceDescriptor == null) {
					Ext.util.Logger.error("Unable to load service descriptor for " + serviceName);
          callback.call(scope, null);
        } else {
          if(serviceDescriptor.kind == "rpc") {
            service = Ext.create('Ext.io.Proxy', serviceName, serviceDescriptor, self.rpc);
          } else {
            service = Ext.create('Ext.io.Service', serviceName, serviceDescriptor, self.transport);
          }
          self.proxyCache[serviceName] = service;
          callback.call(scope, service);
        }
      });
    }
  },

  getQueue: function(queueName, callback, scope) {
    var self = this;

    var queue = this.queueCache[queueName];
    if(queue) {
      callback.call(scope, queue);
    } else {
      queue = Ext.create('Ext.io.Queue', queueName, this.pubsub);
      this.queueCache[queueName] = queue;
      callback.call(scope, queue);
    }
  }

});



// EOF



Ext.define('Ext.io.PubSub', {
	
  queueCallbackMap: {},

  transport: null,

  config: {

  },

  constructor: function(config, transport) {
    this.initConfig(config);
    this.transport = transport;

    return this;
  },

  handleIncoming: function(envelope) {
    var queueName = envelope.msg.queue;
    if(queueName && this.queueCallbackMap[queueName]) {
      var item = this.queueCallbackMap[queueName]
		  item.callback.call(item.scope,envelope.from, envelope.msg.data);
    } else {
      Ext.util.Logger.warn("PubSub: No callback for queueName " + queueName);
    }
  },

  publish: function(queueName, data, callbackFunction, scope) {
    this.transport.send({service:"client-pubsub", msg:{api:"publish", queue:queueName, data:data}}, callbackFunction, scope);
  },

  subscribe: function(queueName, callbackFunction, scope, errCallbackFunction) {
    var self = this;

    this.transport.setListener("client-pubsub", this.handleIncoming, this);

    this.transport.send({service:"client-pubsub", msg:{api:"subscribe", queue:queueName}}, function(err) {
      if(err) {
			  if (errCallbackFunction) {
        	errCallbackFunction.call(scope, err);
			  }
      } else {
        self.queueCallbackMap[queueName] = {callback:callbackFunction,scope:scope};
        Ext.util.Logger.info("client-pubsub: " + self.transport.getClientId() + " subscribed to " + queueName);
      }
    }, this);
  },

  unsubscribe: function(queueName, callbackFunction, scope) {
    var self = this;

    delete this.queueCallbackMap[queueName];
    this.transport.send({service:"client-pubsub", msg:{api:"unsubscribe", queue:queueName}}, function(err) {
      Ext.util.Logger.info("client-pubsub: " + self.transport.getClientId() + " unsubscribed to " + queueName);
		  if(callbackFunction){
        callbackFunction.call(scope,err);
		  }
    }, this);
  }
});


Ext.define('Ext.io.AuthStrategies', {

  statics: {
    nc: 0, // request counter used in Digest auth
    
    getRequestCounter: function() {
      return ++Ext.io.AuthStrategies.nc;
    },
    
    strategies: {
      'digest': function(realm, params, callback, scope) {
        var login = params.login;
        var password = params.password;
        
        // step 1
        // send call without digest 'response' field, causing server to return the server nonce
        realm.messaging.getService('authorization', function(authService) {
          authService.realmAuthDigest(function(result) {
            if(result.status == "success") {
              var nonce = result.value.nonce;
              var qop = "auth";
              var nc = '' + Ext.io.AuthStrategies.getRequestCounter();
              var cnonce = Ext.util.UUIDGenerator.generate();

              // http://en.wikipedia.org/wiki/Digest_access_authentication#Example_with_explanation

              // HA1 = MD5( "Mufasa:testrealm@host.com:Circle Of Life" )
              // = 939e7578ed9e3c518a452acee763bce9
              var ha1 = Ext.util.MD5(login + ":" + realm.key + ":" + password);

              var uri = realm.messaging.transport.getUrl();

              // HA2 = MD5( "GET:/dir/index.html" )
              // = 39aff3a2bab6126f332b942af96d3366
              var ha2 = Ext.util.MD5("POST:" + uri);

              /* Response = MD5( "939e7578ed9e3c518a452acee763bce9:\
                    dcd98b7102dd2f0e8b11d0f600bfb0c093:\
                    00000001:0a4f113b:auth:\
                    39aff3a2bab6126f332b942af96d3366" ) */
              var response = Ext.util.MD5(ha1 + ":" + nonce + ":" + nc +
                ":" + cnonce + ":" + qop + ":" + ha2);

              authService.realmAuthDigest(function(result) {
                if(result.status == "success") {
                  callback.call(scope, false, Ext.create('Ext.io.User', result.value._bucket, result.value._key, result.value.data, realm.messaging));
                } else {
                  callback.call(scope, true, null);
                }
              }, realm.key, login, nonce, uri, qop, nc, cnonce, response);

            } else {
              // too bad
              callback.call(scope, true, null);
            }
          }, realm.key);
        }, this);
      }     
    }
  }
});

/**
 * Queue
 */
Ext.define('Ext.io.Queue', {
    name: null,

    pubsub: null,

    constructor: function(name, pubsub) {
        this.name = name;
        this.pubsub = pubsub;

        return this;
    },

    /**
     * Publish a message to this queue.
     *
     * @param {Object} message
     * @param {Function} callback
     * @param {Object} scope
     */
    publish: function(message, callback, scope) {
        this.pubsub.publish(this.name, message, callback, scope);
    },

    /**
     * Subscribe to receive messages from this queue.
     *
     * @param {Function} callback
     * @param {String} callback.from
     * @param {Object} callback.message
     * @param {Object} scope
     * @param {Function} errCallback
     */
    subscribe: function(callback, scope, errCallback) {
        this.pubsub.subscribe(this.name, callback, scope, errCallback);
    },

    /**
     * Unsubscribe from receiving messages from this queue.
	 *
     * @param {Function} callback
     * @param {Object} scope
     */
    unsubscribe: function(callback, scope) {
        this.pubsub.unsubscribe(this.name, callback, scope);
    }
});


Ext.define('Ext.io.transports.PollingTransport', {

  mixins: {
      observable: 'Ext.util.Observable'
  },

  intervalId: null,

  config: {
    key: '',
    url: 'http://msg.sencha.io',
    clientId: '',
    piggybacking: true,
    maxEnvelopesPerReceive: 10,
    pollingDuration: 5000
  },

  constructor: function(config) {
    this.initConfig(config);
    this.mixins.observable.constructor.call(this);

    return this;
  },

  getReceiveInvoker: function() {
      var self = this;

      var callback = function(err, response) {
        self.responseHandler(err, response);
      }

      Ext.util.Logger.debug("PollingTransport receive...");

      self.ajaxRequest("/receive",
        {key: self.config.key, client_id: self.config.clientId,
          max: self.config.maxEnvelopesPerReceive},{}, callback);
  },

  start: function() {
    var self = this;
    this.intervalId = setInterval(function() { self.getReceiveInvoker()} , this.config.pollingDuration);
  },

  stop: function() {
    clearInterval(this.intervalId);
  },

  responseHandler: function(err, response) {
    var self = this;

    if(!err) {
      Ext.util.Logger.debug("PollingTransport responseHandler: " + response.responseText);
      var data = Ext.decode(response.responseText);

      if(data != null) {
        var envelopes = data.envelopes;
        var hasMore = data.hasMore;

        if(hasMore) { // if there are more messages, make another RECEIVE call immediately
          setTimeout(function() { self.getReceiveInvoker()}, 0);
        }

        if(envelopes != null) {
          for(var i = 0; i < envelopes.length; i++) {
             this.fireEvent('receive', envelopes[i]);
          }
        }
      }
    } else {
      Ext.util.Logger.debug('PollingTransport responseHandler error: ' + response.status);
    }
  },



  send: function(message, callback) {
    var self = this;

    this.ajaxRequest("/send", { key: this.config.key, max: this.config.maxEnvelopesPerReceive }, message, function(err, response) {
      callback(err, response);

      if(self.config.piggybacking) {
        self.responseHandler(err, response);
      }
    });
   },

   subscribe: function(params, callback) {
      this.ajaxRequest("/subscribe", params, {}, callback);
   },

   unsubscribe: function(params, callback) {
     this.ajaxRequest("/unsubscribe", params, {}, callback);
   },



  ajaxRequest: function(path, params, jsonData, callbackFunction) {
     if(!this.config.piggybacking) {
       params.pg = 0; // client has turned off piggybacking
     }

     Ext.Ajax.request({
 	    method: "POST",
 	    url: this.config.url + path,
 	    params: params,
 	    jsonData: jsonData,
 	    scope: this,
       success: function(response) {
 		    if(callbackFunction){
           callbackFunction(null, response);
 		    }
       },
       failure: function(response) {
 		    if(callbackFunction){
           callbackFunction('error', response);
 		    }
       }
     });
   }
});


Ext.ns('Ext.io.transports');

Ext.define('Ext.io.transports.SocketIoTransport', {
    mixins: {
        observable: 'Ext.util.Observable'
    },

    config: {
      key: '',
      url: 'http://msg.sencha.io',
      clientId: ''
    },

     constructor : function(config) {
       config = config || {};
       console.log("config", config);
       Ext.apply(this, config);
       /** @private
         * @event receive
         *  Connection recives an envelope from the server.
         * @param {Object} envelope from the server.
         */
         /** @private
          * @event error
          *  An error condition is recived via the socket connnection
          * @param {Object} error The error Message.
          */

      this.mixins.observable.constructor.call(this);

    },


    /** @private
    * connects to the server and registers to receive messages for the clientID passed
    *
    * @param {Object} clientID the id of this client.
    */
    start: function() {
      Ext.util.Logger.debug("connecting to ", this.url);
      var me = this;
      me.socket = io.connect(me.url);

      me.socket.on('receive', function(data) {
    	  me._receive(data);
    	});

      me.socket.on('connect', function () {
        Ext.util.Logger.debug("start", me.clientId);
        me.socket.emit('start', {"client_id":me.clientId});
      });
    },

    send: function(message, callback) {
      message.key = this.key;
      this._emit('send', message, callback);
    },

    subscribe: function(message, callback) {
      this._emit('subscribe', message, callback);
    },

    unsubscribe: function(message, callback) {
     this._emit('unsubscribe', message, callback);
    },

   _emit: function(channel, message, callback) {
      console.log("send socket", this.socket, message)
      if(this.socket){
        this.socket.emit(channel, message, callback);
      }
    },

    _receive: function(data){
      Ext.util.Logger.debug("_receive", data);

    	if(data.envelope) {
        this.fireEvent('receive', data.envelope);
      } else if(data.envelopes && data.envelopes.length > 0) {
         var l = data.envelopes.length;
        for(var i =0; i < l; i++ ) {
          this.fireEvent('receive', data.envelopes[i]);
        }
      }
    }
  });


// Cookie class to read a key from cookie
// https://developer.mozilla.org/en/DOM/document.cookie
Ext.define('Ext.util.Cookie', {
  statics: {
    hasItem: function (sKey) {
      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },

    getItem: function (sKey) {
      if (!sKey || !this.hasItem(sKey)) { return null; }
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    }
  }
});



Ext.define('Ext.io.Naming', {
	
  messaging: null,

  config: {
	},

  constructor: function(config, messaging) {
    this.initConfig(config);
    this.messaging = messaging;

    return this;
  },

  generateClientId: function() {
    return Ext.io.UUIDGenerator.generate();
  },

  getClientIdFromLocalStorage: function() {
    var clientId = null;

    try {
      if('localStorage' in window && window['localStorage'] !== null) {
        clientId = window.localStorage["sencha.io.client.uuid"]; // JCM ... now we use device.id
      }
    } catch(e) {
      clientId = null;
    }

    return clientId;
  },

  storeClientIdInLocalStorage: function(clientId) {
    window.localStorage["sencha.io.client.uuid"] = clientId; // JCM ... now we use device.id
  },

  getClientId: function() {
    var clientId = this.getClientIdFromLocalStorage();
    if(!clientId) {
      clientId = this.generateClientId();
      this.storeClientIdInLocalStorage(clientId);
    }
    return clientId;
  },

  getServiceDescriptor: function(serviceName, callback, scope) {
    if(serviceName == "naming-rpc") {
      callback.call(scope, {
        kind: "rpc",
        style: ["subscriber"],
        access: ["clients", "servers"],
        depends: ["messaging", "naming"],
        methods: [
					"getServiceDescriptor",
          "get", 
					"find",
					"update",
          "getSingleLink", 
					"getRelatedEntities", 
					"findRelatedEntities"
				]
      });
    } else {
      this.messaging.getService("naming-rpc", function(namingRpc) {
        namingRpc.getServiceDescriptor(
          function(result) {
            if(result.status == "success") {
              callback.call(scope, result.value);
            } else {
              callback.call(scope, null);
            }
          }, serviceName);
      }, this);
    }
  }
});



Ext.define('Ext.io.Entity', {
	
  bucket: null,

  key: null,

  data: null,

	// JCM should have a local in-memory and on-disk cache of these objects

  constructor: function(bucket, key, data, messaging) {
    this.bucket = bucket;
    this.key = key;
    this.data = data;
    this.messaging = messaging;
  },

	/**
	* Update
	* (JCM ...)
	*/
  update: function(data, callback, scope) {
    var self = this;
    var res = false;

    //update data
    for (var k in data) {
      self.data[k] = data[k];
    }

    this.messaging.getService("naming-rpc",
      function(namingRpc) {
        namingRpc.update(
          function(result) {
            if(result.status == "success") {
              callback.call(scope, false);
            } else {
              callback.call(scope, true);
            }
          }, self.bucket, self.key, self.data);
      }, this);
  },

  getSingleLink: function(bucket, key, tag, entity, callback, scope) {
    var self = this;

    this.messaging.getService("naming-rpc", function(namingRpc) {
      namingRpc.getSingleLink(function(result) {
        if(result.status == "success") {
          var linkedEntity = null;
          if(result.value != null) { // it's possible there is no linked entity
            // Note we are taking bucket from result.value, not self._bucket because the linked entity
            // might be from a different bucket
            linkedEntity = Ext.create(entity, result.value._bucket, result.value._key, result.value.data, self.messaging);
          }
          callback.call(scope, false, linkedEntity);
        } else {
          callback.call(scope, true, null);
        }
      }, self.bucket, self.key, bucket, key, tag);
    }, this);
  },

  getRelatedEntities: function(bucket, tag, entity, callback, scope) {
    var self = this;

    this.messaging.getService("naming-rpc", function(namingRpc) {
      namingRpc.getRelatedEntities(function(result) {
        if(result.status == "success") {
          var objects = [];
          for(var i = 0; i < result.value.length; i++) {
            objects.push(Ext.create(entity, result.value[i]._bucket, result.value[i]._key, result.value[i].data, self.messaging));
          }
          callback.call(scope, false, objects);
        } else {
          callback.call(scope, true, null);
        }
      }, self.bucket, self.key, bucket, tag);
    }, this);
  },

  findRelatedEntities: function(bucket, key, tag, query, entity, callback, scope) {
    var self = this;

    this.messaging.getService("naming-rpc", function(namingRpc) {
      namingRpc.findRelatedEntities(function(result) {
        if(result.status == "success") {
          var objects = [];
          for(var i = 0; i < result.value.length; i++) {
            objects.push(Ext.create(entity, result.value[i]._bucket, result.value[i]._key, result.value[i].data, self.messaging));
          }
          callback.call(scope, false, objects);
        } else {
          callback.call(scope, true, null);
        }
      }, self.bucket, self.key, bucket, key, tag, query);
    }, this);
  }

});



Ext.define('Ext.io.Entities', {
	
  CLASS_MAP: {
    'Realms': 'Ext.io.Group',
    'Apps': 'Ext.io.App',
    'Users': 'Ext.io.User',
    'Instances': 'Ext.io.Device'
  },

  bucket: null,

	// JCM should have a local in-memory and on-disk cache of these objects

  constructor: function(bucket, messaging) {
    this.bucket = bucket;
    this.messaging = messaging;
  },

  get: function(key, callback, scope) {
    var self = this;

    this.messaging.getService("naming-rpc", function(namingRpc) {
      namingRpc.get(function(result) {
        if(result.status == "success") {
          callback.call(scope, false, Ext.create(self.CLASS_MAP[self.bucket], self.bucket, result.value._key, result.value.data, self.messaging));
        } else {
          callback.call(scope, true, null);
        }
      }, self.bucket, key);
    }, this);
  },

  find: function(query, start, rows, callback, scope) {
    var self = this;

    this.messaging.getService("naming-rpc", function(namingRpc) {
      namingRpc.find(function(result) {
        if(result.status == "success") {
          var objects = [];
          for(var i = 0; i < result.value.length; i++) {
            objects.push(Ext.create(self.CLASS_MAP[self.bucket], self.bucket, result.value[i]._key, result.value[i].data, self.messaging));
          }
          callback.call(scope, false, objects);
        } else {
          callback.call(scope, true, null);
        }
      }, self.bucket, query, start, rows);
    }, this);
  }

});


/**
 * {@img diagram.003.png Class Diagram}
 */
Ext.define('Ext.io.App', {
    extend: 'Ext.io.Entity',

    statics: {
        /**
         * Get the current App object.
         *
         * @param {Function} callback Returns an Ext.io.App
         * @param {Ext.io.App} callback.app
         * @param {Object} scope
         */
        getCurrent: function(callback, scope) {
            var appId = Ext.util.Cookie.getItem("app.id");
            if (!appId) {
                callback.call(scope, {
                    message: "No active apps."
                },
                null);
            }
            new Ext.io.Entities("Apps", Ext.io.messaging).get(appId, callback, scope);
        }
    },

    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
    },

    /**
     * Get the Group associated with this App, if any.
     *
     * @param {Function} callback Return an Ext.io.Group, if there is one.
     * @param {Ext.io.Group} callback.group
     * @param {Object} scope
     */
    getGroup: function(callback, scope) {
        this.getSingleLink("Realms", null, null, "Ext.io.Group", callback, scope);
    },

    /**
     * Get a Queue.
     *
     * @param {Object} config
     * @param {Function} callback Return an Ext.io.Queue
     * @param {Ext.io.Queue} callback.queue
     * @param {Object} scope
     */
    getQueue: function(config, callback, scope) {
        this.messaging.getQueue(config.name, callback, scope);
    },

    /**
     * Get a Store.
     *
     * @param {Object} config
     * @param {Function} callback Return an Ext.data.Store
     * @param {Ext.Store} callback.store
     * @param {Object} scope
     */
    getStore: function(config, callback, scope) {
        console.log("JCM return Ext.Store");
    },

    /**
     * Find devices that match a query.
     *
     * @param {Object} query
     * @param {Function} callback Returns matching devices.
     * @param {Ext.io.Device[]} callback.devices An array of devices.
     */
    findDevices: function(query, callback, scope) {
        this.findRelatedEntities("Apps", this.key, null, query, "Ext.io.Device",
        function(err, devices) {
            if (err) {
                callback.call(scope, err, null);
            } else {
                callback.call(scope, null, devices);
            }
        });
    },

    /**
     * Get a list of the databases stored locally,
     * associated with this App
     *
     * @returns Array - an array of Ext.data.Store.
     */
    getLocalStores: function() {
        var databasesStore = new Ext.data.Store({
            model: 'Sencha.ClientDatabaseDirectory.Model',
            storeId: 'Ext.data.SyncDatabaseDirectory.store'
        });
        databasesStore.filterBy(function(record) {
            return record.get('local');
        });
        return databasesStore.getRange();
    },

    /**
     * Get a list of the databases stored remotely,
     * associated with this App.
     *
     * @returns Array - an array of Ext.data.Store.
     */
    getRemoteStores: function() {
        var databasesStore = new Ext.data.Store({
            model: 'Sencha.ClientDatabaseDirectory.Model',
            storeId: 'Ext.data.SyncDatabaseDirectory.store'
        });
        databasesStore.filterBy(function(record) {
            return record.get('remote');
        });
        return databasesStore.getRange();
    },

});


/**
 * {@img diagram.003.png Class Diagram}
 */
Ext.define('Ext.io.Device', {
    extend: 'Ext.io.Entity',

    statics: {
        /**
         * Get the current Device object.
         *
         * @param {Function} callback Returns an Ext.io.Device
         * @param {Ext.io.Device} callback.device
         * @param {Object} scope
         */
        getCurrent: function(callback, scope) {
            var deviceId = Ext.util.Cookie.getItem("device.id");
            if (!deviceId) {
                callback.call(scope, {
                    message: "Device ID not found"
                },
                null);
            } else {
                Ext.create('Ext.io.Entities', "Instances", Ext.io.messaging).get(deviceId, callback, scope);
            }
        }
    },

    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
    },

    /**
     * Get the App associated with this Device.
     *
     * @param {Function} callback Returns an Ext.io.App
     * @param {Ext.io.App} callback.app
     * @param {Object} scope
     */
    getApp: function(callback, scope) {
        this.getSingleLink("Versions", this.data.version, null, "Ext.io.Entity", function(err, version) {
            if (err) {
                callback(err, null);
            } else {
                version.getSingleLink("Apps", null, "Ext.io.App", callback, scope);
            }
        },
        this);
    },

    /**
     * Get the User associated with this Device, if any.
     *
     * @param {Function} callback Returns an Ext.io.User, if any
     * @param {Ext.io.User} callback.user
     * @param {Object} scope
     */
    getUser: function(callback, scope) {
        this.getSingleLink("Users", null, null, "Ext.io.User", callback, scope);
    },

    /**
     * Send a message to this Device.
     *
     * @param {Object} message
     * @param {Function} callback
     * @param {Object} scope
     */
    send: function(message, callback, scope) {
        this.messaging.transport.sendToClient(this.key, message, callback, scope);
    },

    /**
     * Receive messages for this Device.
     *
     * @param {Function} callback
     * @param {String} callback.from
     * @param {Object} callback.message
     * @param {Object} scope
     */
    receive: function(callback, scope) {
        this.messaging.transport.setListener("courier", function(envelope) {
            callback.call(scope, envelope.from, envelope.msg);
        },
        this);
    }

    // Ext.io.Device.getStore(config); // => Ext.Store
});

/**
 * {@img diagram.003.png Class Diagram}
 */
Ext.define('Ext.io.User', {
    extend: 'Ext.io.Entity',

    statics: {
        /**
	     * Get the current User object, if a User has authenticated themselves.
	     *
	     * @params {Function} callback Returns an Ext.io.User, if any.
	     * @param {Ext.io.User} callback.user
	     * @param {Object} scope
	     */
        getCurrent: function(callback, scope) {
            var userId = Ext.util.Cookie.getItem("user.id");
            if (!userId) {
                callback.call(scope, {
                    message: "User not logged in."
                }, null);
            } else {
                Ext.create('Ext.io.Entities', "Users", Ext.io.messaging).get(userId, callback, scope);
            }
        },

        /**
	     * Get a list of the databases stored locally,
	     * associated with this User.
	     *
	     * @returns Array - an array of database names.
	     */
        getLocalStores: function() {
            var databasesStore = new Ext.data.Store({
                model: 'Sencha.ClientDatabaseDirectory.Model',
                storeId: 'Ext.data.SyncDatabaseDirectory.store'
            });
            databasesStore.filterBy(function(record) {
                return record.get('local');
            });
            return databasesStore.getRange();
        }
    },

    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
        this.userQueueName = bucket + '/' + key;
        // name of the user queue (inbox)
    },

    /**
     * Get all clients that belong to this user
     *
     * @param {Function} callback Returns an array of Ext.io.Device objects
     * @param {Object} scope
     */
    getDevices: function(callback, scope) {
        this.getRelatedEntities("Instances", null, "Ext.io.Device", callback, scope);
    },

    /**
     * Get the user Group associated with this User.
     *
     * @param {Function} callback Returns an Ext.io.Group
     */
    getGroup: function(callback, scope) {
        this.getSingleLink("Realms", this.data.realm, null, "Ext.io.Group", callback, scope);
    },

    /**
     * Get a Store.
     *
     * @param {Object} config
     * @param {Function} callback
     * @param {Ext.Store} callback.store
     * @param {Object} scope
     */
    getStore: function(config, callback, scope) {
        console.log("JCM return Ext.Store");
    },

    /**
     * Send a message to this User.
     *
     * @param {Object} message
     * @param {Function} callback
     * @param {Object} scope
     */
    send: function(message, callback, scope) {
        this.messaging.pubsub.publish(this.userQueueName, message, callback, scope);
    },

    /**
     * Receive messages for this User.
     *
     * @param {Function} callback
     * @param {String} callback.from
     * @param {Object} callback.message
     * @param {Object} scope
     * @param {Function} errCallback
     */
    receive: function(callback, scope, errCallback) {
        this.messaging.pubsub.subscribe(this.userQueueName, callback, scope, errCallback);
    }
});

/**
 * {@img diagram.003.png Class Diagram}
 */
Ext.define('Ext.io.Group', {
    extend: 'Ext.io.Entity',

    statics: {

        /**
	     * Get the current user Group object.
	     *
	     * @param {Function} callback Returns an Ext.io.Group
	     * @param {Ext.io.Group} callback.group
	     * @param {Object} scope
	     */
        getCurrent: function(callback, scope) {
            var groupId = Ext.util.Cookie.getItem("group.id");
            if (!groupId) {
                callback.call(scope, {
                    message: "Group not found"
                }, null);
            } else {
                Ext.create('Ext.io.Entities', "Realms", Ext.io.messaging).get(groupId, callback, scope);
            }
        }
    },

    constructor: function(bucket, key, data, messaging) {
        this.superclass.constructor.call(this, bucket, key, data, messaging);
    },

    /**
     * Find Users that match a query.
     *
     * @param {String} query
     * @param {Function} callback Returns an array of Ext.io.User
     * @param {Ext.io.User[]} callback.users
     * @param {Object} scope
     */
    findUsers: function(query, callback, scope) {
        this.findRelatedEntities("Users", this.key, null, query, 'Ext.io.User', callback, scope);
    },

    /**
     * Register a new User.
     *
     * @param {Object} registration params (e.g. {login:'abc', password:'def', email:'abc@example.org'})
     * @param {Function} callback Returns an Ext.io.User, if registration succeeds
     * @param {Ext.io.User} callback.user
     * @param {Object} scope
     */
    register: function(params, callback, scope) {
        var self = this;

        this.messaging.getService('authorization',
        function(authService) {
            authService.realmRegister(function(result) {
                if (result.status == "success") {
                    callback.call(scope, false, Ext.create('Ext.io.User', result.value._bucket, result.value._key, result.value.data, self.messaging));
                } else {
                    callback.call(scope, true, null);
                }
            }, self.key, params);
        },
        this);
    },

    /**
     * Authenticate an existing User.
     *
     * @param {Object} authentication params (e.g. {login:'abc', password:'def'})
     * @param {Function} callback Returns an Ext.io.User, if authentication succeeds
     * @param {Ext.io.User} callback.user
     * @param {Object} scope
     */
    authenticate: function(params, callback, scope) {
        Ext.io.AuthStrategies.strategies['digest'](this, params, callback, scope);
    },

    /**
     *  Get the App associated with this user Group.
     *
     * @param {Function} callback Returns an Ext.io.App
     * @param {Ext.io.App} callback.app
     * @param {Object} scope
     */
    getApp: function(callback, scope) {
        Ext.io.App.getCurrent(callback, scope);
    }
});




Ext.data.SyncStore = Ext.extend(Object, {
	
	asynchronous: false,
	
	constructor: function(config,callback,scope) {
		Ext.data.utilities.check('SyncStore', 'constructor', 'config', config, ['database_name','localStorageProxy']);
		this.local= config.localStorageProxy;
		var hasRecords= this.local.getIds().length>0
		this.readConfig('definition',function(data) {
			if(hasRecords && !data){
				console.log('Error: Tried to use an existing localstore,',config.id,', as a syncstore.');
				callback.call(scope,{r:'error'});
			}else{
				// ok
				this.readConfig('index',function(data) {
					this.index= data;
					this.readConfig('csiv',function(data) {
						this.csiv= data ? new Ext.data.CSIV().decode(data) : undefined;
						if(!this.index || !this.csiv){
							this.reindex(function(){
								callback.call(scope,{r:'ok',store:this});
							},this);
						}else{
							callback.call(scope,{r:'ok',store:this});
						}
					},this);
				},this);
			}
		},this);
  },

	// crud

  create: function(records, callback, scope) {
		//console.log('SyncStore - create -',records[0].getId(),Ext.encode(records[0].data))	
		var operation= Ext.create('Ext.data.Operation', {
        records: records
    });
		this.local.create(operation,callback,scope);
  },

  read: function(oid, callback, scope) {
		//console.log('SyncStore - read -',oid)
		var operation= Ext.create('Ext.data.Operation', {
			  action: 'read',
        id: oid
    });
		this.local.read(operation,function(operation2) {
			var record;
			if (operation2.resultSet.count==1) {
				record= operation2.resultSet.records[0];
				Ext.apply(record,Ext.data.SyncModel);
				//console.log('SyncStore - read -',oid,'=>',Ext.encode(record.data));
			} else {
				//console.log('SyncStore - read -',oid,'=> not_found')
			}
			callback.call(scope,record);
		},this);
  },

  update: function(records, callback, scope) {
		//console.log('SyncStore - update',Ext.encode(records))
		var operation= Ext.create('Ext.data.Operation', {
				action: 'update',
        records: records
    });
		this.local.update(operation,callback,scope);
  },

  destroy: function(oid, callback, scope) {
		//console.log('SyncStore - destroy -',oid)
		if(Ext.isArray(oid)){
			Ext.data.array.forEachAsync(oid,function(oid,next_callback,next_scope){
				this.destroy(oid,next_callback,next_scope);
			},this,callback,scope);
		}else{
			var data= {};
			data[Ext.data.SyncModel.OID]= oid;
			var records= [new this.local.model(data)];
			var operation= Ext.create('Ext.data.Operation', {
					action: 'destroy',
	        records: records
	    });
			this.local.destroy(operation,callback,scope);
		}
  },

	clear: function(callback, scope) {
		this.local.clear();
		this.index= {};
		this.removeConfig('index',function(){
			this.removeConfig('csiv',callback,scope);
		},this);
	},

  setModel: function(model, setOnStore) {
		//console.log('SyncStore - setModel',model)
		this.model= model;
		this.local.setModel(model, setOnStore);
  },

	// config

	readConfig: function(oid, callback, scope) {
		var item= this.local.getStorageObject().getItem(this.local.id+"-"+oid);
		var data= item ? Ext.decode(item) : {};
		callback.call(scope,data)
	},
	
	writeConfig: function(oid, data, callback, scope) {
		//console.log('write',this.local.id+"-"+oid,Ext.encode(data));
		this.local.getStorageObject().setItem(this.local.id+"-"+oid,Ext.encode(data));
		callback.call(scope,data);
	},
	
	removeConfig: function(oid, callback, scope) {
		//console.log('remove',this.local.id+"-"+oid);
		this.local.getStorageObject().removeItem(this.local.id+"-"+oid);
		callback.call(scope);
	},

	// id to oid index 

	updateIDIndex: function(id, oid, callback, scope) {
		if (!callback) { throw "ERROR - SyncStore - updateIDIndex - no callback provided" }
		//console.log('SyncStore - indexUpdate -',id,'=>',oid)
		this.index[id]= oid;
		this.writeConfig('index',this.index,callback,scope);
	},

	lookupIDIndex: function(id, callback, scope) {
		if (!callback) { throw "ERROR - SyncStore - lookupIDIndex - no callback provided" }
		var oid= this.index[id];
		//console.log('SyncStore - indexLookup -',id,'=>',oid)
		callback.call(scope,oid)
	},
	
	getIndex: function(callback,scope) {
		callback.call(scope,this.index);
	},

	setIndex: function(index,callback,scope) {
		if(index){
			this.index= index;
			this.writeConfig('index',this.index,callback,scope);
		}else{
			callback.call(scope);
		}
	},
	
	// cs index
	
	getCSIndex: function(callback,scope) {
		//console.log('getCSIndex local',this.csiv)
		callback.call(scope,this.csiv);
	},

	setCSIndex: function(csiv,callback,scope) {
		if(csiv){
			this.csiv= csiv;
			//console.log('setCSIndex local',this.csiv)
			this.writeConfig('csiv',this.csiv.encode(),callback,scope);
		}else{
			callback.call(scope);
		}
	},
	
	oidsFrom: function(csv){
		var r= this.csiv.oidsFrom(csv);
		//console.log('oidsFrom',csv.to_s(),'=>',r)
		// JCM get list of records changed since the csv
		return r;
	},
	
	reindex: function(callback,scope){
		this.index= {};
		this.csiv= new Ext.data.CSIV();
		this.forEachRecord(function(record){
			var oid= record.data[Ext.data.SyncModel.OID];
			var state= record.data[Ext.data.SyncModel.STATE];
			this.forEachCS(state,function(cs){
				this.csiv.add(cs,oid);
			},this);
			this.index[record.data['id']]= oid; // JCM should be this.idProperty, but we don't have the model here...
		},this,callback,scope);
	},
	
	forEachCS: function(state,callback,scope) {
		for(name in state) {
			if (state.hasOwnProperty(name)) {
				var next_state= state[name];
				if (typeof next_state==='string'){
					callback.call(scope,new Ext.data.CS(next_state));
				}else{
					callback.call(scope,new Ext.data.CS(next_state[0]));
					this.forEachCS(callback,scope,next_state[1]); // [cs,state]
				}
			}
		}
	},
	
	readValue: function(key, callback, scope) {
		var value= this.local.getStorageObject().getItem(key);
		callback.call(scope,value);
	},
	
	writeValue: function(key, value, callback, scope) {
		this.local.getStorageObject().setItem(key,value);
		callback.call(scope);
	},
	
	forEachRecord: function(each_callback, each_scope, done_callback, done_scope){
		var operation= Ext.create('Ext.data.Operation', {
			  action: 'read',
    });
		this.local.read(operation,function(operation){
			var records= operation.resultSet.records;
			var i, l= records.length;
			for(i=0;i<l;i++){
				each_callback.call(each_scope,records[i]);
			}
		},this);
		done_callback.call(done_scope);
	},

});



Ext.data.ClientDatabaseDirectoryModel= Ext.define("Sencha.ClientDatabaseDirectory.Model", {extend: "Ext.data.Model",
  fields: [
		{name:'key',type:'string'},
		{name:'database_name',type:'string'},
		{name:'system_name',type:'string'},
		{name:'generation',type:'int'},
		{name:'replica_number',type:'int'},
		{name:'local',type:'boolean'},
		{name:'remote',type:'boolean'},		
  ],
	idProperty: 'database_name',
	proxy: {
		id: 'sencha-io-database-directory',
		type: 'localstorage'
  }
});

Ext.data.ClientDatabaseDirectory= Ext.extend(Object, {

	store: undefined,

	constructor: function(config) {
		this.store = new Ext.data.Store({
				model: 'Sencha.ClientDatabaseDirectory.Model',
		});
		this.store.load();
  },
  
  getDatabaseDefinition: function(database_name) {
		var record= this.store.findRecord('database_name',database_name);
		return record ? new Ext.data.DatabaseDefinition(record.data) : undefined;
  },
  
  putDatabaseDefinition: function(definition,callback,scope) {
		var existingRecord= this.store.findRecord('database_name',definition.database_name);
		if(existingRecord){
			existingRecord.set(definition);
			existingRecord.save();
		}else{
			this.store.add(definition);
		}
		this.store.sync();
  },

});





Ext.data.SyncProxy = Ext.extend(Ext.data.Proxy, {
	
	definition: undefined,
	csv: undefined,
	generator: undefined,
	model: undefined,
	store: undefined,
	idProperty: undefined,
	idDefaultProperty: undefined,
	
	// JCM constructor should not be async, delay until first operation
	
	constructor: function(config,callback,scope) {
		//
		Ext.data.utilities.check('SyncProxy', 'constructor', 'config', config, ['store','database_name','key']);
		//
		this.store= config.store;
		//
		// Get or Create a System Name.
		//
		this.getSystemName(function(system_name){
			config.system_name= system_name;
			//
			// Load Configuration
			//
			Ext.data.utilities.apply(this,[
				'readConfig_DatabaseDefinition',
				'readConfig_CSV',
				'readConfig_Generator'],[config],function(){
				//console.log("SyncProxy - Opened database '"+config.key+"/"+config.database_name+"/"+config.datastore_name+"'")
				callback.call(scope,{r:'ok',proxy:this});
			},this);
		},this);
  },

  create: function(operation, callback, scope) {
		new Ext.data.Transaction(this,function(t){
			operation.records.forEach(function(record) {
				record.setCreateState(t);
				// if there's no user id, then use the oid.
				if (record.get(this.idProperty)===this.idPropertyDefaultValue) {
					var p= record.getPair(Ext.data.SyncModel.OID);
					record.data[this.idProperty]= p.v;
				}
			},this)
			var records= this.encodeRecords(operation.records);
			t.create(records);
			this.indexCreatedRecords(t,operation.records); // JCM t should do this?
			t.commit(function(){
				operation.records.forEach(function(record) {
					record.needsAdd= false;
					record.phantom= false;
				},this)
        operation.setSuccessful();
        operation.setCompleted();
				this.doCallback(callback,scope,operation);
			},this);
		},this);
  },

  read: function(operation, callback, scope) {
	
		function makeResultSet(operation,records) {
			records= this.decodeRecords(records);
			records= Ext.data.array.select(records,function(record){
				return record.isNotDestroyed() && !record.phantom;
			},this);
      operation.resultSet = Ext.create('Ext.data.ResultSet', {
          records: records,
          total  : records.length,
          loaded : true
      });
      operation.setSuccessful();
      operation.setCompleted();
		};
		
		if (operation.id!==undefined) {
			this.store.lookupIDIndex(operation.id,function(oid) {
				// JCM if the id is not in the index, then it doesn't exist, so we can return now...
				this.store.read(oid,function(record) {
					makeResultSet.call(this,operation,[record]);
					this.doCallback(callback,scope,operation);
				},this);
			},this);
		} else if (operation[Ext.data.SyncModel.OID]!==undefined) {
				this.store.read(operation[Ext.data.SyncModel.OID],function(record) {
					makeResultSet.call(this,operation,[record]);
					this.doCallback(callback,scope,operation);
				},this);
		} else {
			var records= [];
			this.forEachRecord(false,function(record,next_callback,next_scope) { // include_system_records==false
				records.push(record);
				next_callback.call(next_scope);
			},this,function(){
				makeResultSet.call(this,operation,records);
				this.doCallback(callback,scope,operation);
			},this);
		}
  },

  update: function(operation, callback, scope) {
		new Ext.data.Transaction(this,function(t){
			operation.records.forEach(function(record) {
				record.setUpdateState(t);
			},this);
			var records= this.encodeRecords(operation.records);
			t.update(records);
			t.commit(function(){
        operation.setSuccessful();
        operation.setCompleted();
				this.doCallback(callback,scope,operation);
			},this);
		},this);
  },

  destroy: function(operation, callback, scope) {
		new Ext.data.Transaction(this,function(t){
			var records= [];
			Ext.data.array.forEachAsync(operation.records,function(record,next_callback,next_scope){
				record.setDestroyState(t);
				var oid= record.oid();
				if (!oid) {
					var id= record.data[this.idProperty];
					t.lookupIDIndex(id,function(oid) {
						// JCM if the id is not in the index, then it doesn't exist, so we don't need to try deleting it.
						if (oid) {
							record.data[Ext.data.SyncModel.OID]= oid;
							records.push(record);
						}
						next_callback.call(next_scope);
					},this);
				} else {
					records.push(record);
					next_callback.call(next_scope);
				}
			},this,function(){
				records= this.encodeRecords(records);
				t.update(records);
				this.indexDestroyedRecords(t,operation.records);
				t.commit(function(){
	        operation.setSuccessful();
	        operation.setCompleted();
					operation.action= 'destroy';
					this.doCallback(callback,scope,operation);
				},this);
			},this);
		},this);
  },

	clear: function(callback,scope) {
		this.store.clear(function(){
			this.store.removeConfig('definition',function(){
				this.store.removeConfig('csv',function(){
					this.store.removeConfig('generator',callback,scope);
				},this);
			},this);
		},this);
	},

	reset: function(callback,scope) {
		this.store.clear(function(){
			this.store.removeConfig('csv',function(){
				readConfig_CSV({},callback,scope);
			},this);
		},this);
	},

  setModel: function(model, setOnStore) {
		this.model= model;
		this.idProperty= this.model.prototype.idProperty;
		var fields = this.model.prototype.fields.items,
	      length = fields.length,
	      field, i;
	  for (i = 0; i < length; i++) {
	      field = fields[i];
				if (field.name===this.idProperty) {
					this.idPropertyDefaultValue= field.defaultValue;
				}
	  }
		this.definition.set({idProperty:this.idProperty,idPropertyDefaultValue:this.idPropertyDefaultValue},function(){},this);
		// extend the user's model with the replication state data,
		Ext.apply(model.prototype, Ext.data.SyncModel);
		// and create a local storage model, based on the user's model.
		this.storageModel= model.prototype.createReplStorageModel(this.modelName); // JCM shouldn't need to pass the name in
		this.store.setModel(this.storageModel, setOnStore);
  },

	replicaNumber: function() {
		return this.generator.r;
	},

	addReplicaNumbers: function(csv,callback,scope) {
		this.csv.addReplicaNumbers(csv);
		this.writeConfig_CSV(this.csv,callback,scope);
	},

	setReplicaNumber: function(new_replica_number,callback,scope) {
		if (!callback) { throw "ERROR - SyncProxy - setReplicaNumber - no callback provided." }
  	var old_replica_number= this.replicaNumber();
		console.log('SyncProxy.setReplicaNumber from',old_replica_number,'to',new_replica_number)
    this.changeReplicaNumber(old_replica_number,new_replica_number,function(){
			this.definition.setReplicaNumber(new_replica_number,function(){
		  	this.csv.changeReplicaNumber(old_replica_number,new_replica_number);
			  this.generator.setReplicaNumber(new_replica_number);
				this.writeConfig_Generator(this.generator,function(){
					this.writeConfig_CSV(this.csv,callback,scope);
				},this);
			},this);
		},this);
	},

  changeReplicaNumber: function(old_replica_number,new_replica_number,callback,scope) {
		console.log('SyncProxy.changeReplicaNumber from',old_replica_number,'to',new_replica_number)
		console.log(this.csv.to_s());
		if (!callback) { throw "ERROR - SyncProxy - changeReplicaNumber - no callback provided." }
		this.forEachRecord(false,function(record,next_callback,next_scope) { // include_system_records==false
			var old_oid= record.oid();
			if (record.changeReplicaNumber(old_replica_number,new_replica_number)) {
				var records= this.encodeRecords([record])
				this.store.create(records,function(){
					this.store.destroy(old_oid,next_callback,next_scope);
				},this);
			} else {
				next_callback.call(next_scope);
			}
		},this,function(){
			this.store.reindex(callback,scope);
		},this);
	},

	getUpdates: function(csv,callback,scope) {
	  csv.addReplicaNumbers(this.csv);
		var dominated= this.csv.dominated(csv);
		var l= dominated.length;
		console.log('getUpdates from',csv.to_s(),' dominated=',Ext.encode(dominated));
		if(l==0){
	    callback.call(scope,new Ext.data.Updates(),undefined);
		}else{
			this.start= new Date().getTime()
			//
			// Use the CS index to get a list of records that have changed since csv
			//
			var oids= this.store.oidsFrom(csv);
			console.log('getUpdates oids',Ext.encode(oids));
			this.getUpdates_candidateList(csv,oids,function(updates,update_csv){
				this.getUpdates_done(csv,updates,callback,scope);
			},this);
			//
			// Otherwise, we have to perform a full scan of the database.
			//
			//this.getUpdates_fullScan(csv,function(updates,update_csv){
			//	this.getUpdates_done(csv,updates,callback,scope);
			//},this);
		}
  },

	getUpdates_done: function(csv,updates,callback,scope) {
		//
		// This sequence of updates will bring the client up to the point
		// described by the csv received plus the csv here. Note that there
		// could be no updates, but that the csv could have still been brought
		// forward. 
		//
		var update_csv= new Ext.data.CSV();
		update_csv.addCSV(this.csv.dominant(csv)); // we only need to send the difference in the csv's
		var stop= new Date().getTime();
		var took= stop-this.start;
		if(took>10){
			console.log('getUpdates',updates.length,'updates took',took,'ms')
		}
		callback.call(scope,new Ext.data.Updates(updates),update_csv)
	},

	getUpdates_fullScan: function(csv,callback,scope) {
		// JCM full scan - expensive
		// JCM might also be too big... perhaps there should be a limit on the number
		// JCM of updates that can be collected...
		// JCM could also exhaust the stack
		// JCM could have a fixed sized list, discarding newest to add older
		// JCM could have a full update protocol as well as an incremental protocol
		var updates= [];
		//
		// JCM if the store is async, then do async
		// JCM if the store is sync, then just iterate
		// JCM if(this.store.asynchronous){
		//
		this.forEachRecord(false,function(record,next_callback,next_scope) {  // include_system_records==false
			updates= updates.concat(record.getUpdates(csv));
			next_callback.call(next_scope);
		},this,function(){
	    callback.call(scope,updates);
		},this);
  },

	getUpdates_candidateList: function(csv,oids,callback,scope) {
		var updates= [];
		this.forEachRecordFromOids(oids,function(record,next_callback,next_scope){
			updates= updates.concat(record.getUpdates(csv));
			next_callback.call(next_scope);
		},this,function(){
			callback.call(scope,updates);
		},this);
	},

	putUpdates: function(updates,updates_csv,callback,scope) {
		//console.log('putUpdates',updates.length(),'updates')
		if(updates.isEmpty()){
			new Ext.data.Transaction(this,function(t){
				t.updateCSV(updates_csv);
				t.commit(function(){
					callback.call(scope,{r:'ok'});
				},this);
			},this);
		}else{
			//
			// JCM Also, on the client, hogging the cpu can cause the UI to feel
			// JCM unresponsive to the user. So, we chunk the updates and process
			// JCM each in turn, yielding the cpu between them.  
			//
			// JCM var chunks= updates.chunks(10);
			// JCM Ext.data.array.forEachYielding(chunks,function(chunk,next_callback,next_scope){
			//
			this.start= new Date().getTime();
			new Ext.data.Transaction(this,function(t){
				var computed_csv= new Ext.data.CSV();
				if(this.store.asynchronous){
					updates.forEachAsync(function(update,next_callback,next_scope) {
						this.applyUpdate(t,update,function(){
							computed_csv.addCS(update.c);
							next_callback.call(next_scope);
						},this);
					},this,function(){
						this.putUpdates_done(t,updates,updates_csv,computed_csv,callback,scope);
					},this);
				}else{
					updates.forEach(function(update) {
						this.applyUpdate(t,update,function(){},this);
						computed_csv.addCS(update.c);
					},this);
					this.putUpdates_done(t,updates,updates_csv,computed_csv,callback,scope);
				}
			},this);
		}
	},
	
	putUpdates_done: function(t,updates,updates_csv,computed_csv,callback,scope) {
		//
		// This sequence of updates will bring the client up to the point
		// described by the csv received plus the csv here. Note that there
		// could be no updates, but that the csv could have still been brought
		// forward. 
		//
		// We also compute a new csv from all the updates received, just in
		// case the peer didn't send one, or sent a bad one.
		//
		// Make sure to bump forward our clock, just in case one of our peers 
		// has run ahead.
		//
		t.updateCSV(computed_csv);
		t.updateCSV(updates_csv);
		t.commit(function(createdRecords,updatedRecords){
			// discard the created, then deleted
			createdRecords= Ext.data.array.select(createdRecords,Ext.data.SyncModel.isNotDestroyed);
			// move the updated, then deleted
			var x= Ext.data.array.partition(updatedRecords,Ext.data.SyncModel.isDestroyed);
			var destroyedRecords= x[0];
			updatedRecords= x[1];
			createdRecords= this.decodeRecords(createdRecords);
			updatedRecords= this.decodeRecords(updatedRecords);
			destroyedRecords= this.decodeRecords(destroyedRecords);
			var stop= new Date().getTime();
			var took= stop-this.start;
			if(took>10){
				console.log('putUpdates took',took,'ms')
			}
			callback.call(scope,{
				r: 'ok',
				created: createdRecords,
				updated: updatedRecords,
				removed: destroyedRecords
			});
		},this);
	},
	
  applyUpdate: function(t,update,callback,scope,last_ref) { // Attribute Value - Conflict Detection and Resolution
		//if (last_ref) {
		//	console.log('ref ==> ',this.us(update));
		//} else {
		//	console.log('applyUpdate',this.us(update));
		//}
		t.read(update.i,function(record) {
			if (record) {
				var ref= record.ref();
				if (ref && update.p[0]!='_') { // JCM this is a bit sneaky
					if (update.i===ref) {
						console.log("Error - applyUpdate - Infinite loop following reference. ",ref);
					} else {
						update.i= ref;
						this.applyUpdate(t,update,callback,scope,ref);
						// no callback!
					}
				} else {
					if (update.p===this.idProperty) {
						this.applyUpdateToRecordForUniqueID(t,record,update,callback,scope);
					} else {
						this.applyUpdateToRecord(t,record,update);
						callback.call(scope);
					}
				}
			} else {
				this.applyUpdateCreatingNewRecord(t,update);
				callback.call(scope);
			}
		},this);
  },

	applyUpdateCreatingNewRecord: function(t,update) {
		var record;
		// no record with that oid is in the local store...
		if (update.p===Ext.data.SyncModel.OID) {
			// ...which is ok, because the update is intending to create it
			record= this.createNewRecord(t,update.v,update.c);
			//console.log('applyUpdate',Ext.encode(record.data),'( create )');
		} else {
			// ...which is not ok, because given the strict ordering of updates
			// by change stamp the update creating the object must be sent first.
			// But, let's be forgiving and create the record to receive the update. 
			//console.log("Warning - Update received for unknown record "+update.i,this.us(update));
			record= this.createNewRecord(t,update.i,update.i);
			record.setPair(t,update.p,update.v,update.c);
		}
		t.create([record]);
	},
	
	applyUpdateToRecordForUniqueID: function(t,record,update,callback,scope) {
		// update is to the id, for which we maintain uniqueness
		if (record.data[update.p]===update.v) {
			// re-asserting same value for the id
			this.applyUpdateToRecordForUniqueId(t,record,update);
			callback.call(scope);
		} else {
			// different value for the id, so check if a record already exists with that value
			t.lookupIDIndex(update.v,function(existing_record_oid){
				if (existing_record_oid) {
					this.readById(t,update.v,existing_record_oid,function(existing_record) {
						this.applyUpdateToRecordForUniqueId(t,record,update);
						var r_cs= new Ext.data.CS(record.oid());
						var er_cs= new Ext.data.CS(existing_record.oid());
						var r_before, r_after;
						if (r_cs.greaterThan(er_cs)) {
							// the record being updated is more recent then the existing record
							//console.log(this.us(update),'existing record is older');
							r_before= existing_record;
							r_after= record;
						} else {
							// the existing record is more recent than the record being updated
							//console.log(this.us(update),'existing record is newer');
							r_before= record;
							r_after= existing_record;
						}
						this.resolveUniqueIDConflict(t,r_before,r_after);
						t.updateIDIndex(update.v,r_before.oid());
						callback.call(scope);
					},this);
				} else {
					// the new id value did not exist at the time of the update
					this.applyUpdateToRecordForUniqueId(t,record,update);
					callback.call(scope)
				}
			},this);
		}
	},

	applyUpdatesToRecord: function(t,record,updates) {
		var l= updates.length;
		for(var i=0;i<l;i++){
			this.applyUpdateToRecord(t,record,updates[i]);
		}
	},

	applyUpdateToRecordForUniqueId: function(t,record,update) {
		var value_before= record.data[update.p];
		var value_after= update.v;
		if(this.applyUpdateToRecord(t,record,update)){
			t.updateIDIndex(value_after,record.oid());
			if (value_before) {
				t.updateIDIndex(value_before,undefined);
			}
		}
	},

	applyUpdateToRecord: function(t,record,update) {
		if (record.putUpdate(t,update)) {
			//console.log(this.us(update),'accepted')		
			t.update([record])
			return true;
		} else {
			//console.log(this.us(update),'rejected')
			return false;
		}
	},

	readById: function(t,id,oid,callback,scope) { // JCM move into applyUpdateToUniqueID?
		t.lookupIDIndex(id,function(oid){
			t.read(oid,function(record) {
				if (record) {
					callback.call(scope,record);
				} else {
					console.log('ERROR - SyncProxy - applyUpdateToUniqueID - ID Index refers to an non-existant object:',id,'=>',oid,'(This should not be possible.)');
				}
			},this);
		},this);
	},

	resolveUniqueIDConflict: function(t,r1,r2) { // JCM move into applyUpdateToUniqueID?
		var updates= this.updatesForMergeRecords(r1,r2);
		this.applyUpdatesToRecord(t,r1,updates);
		var updates= this.updatesForMakeReference(t,r2,r1);
		this.applyUpdatesToRecord(t,r2,updates);
	},
	
	updatesForMergeRecords: function(r1,r2) { // merge r2 into r1 // JCM move into applyUpdateToUniqueID?
		// r1 receives all updates from r2
		var csv= r1.getCSV();
		var updates1= r2.getUpdates(csv);
		var updates2= [];
		var r1_oid= r1.oid();
		updates1.forEach(function(update) {
			if (update.p!==this.idProperty && update.p!==Ext.data.SyncModel.OID) {
				update.i= r1_oid;
				updates2.push(update);
			}
		},this);
		//console.log('updatesForMergeRecords - csv',csv);
		//console.log('updatesForMergeRecords - r1',r1.data);
		//console.log('updatesForMergeRecords - r2',r2.data);
		//console.log('updatesForMergeRecords - updates',updates2);
		return updates2;
	},

	updatesForMakeReference: function(t,r1,r2) { // JCM move into applyUpdateToUniqueID?
		if (r1.oid()===r2.oid()) { 
			console.log('updatesForMakeReference',r1.data,r2.data);
			throw "Error - SyncProxy - Tried to create reference to self."
		}
		var cs1= t.generateChangeStamp();
		var cs2= t.generateChangeStamp();
		var updates= [{
			i: r1.oid(),
			p: Ext.data.SyncModel.REF,
			v: r2.oid(),
			c: cs1
		},{
			i: r1.oid(),
			p: Ext.data.SyncModel.TOMBSTONE,
			v: cs2.to_s(),
			c: cs2
		}];
		//console.log('updatesForMakeReference',updates);
		return updates; 
	},
	
	createNewRecord: function(t,oid,cs) {
		var record= new this.storageModel();
		record.phantom= false;
		Ext.apply(record,Ext.data.SyncModel);
		record.setPair(t,Ext.data.SyncModel.OID,oid,cs);
		return record;
	},
	
	indexCreatedRecords: function(t, records) {
		records.forEach(function(record){
			var record_id= record.data[this.idProperty];
			if (record_id) {
				t.updateIDIndex(record_id,record.data[Ext.data.SyncModel.OID]);
			}
		},this);
	},

	indexDestroyedRecords: function(t, records) {
		records.forEach(function(record){
			var record_id= record.data[this.idProperty];
			if (record_id) {
				t.updateIDIndex(record_id,undefined);
			}
		},this);
	},

	equals: function(x,callback,scope) { // for testing
		if (this.csv.equals(x.csv)) {
			this.hasSameRecords(x,function(r){
				if (r) {
					x.hasSameRecords(this,callback,scope);
				} else {
					callback.call(scope,r)
				}
			},this);
		} else {
			callback.call(scope,false);
		}
	},

	hasSameRecords: function(x,callback,scope) { // for testing
		this.forEachRecord(false,function(r1,next_callback,next_scope){ // include_system_records==false
			this.store.read(r1.oid(),function(r2) {
				if (r2) {
					r= r1.equals(r2);
					if (r) {
						next_callback.call(next_scope);
					} else {
						console.log('hasSameRecords - false - ',this.replicaNumber(),x.replicaNumber())
						callback.call(scope,false);
					}
				} else {
					console.log('hasSameRecords - false - ',this.replicaNumber(),x.replicaNumber())
					callback.call(scope,false);
				}
			},this);
		},this,function(){
			callback.call(scope,true);
		},this);
	},

	console_log: function(text,callback,scope) { // for testing
		console.log('==== ',text);
		this.forEachRecord(false,function(r1,next_callback,next_scope){  // include_system_records==false
			console.log(Ext.encode(r1.data));
			next_callback.call(next_scope);
		},this,function(){
			console.log('----');
			this.store.getIndex(function(index){
				console.log(index);
				this.store.getCSIndex(function(csiv){
					console.log(csiv.to_s());
					console.log('====');
					callback.call(scope);
				},this);
			},this);
		},this);
	},
		
	forEachRecord: function(include_system_records, each_callback, each_scope, done_callback, done_scope) {
		var Model= this.model;
		var start= new Date().getTime();
		if(this.store.asynchronous){
			this.store.forEachRecord(function(record,next_callback,next_scope){
				if(include_system_records || (!include_system_records && !this.isSystemRecord(record))){
					each_callback.call(each_scope,new Model(record.data),next_callback,next_scope); 
				}else{
					next_callback.call(next_scope);
				}
			},this,function(){
				var stop= new Date().getTime();
				var took= stop-start;
				if(took>10){
					console.log('SyncProxy.forEachRecord took',stop-start,'ms')
				}
				done_callback.call(done_scope)
			},this);
		}else{
			this.store.forEachRecord(function(record){
				if(include_system_records || (!include_system_records && !this.isSystemRecord(record))){
					each_callback.call(each_scope,new Model(record.data),function(){}); 
				}
			},this,done_callback,done_scope);
			var stop= new Date().getTime();
			var took= stop-start;
			if(took>10){
				console.log('SyncProxy.forEachRecord took',stop-start,'ms')
			}
		}
	},
	
	forEachRecordFromOids: function(oids, each_callback, each_scope, done_callback, done_scope) {
		if(this.store.asynchronous){
			Ext.data.array.forEachAsync(oids,function(oid,next_callback,next_scope){
				this.store.read(oid,function(record){
					each_callback.call(each_scope,record,next_callback,next_scope);
				},this);
			},this,done_callback,done_scope);
		}else{
			var i, l= oids.length;
			for(i=0;i<l;i++){
				this.store.read(oids[i],function(record){
					each_callback.call(each_scope,record,function(){});
				},this);
			}
			done_callback.call(done_scope);
		}
	},
	
	isSystemRecord: function(record) {
		var model_name= record.data[Ext.data.SyncModel.MODEL];
		return model_name!==undefined && model_name!=='' && model_name.indexOf("Ext.data.",0)===0;
	},

	encodeRecords: function(records) {
		var Model= this.storageModel;
		return Ext.data.array.collect(records,function(){ 
			var record= new Model(this.data);
			record.internalId= this.internalId;
			record.phantom= false;
			return record; 
		});
	},

	decodeRecords: function(records) {
		var Model= this.model;
		return Ext.data.array.collect(records,function(){
			var record= new Model(this.data);
			record.internalId= this.internalId;
			record.phantom= false;
			return record; 
		});
	},
	
	getSystemName: function(callback,scope){
		this.store.readValue('sencha.io.client.uuid',function(system_name){
			if(system_name){
				callback.call(scope,system_name);
			}else{
				var system_name= Ext.util.UUIDGenerator.generate();
				console.log('Created new Sencha Sync System Name:',system_name)
				this.store.writeValue('sencha.io.client.uuid',system_name,function(){
					callback.call(scope,system_name);
				},this);
			}
		},this);
	},

	readConfig_DatabaseDefinition: function(config,callback,scope) {
		var default_data= {
			key: config.key,
			system_name: config.system_name,
			generation: (config.definition ? config.definition.generation : 0) || 0,
			replica_number: (config.definition ? config.definition.replica_number : 0) || 0
		};
		var overwrite_data= {
			database_name: config.database_name, 
			replica_type: config.replica_type
		};
		this.readConfig(Ext.data.DatabaseDefinition,'definition',default_data,overwrite_data,function(r,definition) {
			this.definition= definition;
			callback.call(scope,r,definition);
		},this);
	},

	readConfig_Generator: function(config,callback,scope) {
		var overwrite_data= {
			r: this.definition.replica_number,
			clock: config.clock
		};
		this.readConfig(Ext.data.CSGenerator,'generator',{},overwrite_data,function(r,generator){
			this.generator= generator;
			callback.call(scope,r,generator);
		},this); 
	},

	readConfig_CSV: function(config,callback,scope) {
		this.readConfig(Ext.data.CSV,'csv',{},{},function(r,csv){
			this.csv= csv;
			callback.call(scope,r,csv);
		},this); 
	},
	
	writeConfig_Generator: function(generator,callback,scope) {
		if(generator){
			this.store.writeConfig('generator',generator.as_data(),callback,scope);
		}else{
			callback.call(scope);
		}
	},

	writeConfig_CSV: function(csv,callback,scope) {
		if(csv){
			//console.log('writeConfig_CSV',csv.as_data())
			this.store.writeConfig('csv',csv.as_data(),callback,scope);
		}else{
			callback.call(scope);
		}
	},
				
	writeConfig: function(id, object, callback, scope) {
		this.store.writeConfig(id,object.as_data(),function(data){
			callback.call(scope)
		},this);
	},

	readConfig: function(Klass, id, default_data, overwrite_data, callback, scope) {
		this.store.readConfig(id,function(data) {
			var r= (data===undefined) ? 'created' : 'ok';
			if (default_data!==undefined) {
				if (data===undefined) {
					data= default_data;
				} else {
					for(var name in default_data) {
						if (data[name]===undefined) {
							data[name]= default_data[name];
							changed= true;
						}
					}
				}
			}
			if (overwrite_data!==undefined) {
				if (data===undefined) {
					data= overwrite_data;
				} else {
					for(var name in overwrite_data) {
						if (data[name]!==overwrite_data[name]) {
							data[name]= overwrite_data[name];
							changed= true;
						}
					}
				}
			}
			var me= this;
			data.config_id= id;
			data.write_fn= function(object, write_callback, write_scope) { 
				me.writeConfig.call(me,id,object,write_callback,write_scope);
			};
			callback.call(scope,r,new Klass(data));
		},this);
	},

	doCallback: function(callback, scope, operation) {
    if (typeof callback == 'function') {
			callback.call(scope || this, operation);
    }
	},

	us: function(u) {
		var p= Ext.isArray(u.p) ? u.p.join() : u.p;
		var v= u.v;
		switch (typeof u.v) {
			case 'object':
				v= Ext.encode(u.v);
		}
		return '('+u.i+' . '+p+' = \''+v+'\' @ '+u.c.to_s()+')';
	},

});



Ext.data.SyncDatabaseDirectory= Ext.create('Ext.data.ClientDatabaseDirectory');

Ext.define('Ext.data.proxy.SyncStorage', {
    extend: 'Ext.data.proxy.Client',
    alias: 'proxy.syncstorage',
	
	proxyLock: true, // prevent sync() re-entry
	
	constructor: function(config,callback,scope) {
		//
		// Sync Storage Proxy (combines local and remote storage proxies)
		//
		// JCM ensure that the url ends with a '/'
		config.url= config.url || "http://sync.sencha.io/";
		Ext.data.utilities.check('SyncStorageProxy', 'constructor', 'config', config, ['id','url','key']);
		config.database_name= config.id;
		config.datastore_name= 'data';
		//
		this.callParent([config]);
		//
		// Check the Database Directory
		//   The store might be known about, but was cleared.
		//
		config.definition= Ext.data.SyncDatabaseDirectory.getDatabaseDefinition(config.database_name);
		//
		// Local Storage Proxy
		//
		config.localStorageProxy= config.localStorageProxy || Ext.create('proxy.localstorage',{
			id: config.database_name
		});
		this.localProxy= config.localStorageProxy;
		//
		var f= function(config){
			this.localStore= config.store;
			//
			// Sync Protocol
			//
			this.protocol= new Ext.data.Protocol(config);
			//
			// Remote Storage Proxy
			//
			new Ext.data.SyncProxy(config,function(r){
				if(r.r==='ok'){
					this.remoteProxy= r.proxy;
					Ext.data.utilities.delegate(this,r.proxy,['create','read','update','destroy','setModel']);
					//
					this.setDatabaseDefinitionLocal(true); // we have a local copy of the data now
					//
					this.proxyLock= false; // we're open for business
				}
				if(callback){
					callback.call(scope,{r:'ok',proxy:this});
				}
			},this);
		};
		//
		if(config.store){
			f.call(this,config);
		}else{
			new Ext.data.SyncStore(config,function(r){
				if(r.r==='ok'){
					config.store= r.store;
					f.call(this,config);
				}else{
					if(callback){
						callback.call(scope,r);
					}
				}
			},this);
		}
  },

  sync: function(store,callback,scope) {
		//
		// 'store', is the store that's calling this sync function
		// 
		if(this.protocol) {
			store.fireEvent('beforesync');
			if(this.proxyLock){
				console.log('Warning: Tried to access proxy, whilst another operation was in progress.');
			} else {
				this.proxyLock= true;
				try {
					// JCM use a timer to fire a 'syncing' event with progress information
					//store.fireEvent('syncing');
					this.do_sync(store,function(r){
						// JCM fire 'aftersync' event with progress information
						this.proxyLock= false;
						store.fireEvent('aftersync');
						if(callback){
							callback.call(scope,r);
						}
					},this);
				} catch (e) {
					this.proxyLock= false;
					console.log(e)
					console.log(e.stack)
					throw e
				}
			}
		} else {
			console.log('Error: Tried to access proxy, but it has been cleared.');
		}
	},
	
	do_sync: function(store,callback,scope) {
		var changes= Ext.data.Store.superclass.sync.call(store);
		if(changes.added.length>0) {
			store.fireEvent('add', this, changes.added, 0);
		}
		store.removed= []; // clear the list of records to be deleted
		this.protocol.sync(this.remoteProxy,function(r){
			console.log('sync',r.r);
			switch(r.r){
			case 'ok':
				this.setDatabaseDefinitionRemote(true); // the server knows about the database now
				break;	
			case 'again':
				this.updateDatabaseDefinition(); // the replica_number or generation might have changed
				this.do_sync(store,callback,scope); // call sync again, to actually do the sync
				break;	
			}
			var createdRecords= r.created;
			var updatedRecords= r.updated;
			var removedRecords= r.removed;
			if(createdRecords && createdRecords.length>0) {
				store.data.addAll(createdRecords);
        store.fireEvent('add', this, createdRecords, 0);
			}
			if(updatedRecords && updatedRecords.length>0) {
				store.data.addAll(updatedRecords);
        store.fireEvent('update', this, updatedRecords);
			}
			if(removedRecords && removedRecords.length>0) {
				var l= removedRecords.length;
				for(var i=0;i<l;i++){
					var id= removedRecords[i].getId();
					store.data.removeAt(store.data.findIndexBy(function(i){ // slower, but will match
						return i.getId()===id;
					}));
				}
        store.fireEvent('remove', this, removedRecords);
			}
			callback.call(scope,{r:r.r})
		},this);
	},
	
	clear: function() {
		if(this.remoteProxy) {
			this.proxyLock= true;
			this.setDatabaseDefinitionLocal(false); // we no longer have a local copy of the data
			this.remoteProxy.clear(function(){
				delete this.localProxy;
				delete this.remoteProxy;
				delete this.protocol;
				// JCM In Ext this store object can be used after a clear...
			},this);
		}else{
			console.log('Error: Tried to clear a proxy, but it has been cleared.');
			// JCM send back an error?
		}
	},
	
	setDatabaseDefinitionLocal: function(flag){
		this.remoteProxy.definition.local= flag;
		Ext.data.SyncDatabaseDirectory.putDatabaseDefinition(this.remoteProxy.definition);
	},
	
	setDatabaseDefinitionRemote: function(flag){
		this.remoteProxy.definition.remote= flag;
		Ext.data.SyncDatabaseDirectory.putDatabaseDefinition(this.remoteProxy.definition);
	},

	updateDatabaseDefinition: function(){
		Ext.data.SyncDatabaseDirectory.putDatabaseDefinition(this.remoteProxy.definition);
	},

});


Ext.data.array= {
	
	select: function(a,fn,scope) {
		var r= [];
		if (a) {
			a.forEach(function(i) {
				if (i!==undefined && fn.call(scope||i,i)) { r.push(i) } 
			})
		}
		return r;
	},
	
	partition: function(a,fn,scope) {
		var r1= [], r2= [];
		if (a) {
			var j, l= a.length;
			for(var i= 0;i<l;i++) {
				j= a[i];
				if (j!==undefined) {
					if (fn.call(scope||j,j)) {
						r1.push(j)
					} else {
						r2.push(j)
					}
				}
			}
		}
		return [r1,r2];
	},

	index: function(a,fn,scope) {
		if (a) {
			var j, l= a.length;
			for(var i= 0;i<l;i++) {
				j= a[i];
				if(fn.call(scope||j,j)) { return i }
			}
		}
	},

	collect: function(a,fn,scope) {
		var r= [];
		if (a) {
			a.forEach(function(i){ if (i!==undefined) { r.push(fn.call(scope||i,i)) }})
		}
		return r;
	},
	
	includes: function(a,v) {
		if (a) {
			var l= a.length;
			for(var i= 0;i<l;i++) {
				if(a[i]===v) { return true }
			}
		}
		return false;
	},

	remove: function(a,v) {
		var r= [];
		if (a) {
			var j, l= a.length;
			for(var i= 0;i<l;i++) {
				j= a[i];
				if(j!==v) { r.push(j) }
			}
		}
		return r;
	},

	any: function(a,fn,scope) {
		var j, l= a.length;
		for(var i= 0;i<l;i++) {
			j= a[i];
			if(fn.call(scope||j,j)) { return true }
		}
		return false
	},

	all: function(a,fn,scope) {
		var j, l= a.length;
		for(var i= 0;i<l;i++) {
			var j= a[i];
			if(!fn.call(scope||j,j)) { return false }
		}
		return true
	},
	
	unique: function(a) {
		var o = {}, i, l = a.length, r = [];
		for(i=0; i<l;i+=1) o[a[i]] = a[i];
		for(i in o) r.push(o[i]);
		return r;
	},

	minus: function(a,b) {
		var o = {}, i, l = a.length, r = [];
		for(i=0; i<l;i+=1) o[a[i]] = a[i];
		l= b.length;
		for(i=0; i<l;i+=1) delete o[b[i]];
		for(i in o) r.push(o[i]);
		return r;
	},
	
	forEachAsync: function(a,each_fn,each_scope,done_fn,done_scope) {
		if (!each_fn) { throw "ERROR - Ext.data.Array - forEachAsync - no 'each' function provided" }
		if (!done_fn) { throw "ERROR - Ext.data.Array - forEachAsync - no 'done' function provided" }
		var i= 0;
		var l= a.length;
		var f= function f() {
			if (i<l) {
				var j= a[i];
				var scope= each_scope||j;
				i= i+1;
				each_fn.call(scope,j,f,scope);
			} else {
				done_fn.call(done_scope);
			}
		};
		f();
	},

	forEachYielding: function(a,each_fn,each_scope,done_fn,done_scope) {
		var i= 0;
		var l= a.length;
		function f() {
			if (i<l) {
				each_fn.call(each_scope,a[i],function(){
					i= i+1;
					setTimeout(f,20); // ms
				},this);
			} else {
				done_fn.call(done_scope);
			}
		};
		f();
	}	
};




Ext.data.utilities= {

	delegate: function(from_instance, to_instance, methods) {
		if (to_instance===undefined) { throw "Error - Tried to delegate '"+methods+"' to undefined instance." }
		methods.forEach(function(method){
			var to_method= to_instance[method];
			if (to_method===undefined) { throw "Error - Tried to delegate undefined method '"+method+"' to "+to_instance }
			from_instance[method]= function() {
				return to_method.apply(to_instance, arguments);
			}
		})
	},
	
	apply: function(instance,methods,a,done_callback,done_scope) {
		var first= true;
		Ext.data.array.forEachAsync(methods,function(method,next_callback,next_scope){
			if (first) {
				a.push(next_callback);
				a.push(next_scope);
				first= false;
			}
			instance[method].apply(instance,a);
		},instance,done_callback,done_scope);
	},

	copy: function(from_instance,to_instance,properties) {
		var changed= false;
		properties.forEach(function(property){
			var from_v= from_instance[property]
			var to_v= to_instance[property]
			if (from_v!==undefined && from_v!==to_v) {
				to_instance[property]= from_v;
				changed= true;
			}
		});
		return changed;
	},

	copyIfUndefined: function(from_instance,to_instance,properties) {
		var changed= false;
		properties.forEach(function(property){
			var from_v= from_instance[property]
			var to_v= to_instance[property]
			if (from_v!==undefined && to_v===undefined) {
				to_instance[property]= from_v;
				changed= true;
			}
		});
		return changed;
	},

	check: function(class_name, method_name, instance_name, instance, properties) {
		if (instance===undefined) {
			var message= "Error - "+class_name+"."+method_name+" - "+instance_name+" not provided.";
			console.log(message);
			throw message;
		} else {
			properties.forEach(function(property) {
				var value= instance[property];
				if (value===undefined) {
					var message= "Error - "+class_name+"."+method_name+" - "+instance_name+"."+property+" not provided.";
					console.log(message);
					throw message;
				}
			});
		}
	},

	minus: function(a,b) { // minus(a,b) is all the name value pairs in a that are not in b 
		var n, r= {};
		for(n in a) {
			if (a.hasOwnProperty(n)) {
				if (b[n]===undefined) {
					r[n]= a[n];
				}
			}
		}
		return r;
	},
	
	intersection: function(a,b) { 
		var n, r= {};
		for(n in a) {
			if (a.hasOwnProperty(n)) {
				if (b[n]!==undefined) {
					r[n]= a[n];
				}
			}
		}
		return r;
	},
		
};



Ext.data.Clock = Ext.extend(Object, {
	
	constructor: function() {
		this.epoch= new Date(2011,0,1);
	},
	
  now: function() {
		return this.ms_to_s(new Date().getTime()-this.epoch);	
	},
	
	ms_to_s: function(ms) {
		return Math.floor(ms/1000);
	},
 
});

Ext.data.Config = Ext.extend(Object, {

	config_id: undefined,
	write_fn: undefined,
	_id: undefined,
	
	constructor: function(config) {
		this.config_id= config.config_id;
		this.write_fn= config.write_fn;
		this._id= config._id;
	},
	
	set: function(data) {
		this._id= data._id;
	},
	
	to_s: function(indent) {
		return this.config_id+": "+Ext.encode(this);
	},

	as_data: function(data) {
		data.id= this.config_id;
		data._id= this._id
		data[Ext.data.SyncModel.OID]= data[Ext.data.SyncModel.OID] || this.config_id;
		return data;
	},
	
	writeAndCallback: function(changed,callback,scope) {
		if (changed) {
			this.write(function(){
				if (callback) {
					callback.call(scope,this);
				}
			},this);
		} else {
			if (callback) {
				callback.call(scope,this);
			}
		}
	},
	
	write: function(callback,scope) {
		if (this.write_fn) {
			this.write_fn(this,function(){
				if (callback) {
					callback.call(scope,this);
				}
			},this);
		} else {
			if (callback) {
				callback.call(scope,this)
			}
		}
	},
	
});



Ext.data.CS = Ext.extend(Object, { // Change Stamp

	r: 0, // replica_number
	t: 0, // time, in seconds since the epoch
	s: 0, // sequence number

	constructor: function(config) {
		this.set(config);
	},
	
	set: function(x) {
		if (typeof x === 'string' || x instanceof String) {
			this.from_s(x)
		} else if (typeof x === 'object') {
			this.r= x.r||0;
			this.t= x.t||0;
			this.s= x.s||0;
		}
	},

	changeReplicaNumber: function(old_replica_number,new_replica_number) {
		if (this.r==old_replica_number) {
			this.r= new_replica_number;
			return true;
		}
		return false;
	},

 	greaterThan: function(x) { return this.compare(x)>0; },
 	lessThan: function(x) { return this.compare(x)<0; },
	equals: function(x) { return this.compare(x)===0 },
	compare: function(x) {
		var r= this.t-x.t
		if (r==0) {
			r= this.s-x.s;
			if (r==0) {
				r= this.r-x.r
			}
		}
		return r;
	},
	
	cs_regex: /(\d+)-(\d+)-?(\d+)?/,
	
	from_s: function(t) {
    var m= t.match(this.cs_regex);
		if (m && m.length>0) {
	    this.r= parseInt(m[1])
	    this.t= parseInt(m[2])
	    this.s= m[3] ? parseInt(m[3]) : 0
		} else {
			throw "Error - CS - Bad change stamp '"+t+"'."
		}
		return this;
	},
	
	to_s: function() {
		return this.r+"-"+this.t+(this.s>0 ? "-"+this.s : "");		
	}

});


Ext.data.CSGenerator = Ext.extend(Object, {

	r: undefined, // replica_number
	t: undefined, // time, in seconds since epoch
	s: undefined, // sequence number
	
	clock: undefined,
	local_offset: undefined,
	global_offset: undefined,
	
	constructor: function(config) {
		this.set(config);
	},
	
	set: function(data) {
		if(data){
			this.clock= data.clock || new Ext.data.Clock();
			this.r= data.r;
		  this.t= data.t || this.clock.now();
		  this.s= data.s || -1; // so that the next tick gets us to 0
		  this.local_offset= data.local_offset || 0;
		  this.global_offset= data.global_offset || 0;
		}
	},
	
  generateChangeStamp: function() { // the next change stamp
    var current_time= this.clock.now();
    this.update_local_offset(current_time);
    this.s+= 1;
    if (this.s>255) { // JCM This is totally arbitrary, and it's hard coded too....
      this.t= current_time;
      this.local_offset+= 1;
      this.s= 0;
    }
		return new Ext.data.CS({r:this.r,t:this.global_time(),s:this.s});
  },

  seenCSV: function(csv) { // a change stamp vector we just received
		return this.seenChangeStamp(csv.maxChangeStamp());
	},

  seenChangeStamp: function(cs) { // a change stamp we just received
		var changed= false;
		if(cs){
	    var current_time= this.clock.now();
			if (current_time>this.t) {
		    changed= this.update_local_offset(current_time);
			}
	    changed= changed||this.update_global_offset(cs);
		}
		return changed;
  },
  
  setReplicaNumber: function(replica_number) {
		var changed= this.r!==replica_number;
		this.r= replica_number;
		return changed;
  },

	// private
  
  update_local_offset: function(current_time) {
		var changed= false;
    var delta= current_time-this.t;
    if (delta>0) { // local clock moved forwards
      var local_time= this.global_time();
      this.t= current_time;
      if (delta>this.local_offset) {
        this.local_offset= 0;
      } else {
        this.local_offset-= delta;
      }
      var local_time_after= this.global_time();
			if (local_time_after>local_time) {
      	this.s= -1;
			}
			changed= true;
    } else if (delta<0) { // local clock moved backwards
      // JCM if delta is too big, then complain
      this.t= current_time;
      this.local_offset+= -delta;
			changed= true;
    }
		return changed;
	},
	
	update_global_offset: function(remote_cs) {
		var changed= false;
    var local_cs= new Ext.data.CS({r:this.r,t:this.global_time(),s:this.s+1})
    var local_t= local_cs.t;
    var local_s= local_cs.s;
    var remote_t= remote_cs.t;
    var remote_s= remote_cs.s;
    if (remote_t==local_t && remote_s>=local_s) {
		  this.s= remote_s;
			changed= true;
    } else if (remote_t>local_t) {
      var delta= remote_t-local_t;
  		if (delta>0) { // remote clock moved forwards
  		  // JCM guard against moving too far forward
      	this.global_offset+= delta;
    		this.s= remote_s;
				changed= true;
      }
  	}
		return changed; 
  },

  global_time: function() {
    return this.t+this.local_offset+this.global_offset;
	},
	
	as_data: function() {
		var data= {
			r: this.r,
			t: this.t,
			s: this.s,
			local_offset: this.local_offset,
			global_offset: this.global_offset,
			id: 'generator'
		};
		data[Ext.data.SyncModel.MODEL]= 'Ext.data.CSGenerator';
		return data;
	},
	
});


Ext.data.CSV = Ext.extend(Object, {

	v: undefined, // change stamps

	constructor: function(config) {
		this.v= {};
		if (config===undefined){
		}else if (config instanceof Ext.data.CSV) {
			this.addX(config);
		}else{
			this.addX(config.v);
		}
	},
	
	get: function(x) {
		if (x instanceof Ext.data.CS) {
			return this.v[x.r];
		}else{
			return this.v[x];
		}
	},
	
	setReplicaNumber: function(replica_number) {
		this.addReplicaNumbers([replica_number]);
	},
	
	addReplicaNumbers: function(x) {
		var t= [];
		if (x instanceof Array) {
			t= Ext.data.array.collect(x,function(r){return this.addX(new Ext.data.CS({r:r}))},this);
		} else if (x instanceof Ext.data.CSV) {
			t= Ext.data.array.collect(x,function(cs){return this.addX(new Ext.data.CS({r:cs.r}))},this);
		}
		return Ext.data.array.includes(t,true);
	},

	addX: function(x) { // CSV, CS, '1-2-3', [x]
		var changed= false;
		if (x===undefined){
		} else if (x instanceof Ext.data.CSV || x instanceof Array) {
			var t= Ext.data.array.collect(x,this.addX,this);
			changed= Ext.data.array.includes(t,true);
		} else if (x instanceof Ext.data.CS) {
			changed= this.addCS(x);
		} else if (typeof x == 'string' || x instanceof String) {
			changed= this.addX(new Ext.data.CS(x));
		}
		return changed;
	},

	addCS: function(x) {
		var changed= false;
		if (x!==undefined){
			var r= x.r;
			var t= this.v[r];
			if (!t || x.greaterThan(t)) {
			  this.v[r]= new Ext.data.CS({r:x.r,t:x.t,s:x.s})
				changed= true;
			}
		}
		return changed;
	},

	addCSV: function(x) {
		var changed= false;
		if (x!==undefined){
			var t= Ext.data.array.collect(x,this.addCS,this);
			changed= Ext.data.array.includes(t,true);
		}
		return changed;
	},

	changeReplicaNumber: function(old_replica_number,new_replica_number) {
		var t= this.v[old_replica_number];
		var changed= false;
		if (t) {
			t.r= new_replica_number;
			this.v[old_replica_number]= undefined;
			this.v[new_replica_number]= t;
			changed= true;
		}
		return changed;
	},

	isEmpty: function() {
		for(var i in this.v) {
			return false;
		}
		return true;
	},
		
	maxChangeStamp: function() {
		if (!this.isEmpty()) {
			var r= new Ext.data.CS();
			this.forEach(function(cs){
				var t= new Ext.data.CS({t:cs.t,s:cs.s});
				r= (t.greaterThan(r) ? cs : r);
			},this)
			return r;
		}
	},

	minChangeStamp: function() {
		if (!this.isEmpty()) {
			var r;
			this.forEach(function(cs){
				if(cs.t!=0 || cs.s!=0){
					var t= new Ext.data.CS({t:cs.t,s:cs.s});
					r= (!r || t.lessThan(r) ? cs : r);
				}
			},this)
			return r;
		}
	},
	
	intersect: function(x) {
		this.v= Ext.data.array.select(x,function(i){ return this.v[i.r]!==undefined },this);
	},

	dominates: function(x) { // true if this csv dominates x
		return Ext.data.array.any(this.compare(x),function(i){ return i>0 });
	},
	
	dominated: function(x) { // returns a list of the dominated cs in x
		return Ext.data.array.select(x,function(i){ return this.compare(i)>0 },this);
	},

	dominant: function(x) { // returns a list of the dominant cs in this
		return Ext.data.array.select(this,function(i){ return x.compare(i)<0 },this);
	},
	
	equals: function(x) {
		return Ext.data.array.all(this.compare(x),function(i){ return i===0 });
	},
	
	compare: function(x) {
		if (x instanceof Ext.data.CS) {
			var cs= this.get(x);
			var cs2= x;
			return [cs ? cs.compare(cs2) : -1];
		} else if (x instanceof Ext.data.CSV) {		
			var r= [];
			for(i in this.v) {
				var cs= this.v[i];
				if (cs instanceof Ext.data.CS) {
					var cs2= x.get(cs);
					r.push(cs2 ? cs.compare(cs2) : 1);
				}
			}
			return r;
		} else {
			throw "Error - CSV - compare - Unknown type: "+(typeof x)+": "+x
		}
		return [-1];
	},
	
	forEach: function(fn,scope) {
		for(var i in this.v){
			if(this.v.hasOwnProperty(i)){
				fn.call(scope||this,this.v[i]);
			}
		}
	},
	
	encode: function() { // for the wire
		return Ext.data.array.collect(this,function(){
			// JCM can we safely ignore replicas with CS of 0... except for the highest known replica number...
			return this.to_s();
		}).join('.');
	},
	
	decode: function(x) { // from the wire
		if(x){
			this.addX(x.split('.'));
		}
		return this;
	},
	
	to_s: function(indent) {
		var r= "CSV: "
		this.forEach(function(cs){
			r+= cs.to_s()+", "
		},this)
		return r;
	},

	as_data: function() { // for the disk
		var data= {
			v: Ext.data.array.collect(this,function(){return this.to_s();}),
			id: 'csv'
		};
		data[Ext.data.SyncModel.MODEL]= 'Ext.data.CSV';
		return data;
	},
		
});

Ext.data.CSI = Ext.extend(Object, { // Change Stamp Index
	
	map: {}, // t => list of oids
	v: [],   // t, in order
	dirty: false, // if v needs rebuild
	
	constructor: function() {
		this.clear();
	},
	
	clear: function() {
		this.map= {};
		this.v= [];
		this.dirty= false;
	},
	
	add: function(t,oid) {
		var l= this.map[t];
		if(l){
			l[oid]= true;
		}else{
			var l= {};
			l[oid]= true;
			this.map[t]= l;
			this.dirty= true;
		}
	},

	remove: function(t,oid) {
		var l= this.map[t];
		if(l){
			delete l[oid];
			this.dirty= true;
		}
	},

	oidsFrom: function(t) {
		var r= [];
		var keys= this.keysFrom(t);
		var l= keys.length;
		for(var i=0;i<l;i++){
			r= r.concat(this.oToA(this.map[keys[i]]));
		}
		return r;
	},
	
	keysFrom: function(t) {
		var r= [];
		var keys= this.keys();
		var l= keys.length;
		for(var i=0;i<l;i++){ // JCM should be a binary search, or reverse iteration
			var j= keys[i];
			if(j>=t){ // '=' because we only index by t, there could be updates with the same t and greater s
				r.push(j);
			}
		}
		return r;
	},

	//searchArray = function(needle, haystack, case_insensitive) {
	//	if (typeof(haystack) === 'undefined' || !haystack.length) return -1;
  //
	//	var high = haystack.length - 1;
	//	var low = 0;
	//	case_insensitive = (typeof(case_insensitive) === 'undefined' || case_insensitive) ? true:false;
	//	needle = (case_insensitive) ? needle.toLowerCase():needle;
  //
	//	while (low <= high) {
	//		mid = parseInt((low + high) / 2)
	//		element = (case_insensitive) ? haystack[mid].toLowerCase():haystack[mid];
	//		if (element > needle) {
	//			high = mid - 1;
	//		} else if (element < needle) {
	//			low = mid + 1;
	//		} else {
	//			return mid;
	//		}
	//	}
  //
	//	return -1;
	//};
	
	encode: function() {
		var r= {};
		for(var i in this.map){
			if (this.map.hasOwnProperty(i) && !this.isEmpty(this.map[i])) {
				r[i]= this.oToA(this.map[i]);
			}
		}
		return r;
	},
	
	decode: function(v) {
		this.clear();
		for(var i in v){
			if (v.hasOwnProperty(i)) {
				var oids= v[i];
				for(var j=0;j<oids.length;j++){
					this.add(i,oids[j])
				}
			}
		}
		return this;
	},
	
	keys: function() {
		if(this.dirty){
			this.v= [];
			for(var i in this.map){
				if (this.map.hasOwnProperty(i) && !this.isEmpty(this.map[i])) {
					this.v.push(i);
				}
			}
			this.dirty= false; 
		}
		return this.v;
	},
	
	isEmpty: function(o) {
		for(var i in o) {
			return false;
		}
		return true;
	},
	
	oToA: function(o){
		var r= [];
		if(o){
			for(var i in o){
				if (o.hasOwnProperty(i)) {
					r.push(i);
				}
			}
		}
		return r;
	},
	
	to_s: function(){
		var r= "";
		for(var i in this.map){
			if (this.map.hasOwnProperty(i) && !this.isEmpty(this.map[i])) {
				r= r+i+':'+this.oToA(this.map[i]);
			}
			r= r+", ";csiv
		}
		return r;
	},
	
	
});


Ext.data.CSIV = Ext.extend(Object, { // Change Stamp Index Vector

	v: {},
	
	constructor: function() {
		this.v= {};
	},
	
	oidsFrom: function(csv) {
		var r= [];
		csv.forEach(function(cs){
			var csi= this.v[cs.r]
			if(csi){
				r= r.concat(csi.oidsFrom(cs.t));
			}
		},this);
		r= Ext.data.array.unique(r);
		return r;
	},
	
	add: function(cs,oid) {
		var csi= this.v[cs.r];
		if(csi===undefined){
			csi= this.v[cs.r]= new Ext.data.CSI();
		}
		csi.add(cs.t,oid);
	},

	addArray: function(a,oid) {
		var l= a.length;
		for(var i=0;i<l;i++){
			var cs= a[i];
			if(cs){
				this.add(a[i],oid);
			}
		}
	},

	addRecord: function(record) {
		var oid= record.oid();
		var v= record.getAllCS();
		var l= v.length;
		for(var i=0;i<l;i++){
			this.add(v[i],oid);
		}
	},

	remove: function(cs,oid) {
		var csi= this.v[cs.r];
		if(csi){
			csi.remove(cs.t,oid);
		}
	},	

	removeArray: function(a,oid) {
		var l= a.length;
		for(var i=0;i<l;i++){
			var cs= a[i];
			if(cs){
				this.remove(a[i],oid);
			}
		}
	},

	encode: function() {
		var r= {};
		for(var i in this.v){
			if (this.v.hasOwnProperty(i)) {
				r[i]= this.v[i].encode();
			}
		}
		var data= {};
		data.id= 'csiv';
		data[Ext.data.SyncModel.MODEL]= 'Ext.data.CSIV';
		data.r= r;
		return data;
	},
		
	decode: function(v) {
		this.v= {};
		if(v){
			for(var i in v.r){
				if (v.r.hasOwnProperty(i)) {
					this.v[i]= new Ext.data.CSI().decode(v.r[i]);
				}
			}		
		}
		return this;
	},
	
	to_s: function() {
		var r= "";
		for(var i in this.v){
			if (this.v.hasOwnProperty(i)) {
				r= r+i+"=>["+this.v[i].to_s()+"], ";
			}
		}
		return r;
	},
			
});


Ext.data.DatabaseDefinition = Ext.extend(Ext.data.Config, {

	key: undefined, // the developer's api key
	database_name: undefined,
	generation: undefined, // of the database
	system_name: undefined, // this system
	system_names: {}, // other systems
	replica_number: undefined,
	idProperty: undefined,
	idPropertyDefaultValue: undefined,
	version: 1, // of the storage scheme
	
	// JCM include the epoch of the clock here?
	
	constructor: function(config,callback,scope) {
		//
		Ext.data.utilities.check('DatabaseDefinition', 'constructor', 'config', config, ['key','database_name','generation','system_name','replica_number']);
		//
		this.set(config);
		config.config_id= 'definition';
		Ext.data.DatabaseDefinition.superclass.constructor.call(this, config);
	},

	setReplicaNumber: function(replica_number,callback,scope) {
		var changed= (this.replica_number!=replica_number); 
		this.replica_number= replica_number;
		this.writeAndCallback(changed,callback,scope);
	},
	
	addSystemName: function(system_name) {
		this.system_names[system_name]= true;
		// JCM this.writeAndCallback(changed,callback,scope);
	},
	
	isKnownOf: function(system_name) {
		return this.system_name===system_name || Ext.data.array.includes(this.system_names,system_name);
	},

	set: function(config,callback,scope) {
		var changed= Ext.data.utilities.copy(config,this,[
			'key',
			'database_name',
			'generation',
			'system_name',
			'system_names',
			'replica_number',
			'idProperty',
			'idPropertyDefaultValue',
			'version',
			'_id']);
		this.writeAndCallback(changed,callback,scope);
	},

	as_data: function() { // to store on the disk
		var data= {
			key: this.key,
			database_name: this.database_name,
			generation: this.generation,
			system_name: this.system_name,
			system_names: this.system_names,
			replica_number: this.replica_number,
			idProperty: this.idProperty,
			idPropertyDefaultValue: this.idPropertyDefaultValue,
			version: this.version,
		};
		data[Ext.data.SyncModel.MODEL]= 'Ext.data.DatabaseDefinition';
		return Ext.data.DatabaseDefinition.superclass.as_data.call(this, data);
	},

	encode: function() { // to send over the wire
		return {
			key: this.key,
			database_name: this.database_name,
			generation: this.generation,
			system_name: this.system_name,
			replica_number: this.replica_number,
			idProperty: this.idProperty,
			idPropertyDefaultValue: this.idPropertyDefaultValue,
		};
	},

	// JCM perhaps an explicit decode would be better than the constructor?

});


Ext.data.Protocol = Ext.extend(Object, {

	constructor: function(config) {
		this.url= config.url;
		this.database_name= config.id;
		this.key= config.key;		
		var l= this.url.length;
		if (this.url[l-1]=='/') {
			this.url= this.url.substring(0,l-1); 
		}
		this.url= this.url+"/database/"+this.database_name;
		this.version= 1;
  },

	sync: function(local, callback, scope) {
		//
		// JCM callback if something is going to take a long time...
		// JCM like changing the replica number
		// JCM or clearing after a generation change
		//
	  this.send_create_database(local.definition,function(response) {
			switch (response.r) {
			case 'ok':
				this.updateCSV_and_Generator(local,response.csv,function(){
					//
					// And, now we synchronize.
					//
					this.sync_datastore(local,response.csv,callback,scope);
				},this);
				break;
			case 'new_replica_number':
				//
				// A replica number collision, or re-initialization, has occured. 
				// In either case we must change our local replica number.
				//
				console.log('new_replica_number',response.replica_number)
		    local.setReplicaNumber(response.replica_number,function(){
					callback.call(scope,{r:'again'});
				},scope);
				break;
			case 'new_generation_number':
				//
				// The database generation has changed. We clear out the database,
				// and update the definition. 
				//
				if (response.generation>local.definition.generation) {
					local.definition.set({generation:response.generation},function(){
						local.reset(function(){
							callback.call(scope,{r:'again'});
						},this);
					},this);
				} else {
					// local is the same, or greater than the server.
				}
				break;
			default:
				callback.call(scope,response);
				break;
			}
		},this);
	},
	
	// private
	
	updateCSV_and_Generator: function(local,csv,callback,scope) {
		new Ext.data.Transaction(local,function(t){
			//
			// The remote CSV describes the state of updated-ness of the
			// server this client is talking to. We add any replica numbers
			// that are new to us to our local CSV.
			//
		  t.updateReplicaNumbers(csv);
			//
			// And we update the CS generator with the maximum CS in the
			// CSV, so that the local time is bumped forward if one of 
			// the other replicas is ahead of us.
			//
			// We do this ahead of receiving updates to ensure that any
			// updates we generate will be ahead of the updates that
			// were just received. 
			//
			t.updateGenerator(csv);
			t.commit(callback,scope);
		},this);
	},

	send_create_database: function(definition,callback,scope) {
	  var request= definition.encode();
	  this.sendRequest('POST',definition.database_name,undefined,{},request,function(response){
			response.csv= new Ext.data.CSV().decode(response.csv);
			callback.call(scope, response);
		},this);
	},

	sync_datastore: function(local, remote_csv, callback, scope) {
		//
		// JCM In theory... we could send and receive at the same time...
		//
	  local.getUpdates(remote_csv,function(updates,updates_csv){
		  this.put_database_updates(local.definition,updates,updates_csv,function(response){
		  	if (remote_csv.dominates(local.csv)) {
					this.updateCSV_and_Generator(local,remote_csv,function(){
			  		this.get_database_updates(local,callback,scope);
					},this);
				} else {
					callback.call(scope,{r:'ok'});
				}
			},this);
		},this);
	},

	put_database_updates: function(definition,updates,updates_csv,callback,scope) {
		if((updates && !updates.isEmpty()) || (updates_csv && !updates_csv.isEmpty())){
			this.send_put_database_updates(definition,updates,updates_csv,function(response){
				callback.call(scope);
			},this);
		}else{
			callback.call(scope, {r:"ok"});
		}
	},

	send_put_database_updates: function(definition,updates,updates_csv,callback,scope) {
    var request= {
      updates: Ext.encode(updates.encode()),
	    csv: updates_csv.encode()
    };
		if(!updates.isEmpty()){
			console.log('send_put_database_updates sending',updates.length(),'updates')
		}
    this.sendRequest('POST',definition.database_name,'updates',{},request,callback,scope);
	},

	get_database_updates: function(local,callback,scope) {
		this.send_get_database_updates(local.definition,local.csv,function(response){
			if (response.r=='ok') {
			  local.putUpdates(response.updates,response.csv,callback,scope);
				// JCM if (response.remaining>0 && !response.updates.isEmpty()) {
				// JCM 	this.get_database_updates(local,callback,scope);
				// JCM } else {
			} else {
				callback.call(scope,response)
			}
		},this);
	},

	send_get_database_updates: function(definition,csv,callback,scope) {
	  var params= {
	    csv: csv.encode()
	  };
	  this.sendRequest('GET',definition.database_name,'updates',params,undefined,function(response){
			var updates_csv= new Ext.data.CSV();
			if (response.csv) {
				updates_csv.decode(response.csv);
			}
			response.csv= updates_csv;
			response.updates= new Ext.data.Updates().decode(response.updates);
			if(!response.updates.isEmpty()){
				console.log('send_get_database_updates received',response.updates.length(),'updates');
			}
			callback.call(scope, response);
		},this);
	},

	sendRequest: function(http_method,database_name,method,params,request,callback,scope) {
		var sentBytes= request ? Ext.encode(request).length : 0;
		console.log('sendRequest send',http_method,database_name,method,'sent',sentBytes,'bytes')
		var start= new Date().getTime();
		var url= this.url;
		if (method) {
			url= url+"/"+method;
		}
		params.key= this.key;
		params.v= this.version;
		Ext.Ajax.useDefaultXhrHeader= false;
		Ext.Ajax.request({
			method: http_method,
			url: url,
			params: params,
			jsonData: request,
			success: function(response){
				var stop= new Date().getTime();
				var receivedBytes= response.responseText ? response.responseText.length : 0;
				console.log('sendRequest receive',http_method,database_name,method,'took',stop-start,'ms, received',receivedBytes,'bytes')
				callback.call(scope,Ext.decode(response.responseText));
			},
			failure: function(response, options) {
				callback.call(scope,{r:'error',status:response.status,statusText:response.statusText});
			}
		});
	},
	
});


Ext.data.Transaction = Ext.extend(Object, {

	constructor: function(proxy,callback,scope) {
		this.proxy= proxy;
		this.store= proxy.store;
		this.generatorChanged= false;
		this.originalGenerator= proxy.generator;
		this.modifiedGenerator= new Ext.data.CSGenerator(proxy.generator);
		this.csvChanged= false;
		this.originalCSV= proxy.csv;
		this.modifiedCSV= new Ext.data.CSV(proxy.csv); // copy the csv
		this.cache= {}; // read cache of records
		this.toCreate= []; // records to create
		this.toUpdate= []; // records to update
		this.toDestroy= []; // records to destroy
		this.store.getIndex(function(index){
			this.indexChanged= false;
			this.index= index; // id to oid index
			this.store.getCSIndex(function(csiv){
				this.csivChanged= false;
				this.csiv= csiv
				callback.call(scope,this);
			},this);
		},this);
	},
	
	generateChangeStamp: function() {
		var cs= this.modifiedGenerator.generateChangeStamp();
		this.modifiedCSV.addCS(cs);
		this.generatorChanged= true;
		this.csvChanged= true;
		return cs;
	},

  create: function(records) {
		this.addToCache(records);
		this.addToList(this.toCreate,records);
  },

  read: function(oid, callback, scope) {
		var record= this.cache[oid];
		if(record){
			callback.call(scope,record);
		}else{
			this.store.read(oid,function(record){
				this.addToCache(record);
				callback.call(scope,record);
			},this);
		}
  },

  update: function(records) {
		this.addToCache(records);
		this.addToList(this.toUpdate,records);
  },

  destroy: function(oid) {
		this.toDestroy.push(oid);
  },

	updateIDIndex: function(id,oid) {
		this.indexChanged= this.index[id]!=oid;
		this.index[id]= oid;
	},

	lookupIDIndex: function(id,callback,scope) {
		callback.call(scope,this.index[id]);
	},
	
	updateCS: function(from,to,oid) {
		if(from && to){
			if(!from.equals(to)){
				this.csvChanged= this.modifiedCSV.addX(to) || this.csvChanged;
				this.csivChanged= true;
				//this.csiv.remove(from,oid);
				this.csiv.add(to,oid);
			}
		}else if(from){
			//this.csivChanged= true;
			//this.csiv.remove(from,oid);
		}else if(to){
			this.csvChanged= this.modifiedCSV.addX(to) || this.csvChanged;
			this.csivChanged= true;
			this.csiv.add(to,oid);
		}
	},
	
	updateCSV: function(csv) {
		this.csvChanged= this.modifiedCSV.addX(csv) || this.csvChanged;
	},
	
	updateReplicaNumbers: function(csv) {
		this.csvChanged= this.modifiedCSV.addReplicaNumbers(csv) || this.csvChanged;
	},
	
	updateGenerator: function(csv) {
		this.generatorChanged= this.originalGenerator.seenCSV(csv);
	},
	
	commit: function(callback, scope) {
		//
		// Work out which records are to be created or updated.
		//
		var start= new Date().getTime();
		this.toCreate= Ext.data.array.unique(this.toCreate);
		this.toUpdate= Ext.data.array.unique(this.toUpdate);
		this.toUpdate= Ext.data.array.minus(this.toUpdate,this.toCreate);
		var createRecords= this.getRecordsForList(this.toCreate);
		var updateRecords= this.getRecordsForList(this.toUpdate);
		this.store.create(createRecords,function(){
			this.store.update(updateRecords,function(){
				this.store.destroy(this.toDestroy,function(){
					this.store.setIndex(this.indexChanged ? this.index : undefined,function(){
						this.store.setCSIndex(this.csivChanged ? this.csiv : undefined,function(){
							if(this.generatorChanged){
								this.originalGenerator.set(this.modifiedGenerator);
							}
							if(this.csvChanged){
								this.originalCSV.addCSV(this.modifiedCSV);
								this.generatorChanged= this.originalGenerator.seenCSV(this.originalCSV);
							}
							this.proxy.writeConfig_Generator(this.generatorChanged ? this.originalGenerator : undefined,function(){
								this.proxy.writeConfig_CSV(this.csvChanged ? this.originalCSV : undefined,function(){
									var stop= new Date().getTime();
									var took= stop-start;
									if(took>9){
										console.log('commit',took,'ms')
									}
									callback.call(scope,createRecords,updateRecords);
								},this);
							},this);
						},this);
					},this);
				},this);
			},this);
		},this);
	},
	
	addToCache: function(records) {
		if(records){
			if(Ext.isArray(records)){
				var l= records.length;
				for(var i=0;i<l;i++){
					var record= records[i];
					var oid= record.data[Ext.data.SyncModel.OID]
					this.cache[oid]= record;
				}
			}else{
				this.cache[records.data[Ext.data.SyncModel.OID]]= records;
			}
		}
	},
	
	addToList: function(list,records) {
		if(records){
			if(Ext.isArray(records)){
				var l= records.length;
				for(var i=0;i<l;i++){
					var record= records[i];
					var oid= record.data[Ext.data.SyncModel.OID]
					list.push(oid);
				}
			}else{
				list.push(records.data[Ext.data.SyncModel.OID]);
			}
		}
	},
	
	getRecordsForList: function(list) {
		var records= [];
		var l= list.length;
		for(var i=0;i<l;i++){
			var id= list[i];
			records.push(this.cache[id]);
		}
		return records;
	}
		
});

  
  


// JCM this 'class' could help with batching updates to be sent to the server

Ext.data.Updates = Ext.extend(Object, {

	updates: undefined,
	
	constructor: function(x) {
		//
		// sort the updates into change stamp order,
		// as they have to be transmitted this way
		//
		this.updates= x||[];
		this.updates.forEach(function(update) {
			if (!(update.c instanceof Ext.data.CS)) {
				update.c= new Ext.data.CS(update.c)
			}
		});
		this.updates.sort(function(a,b) {return a.c.compare(b.c)});
		// JCM var prev;
		// JCM this.updates.forEach(function(update) {
		// JCM 	if (prev && !update.c.greaterThan(prev.c)) { throw "Error - Updates - Updates were in wrong order. "+Ext.encode(update)+" <= "+Ext.encode(prev) }
		// JCM 	prev= update
		// JCM });
	},
	
	push: function(update) {
		// update must have a cs greater than the last element
		var last= this.updates[this.updates.length];
		if (!update.c.greaterThan(last.c)) { throw "Error - Updates - Tried to push updates in wrong order. "+Ext.encode(update)+" <= "+Ext.encode(last) }
		this.updates.push(update);
	},
	
	isEmpty: function() {
		return this.updates.length<1;
	},
	
	length: function() {
		return this.updates.length;
	},

	forEach: function(callback,scope) {
		this.updates.forEach(callback,scope);
	},

	forEachAsync: function(each_callback,each_scope,done_callback,done_scope) {
		Ext.data.array.forEachAsync(this.updates,each_callback,each_scope,done_callback,done_scope);
	},
	
	chunks: function(chunk_size) {
		var r= [];
		var l= this.updates.length;
		var n= (l/chunk_size)+1;
		for(var i=0;i<n;i++) {
			var start= i*chunk_size;
			var end= start+chunk_size;
			var t= new Ext.data.Updates();
			t.updates= this.updates.slice(start,end)
			r.push(t);
		}
		return r;
	},

	decode: function(x) {
		this.updates= [];
		if (x) {
			var l= x.length;
			var update, prev_i, id, p, v, c;
			for(var i=0;i<l;i++) {
				update= x[i];
				switch(update.length) {
					case 3:
						id= prev_i;
						p= update[0];
						v= update[1];
						c= update[2];
						break;
					case 4:
						id= update[0];
						p= update[1];
						v= update[2];
						c= update[3];
						prev_i= id;
						break;
				}
				c= ((c instanceof Ext.data.CS) ? c : new Ext.data.CS(c));
				this.updates.push({i:id,p:p,v:v,c:c});
			}
		}
		return this;
	},
	
	encode: function() {
		// JCM optimize - "" around i and p and cs is not needed
		// JCM optimize - diff encode cs 1-123, +1-0, +0-1, 1-136-4, +1-0, ...
		var r= [];
		var l= this.updates.length;
		var prev_i, update, cs;
		for(var i=0;i<l;i++) {
			update= this.updates[i];
			cs= ((update.c instanceof Ext.data.CS) ? update.c.to_s() : update.c);
			if (update.i===prev_i) {
				r.push([update.p, update.v, cs]);
			} else {
				r.push([update.i, update.p, update.v, cs]);
				prev_i= update.i;
			}
		}
		return r;
	},
		
});

  
  


// this model is used to extend the user's own model.
// it adds the replication state.

Ext.data.SyncModel= {
	
	STATE: '_state',
	TOMBSTONE: '_ts',
	OID: '_oid',
	REF: '_ref',
	MODEL: '_model',
	
	state: undefined,
	
	createReplStorageModel: function(modelName) { // create the storage model, based on the user model

		var augmented_fields= this.fields.items.slice(0);
		augmented_fields= augmented_fields.concat([
			{name: '_state'},
			{name: '_ts'},
			{name: '_oid'},
			{name: '_ref'},
			{name: '_model'}
		]);

		// JCM could the local storage proxy be added to the storage model...?

		var StorageModel= Ext.define("Sencha.StorageModel."+modelName, {extend: "Ext.data.Model",
			fields: augmented_fields,
			idProperty: Ext.data.SyncModel.OID
		});
		
		return StorageModel;
  },

	oid: function() {
		return this.data[Ext.data.SyncModel.OID];
	},

	ref: function() {
		return this.data[Ext.data.SyncModel.REF];
	},
	
	userData: function() {
		var r= {};
		for(var i in this.data) {
			if (i[0]!=="_") {
				r[i]= this.data[i];
			}
		}
		return r;
	},
	
	isSystemModel: function() {
		var model_name= this.data[Ext.data.SyncModel.MODEL];
		return model_name!==undefined && model_name!=='' && model_name.indexOf("Ext.data.",0)===0;
	},

	changeReplicaNumber: function(old_replica_number,new_replica_number) {
		this.setup();
		var changed= false;
		this.forEachCS(function(cs) {
			var t= cs.changeReplicaNumber(old_replica_number,new_replica_number)
			changed= changed || t;
			return cs;
		},this);
		var v= this.oid();
		if (v) {
			var id_cs= new Ext.data.CS(v);
			if (id_cs.changeReplicaNumber(old_replica_number,new_replica_number)) {
				this.data[Ext.data.SyncModel.OID]= id_cs.to_s();
				changed= true;
			}
		}
		return changed;
	},

	setCreateState: function(t) {
		if(this.data[Ext.data.SyncModel.OID]){
			console.log('Error: Record has already been created.',Ext.encode(this.data));
		}else{
			this.state= {};
			var oid= t.generateChangeStamp();
			this.setPair(t,Ext.data.SyncModel.OID,oid.to_s(),oid);
			this.forEachValue(this.data,[],function(path,value) {
				if (path[0]!==Ext.data.SyncModel.OID) {
					this.setCS(t,path,t.generateChangeStamp());
				}
			},this);
		}
	},
	
	setUpdateState: function(t) {
		var changes= this.getChanges();
		for (name in changes) {
			if (name!==Ext.data.SyncModel.STATE && name!==Ext.data.SyncModel.OID) {
				this.setUpdateStateValue(t,[name],this.modified[name],changes[name]);
			}
		}
	},
	
	setUpdateStateValue: function(t,path,before_value,after_value) {
		//console.log('setUpdateStateValue',path,before_value,after_value)
		if (this.isComplexValueType(after_value)) {
			if (before_value) {
				var added= {};
				if (this.isComplexValueType(before_value)) {
					if (this.valueType(before_value)===this.valueType(after_value)) {
						added= Ext.data.utilities.minus(after_value,before_value);
						var changed= Ext.data.utilities.intersection(after_value,before_value);
						for(var name2 in changed) {
							if (changed.hasOwnProperty(name2)) {							
								if (before_value[name2]!==after_value[name2]) {
									added[name2]= after_value[name2]
								}
							}
						}
					} else {
						added= after_value;
						this.setCS(t,path,t.generateChangeStamp()); // value had a different type before, a complex type
					}
				} else {
					added= after_value;
					this.setCS(t,path,t.generateChangeStamp()); // value had a different type before, a primitive type
				}
			} else {
				added= after_value;
				this.setCS(t,path,t.generateChangeStamp()); // value didn't exist before
			}
			for(var name2 in added) {
				if (added.hasOwnProperty(name2)) {
					var next_before_value= before_value ? before_value[name2] : undefined;
					this.setUpdateStateValue(t,path.concat(name2),next_before_value,after_value[name2]);
				}
			}
		} else {
			this.setCS(t,path,t.generateChangeStamp()); // value has a primitive type
		}
	},

	setDestroyState: function(t) {
		var cs= t.generateChangeStamp();
		this.data[Ext.data.SyncModel.TOMBSTONE]= cs.to_s();
		this.setCS(t,Ext.data.SyncModel.TOMBSTONE,cs);
	},

	isDestroyed: function() { // test if a record has been deleted
		var t= this.data[Ext.data.SyncModel.TOMBSTONE]
		return (t!==undefined && t!=='');
	},

	isNotDestroyed: function() { // test if a record has been deleted
		var t= this.data[Ext.data.SyncModel.TOMBSTONE]
		return (t===undefined || t==='');
	},
	
	getUpdates: function(csv) {
		this.setup();
		var updates= [];
		var oid= this.oid();
		this.forEachPair(this.data,this.state,[],[],function(path,values,cs){
			if (cs) {
				var cs2= csv.get(cs);
				if (!cs2 || cs2.lessThan(cs)) {
					updates.push({
						i: oid,
						p: path.length==1 ? path[0] : path, 
						v: values.length==1 ? values[0] : values, 
						c: cs
					});
				}
			}
		},this);
		if(updates.length>0){
			//console.log('getUpdates csv',Ext.encode(csv))
			//console.log('getUpdates =>',Ext.encode(updates))
			//console.log('getUpdates =>',updates.length)
		}
		return updates;
	},
	
	putUpdate: function(t,update) {
		//console.log('applyUpdate',update)
		return this.setPair(t,update.p,update.v,update.c);
	},
	
	equals: function(r) {
		this.forEachPair(this.data,this.state,[],[],function(path,values,cs) {
			var p= r.getPair(path);
			var value= values[values.length-1];
			if (!(cs.equals(r.c) && value===r.v)) {
				return false;
			}
		},this);
		return true;
	},

	forEachPair: function(data,state,path,values,callback,scope) {
		//console.log('forEachPair',Ext.encode(data),Ext.encode(state),Ext.encode(path),Ext.encode(values));
		this.setup();
		for(var name in state) {
			if (state.hasOwnProperty(name)) {
				var new_state= state[name];
				var new_data= data[name];
				var new_path= path.concat(name);
				var new_data_type= this.valueType(new_data);
				var new_value;
				switch (new_data_type) {
					case 'object':
						new_value= {};
						break;
					case 'array':
						new_value= [[]];
						break;
					default:
						new_value= new_data;
				}
				var new_values= values.concat(new_value);
				switch (this.valueType(new_state)) {
					case 'string':
						callback.call(scope,new_path,new_values,new Ext.data.CS(new_state));
						break;
					case 'array':
						switch (new_data_type) {
							case 'undefined':
								console.log('Warning - There was no data for the state at path',new_path);
								console.log('Warning -',Ext.encode(this.data));
								break;
							case 'object':
							case 'array':
								callback.call(scope,new_path,new_values,new Ext.data.CS(new_state[0])); // [cs,state]
								this.forEachPair(new_data,new_state[1],new_path,new_values,callback,scope); // [cs,state]
								break;
							default:
								callback.call(scope,new_path,new_values,new Ext.data.CS(new_state[0])); // [cs,state]
								break;
						}
						break;
				}
			}
		}
	},	
			
	forEachValue: function(data,path,callback,scope) {
    var n, v;
		for(n in data) {
			if (data.hasOwnProperty(n)) {
				v= data[n];
				if (v!==this.state) {
					var path2= path.concat(n);
					callback.call(scope,path2,v);
					if (this.isComplexValueType(v)) {
						this.forEachValue(v,path2,callback,scope);
					}
				}
			}
		}
	},

	getCSV: function() {
		var csv= new Ext.data.CSV();
		this.forEachCS(function(cs) {
			csv.addCS(cs);
		},this);
		return csv;
	},

	getAllCS: function() {
		var r= [];
		this.forEachCS(function(cs) {
			r.push(new Ext.data.CS(cs));
		},this);
		return r;
	},

	forEachCS: function(callback,scope,state) {
		state= state || this.data[Ext.data.SyncModel.STATE];
		for(name in state) {
			if (state.hasOwnProperty(name)) {
				var next_state= state[name];
				switch (this.valueType(next_state)) {
					case 'string':
						var cs= callback.call(scope,new Ext.data.CS(next_state));
						if (cs) { state[name]= cs.to_s(); }
						break;
					case 'array':
						var cs= callback.call(scope,new Ext.data.CS(next_state[0]));
						if (cs) { state[name][0]= cs.to_s(); } // [cs,state]
						this.forEachCS(callback,scope,next_state[1]); // [cs,state]
						break;
				}
			}
		}
	},

	getCS: function(path) {
		this.setup();
		var state= this.state;
		if (Ext.isArray(path)) {
			var l= path.length;
			var e= l-1;
			for(var i=0;i<l;i++) {
				var name= path[i];
				if (i===e) {
					return this.do_getCS(state,name);
				} else {
					state= this.do_getState(state,name);
				}
			}
		} else {
			return this.do_getCS(state,path);
		}
	},
	
	do_getCS: function(state,name) {
		var cs= undefined;
		var state= state[name];
		if (state) {
			switch (this.valueType(state)) {
				case 'string':
					cs= new Ext.data.CS(state);
					break;
				case 'array':
					cs= new Ext.data.CS(state[0]); // [cs,state]
					break;
				default:
					console.log("Error - SyncModel - do_getCS - unexpected type in state for",name,":",typeof state,state);
					console.log('state',Ext.encode(this.data));
					cs= new Ext.data.CS();
					break;
			}
		} // else undefined
		return cs;
	},

	setCS: function(t,path,cs) {
		//console.log('setCS',Ext.isArray(path) ? path.join() : path,cs.to_s())
		this.setup();
		var state= this.state;
		if (Ext.isArray(path)) {
			var l= path.length;
			var e= l-1;
			for(var i=0;i<l;i++) {
				var name= path[i];
				if (i===e) {
					this.do_setCS(t,state,name,cs);
				} else {
					state= this.do_getState(state,name);
				}
			}
		} else {
			this.do_setCS(t,state,path,cs);
		}
	},
	
	do_setCS: function(t,state,name,cs) {
		var from;
		var cs_s= (cs instanceof Ext.data.CS) ? cs.to_s() : cs;
		var state2= state[name];
		if (state2) {
			switch (this.valueType(state2)) {
				case 'string':
					from= new Ext.data.CS(state2);
					state[name]= cs_s;
					break;
				case 'array':
					// JCM it should always be the case that the cs passed in should
					// JCM be larger than the existing cs... otherwise we have gone
					// JCM back in time somehow....
					from= new Ext.data.CS(state2[0]);
					state2[0]= cs_s; // [cs,state]
					break;
				default:
					console.log("Error - SyncModel - do_setCS - unexpected type in state for",name,":",typeof state2,state2);
					console.log('state',Ext.encode(state));
					console.log('name',name,'cs',cs_s);
					state[name]= cs_s;
			}
		} else {
			state[name]= cs_s;
		}
		t.updateCS(from,cs,this.oid());
		//console.log('do_setCS',name,cs_s,Ext.encode(state))
	},

	getPair: function(path) {
		this.setup();
		var data= this.data;
		var state= this.state;
		if (Ext.isArray(path)) {
			var l= path.length;
			var e= l-1;
			for(var i=0;i<l;i++) {
				var name= path[i];
				if (i===e) {
					return {
						v: data ? data[name] : data,
						c: this.do_getCS(state,name)
					};
				} else {
					state= this.do_getState(state,name);
					data= data ? data[name] : data;
				}
			}
		} else {
			return {
				v: data[path],
				c: this.do_getCS(state,path)
			};
		}
	},
			
	setPair: function(t,path,values,new_cs) {
		//console.log('setPair',Ext.encode(path),Ext.encode(values),Ext.encode(new_cs));
		//console.log('setPair',Ext.encode(this.data));
		var changed= false;
		this.setup();
		if (!Ext.isArray(path)) {
			path= [path];
			values= [values];
		}
		var data= this.data;
		var state= this.state;
		var l= path.length;
		var e= l-1;
		for(var i=0;i<l;i++) {
			var name= path[i];
			var new_value= values[i]; 
			var old_cs= this.do_getCS(state,name);
			var old_value= data[name];
			var old_value_type= this.valueType(old_value);
			var new_value_type= this.valueType(new_value);
			var sameComplexType= 
				((old_value_type==='object' && new_value_type==='object') ||
				(old_value_type==='array' && new_value_type==='array'));
			if (old_cs) {
				if (new_cs.greaterThan(old_cs)) {
					if (sameComplexType) {
						new_value= undefined; // re-assert, don't overwrite
					}
					// new_cs is gt old_cs, so accept update
					if (this.do_setPair(t,data,state,name,new_value,new_cs)) {
						changed= true;
					}
				} else {
					// new_cs is not gt old_cs
					if (sameComplexType) {
						// but this value type along the path is the same, so keep going... 
					} else {
						// and this type along the path is not the same, so reject the update.
						return changed;
					}
				}
			} else {
				// no old_cs, so accept update
				if (this.do_setPair(t,data,state,name,new_value,new_cs)) {
					changed= true;
				}
			}
			if (i!==e) {
				data= this.do_getData(data,name);
				state= this.do_getState(state,name,new_cs);
			}
		}
		//console.log('setPair => ',Ext.encode(this.data));
		return changed;
	},
	
	do_getState: function(state,name,cs) {
		var next_state= state[name];
		switch (this.valueType(next_state)) {
			case 'undefined':
				var new_state= {};
				state[name]= [cs,new_state];
				state= new_state;
				break;
			case 'string':
				var new_state= {};
				state[name]= [next_state,new_state];
				state= new_state;
				break;
			case 'array':
				state= next_state[1];
				break;
			default:
				throw "Error - SyncModel - do_getState - unexpected type in state: "+(typeof next_state)+" "+next_state
		}
		return state;
	},
	
	do_setPair: function(t,data,state,name,new_value,new_cs) {
		var changed= false;
		if (new_value!==undefined) {
			this.do_setData(data,name,new_value)
			changed= true;
		}
		if (new_cs!==undefined) { 
			this.do_setCS(t,state,name,new_cs);
			changed= true;
		}
		return changed;
	},
	
	do_getData: function(data,name) {
		return data[name];
	},

	do_setData: function(data,name,value) {
		//console.log(Ext.encode(data),"[",name,"]=",Ext.encode(value));
		data[name]= value;
	},
	
	valueType: function(value) { // returns undefined, number, boolean, string, object, array
		var t= typeof value;
		if (t==='object' && (value instanceof Array)) {
			t= 'array';
		}
		return t;
	},
	
	valueEquals: function(v1,v2) {
		var r= false;
		var t1= this.valueType(v1);
		var t2= this.valueType(v2);
		if (t1===t2) {
			switch (t1) {
			case 'object':
			case 'array':
				r= Ext.encode(v1)===Ext.encode(v2); // JCM I'm sure there's a better way to do this...
				break;
			default:
				r= v1===v2;
			}
		}
		return r;
	},
	
	isComplexValueType: function(value) { // return true for an object or an array
		return (typeof value==='object');
	},
	
	setup: function() {
		this.data[Ext.data.SyncModel.STATE]= this.data[Ext.data.SyncModel.STATE] || {};
		this.state= this.data[Ext.data.SyncModel.STATE];
	}
		
};




