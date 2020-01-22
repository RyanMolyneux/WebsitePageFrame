/*
 *    This library provides an alternative in app browser to webview by removing specific restrictions placed upon iframe and more.
 *    Copyright (C) 2019  Ryan Molyneux
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
