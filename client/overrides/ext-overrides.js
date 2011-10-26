// Override for Sync - Remove when these changes are checked in
Ext.data.Batch.override({
    constructor: function(config) {
        var me = this;
        // TRUNKDIFF assign proxy to me - Sync change
        me.proxy= config.proxy;
        me.mixins.observable.constructor.call(me, config);
        me.operations = [];
    }
})

Ext.data.proxy.WebStorage.override({
    getRecord: function(id) {
        if (this.cache[id] === undefined) {
            var rawData = Ext.decode(this.getStorageObject().getItem(this.getRecordKey(id))),
                data    = {},
                Model   = this.model,
                fields  = Model.prototype.fields.items,
                length  = fields.length,
                i, field, name, record;

            // TRUNKDIFF rawData is not set just return - Sync change
            if (!rawData) { return; }

            for (i = 0; i < length; i++) {
                field = fields[i];
                name  = field.name;

                if (typeof field.decode == 'function') {
                    data[name] = field.decode(rawData[name]);
                } else {
                    data[name] = rawData[name];
                }
            }

            record = new Model(data, id);
            record.phantom = false;

            this.cache[id] = record;
        }

        return this.cache[id];
    },

    getIds: function() {
        var ids    = (this.getStorageObject().getItem(this.id) || "").split(","),
            length = ids.length,
            i;

        if (length == 1 && ids[0] === "") {
            ids = [];
        }
        // TRUNKDIFF else block removed

        return ids;
    }
});

Ext.data.AbstractStore.override({
    sync: function() {
        var me = this,
            options = {},
            toCreate = me.getNewRecords(),
            toUpdate = me.getUpdatedRecords(),
            toDestroy = me.getRemovedRecords(),
            needsSync = false;

        if (toCreate.length > 0) {
            options.create = toCreate;
            needsSync = true;
        }

        if (toUpdate.length > 0) {
            options.update = toUpdate;
            needsSync = true;
        }

        if (toDestroy.length > 0) {
            options.destroy = toDestroy;
            needsSync = true;
        }

        if (needsSync && me.fireEvent('beforesync', options) !== false) {
            me.proxy.batch(options, me.getBatchListeners());
        }
        // TRUNKDIFF
        return {added:toCreate,updated:toUpdate,removed:toDestroy};
    }
});

Ext.data.Store.override({
    /**
     * Synchronizes the Store with its Proxy. This asks the Proxy to batch together any new, updated
     * and deleted records in the store, updating the Store's internal representation of the records
     * as each operation completes.
     */
    sync: function() {
        if (this.proxy.sync==undefined) {
            this.callParent(arguments);
        }else{
            this.proxy.sync(this);
        }
    },
});




