function Cache() {}

Cache.prototype.store = function(key, value) {

    var keyInPreparedForm = this._prepareKeyFormatBeforeUse(key);

    this[keyInPreparedForm] = value;

};

Cache.prototype.retrieve = function(key) {

    var keyInPreparedForm = this._prepareKeyFormatBeforeUse(key);

    return this[keyInPreparedForm];

};

Cache.prototype.remove = function(key) {

    var keyInPreparedForm = this._prepareKeyFormatBeforeUse(key);

    delete this[keyInPreparedForm];

};

Cache.prototype.clear = function() {

    var cacheKeys = Object.keys(this);

    for (var i = 0; i < cacheKeys.length; i++) {

        delete this[ cacheKeys[i] ];

    }

};

Cache.prototype._prepareKeyFormatBeforeUse = function(key) {

    return new String(key).toLowerCase();

};

exports.Cache = Cache;
