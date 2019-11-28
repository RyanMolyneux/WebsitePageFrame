/*
 *    This library provides a way to allow browser based programs to have cross parent to child window communication through code.
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
