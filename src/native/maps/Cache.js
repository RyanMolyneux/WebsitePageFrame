var Map = require("../../general/maps/Map.js").Map;

function Cache() {

    Map.call(this);

}

Cache.prototype = Object.create(Map.prototype);
Cache.prototype.constructor = Cache;

Cache.prototype.set = function(key, value) {

    var keyInPreparedForm = this._prepareValidKey(key);

    this[keyInPreparedForm] = value;

};

Cache.prototype.get = function(key) {

    var keyInPreparedForm = this._prepareValidKey(key);

    return this[keyInPreparedForm];

};

Cache.prototype.has = function(key) {

    var keyInPreparedForm = this._prepareValidKey(key);

    return ( this[keyInPreparedForm] !== undefined );

};

Cache.prototype.remove = function(key) {

    var keyInPreparedForm = this._prepareValidKey(key);

    delete this[keyInPreparedForm];

};

Cache.prototype.clear = function() {

    var cacheKeys = Object.keys(this);

    for (var i = 0; i < cacheKeys.length; i++) {

        delete this[ cacheKeys[i] ];

    }

};

Cache.prototype._prepareValidKey = function(key) {

    if ( typeof(key)  !== "string" ) {

        throw new TypeError("Cache _prepareValidKey, key provided expected to be typeof string but found " + typeof(key) + ".");

    } else {

        return key.toLowerCase();

    }

};

exports.Cache = Cache;
