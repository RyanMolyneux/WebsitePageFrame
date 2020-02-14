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

function HeaderMap() {

    Map.call(this);

    this._headers = {};

}

HeaderMap.prototype = Object.create(Map.prototype);
HeaderMap.prototype.constructor = HeaderMap;

HeaderMap.prototype.append = function(header, value) {

    header = this._prepareValidKey(header);

    if ( this.has(header) ) {

        this._headers[header].push(value);

    } else {

        this.set(header, value);

    }

};

HeaderMap.prototype.has = function(header) {

    header = this._prepareValidKey(header);

    return ( header in this._headers );

};

HeaderMap.prototype.set = function(header, value) {

    header = this._prepareValidKey(header);

    if (value instanceof Array) {

        this._headers[header] = value;

    } else {


        this._headers[header] = [ value ];


    }
};


HeaderMap.prototype.get = function(header) {

    header = this._prepareValidKey(header);

    return ( this.has(header) && (this._headers[header].length === 1)? this._headers[header][0] : this._headers[header] );

};

HeaderMap.prototype.remove = function(header) {

    header = this._prepareValidKey(header);

    delete this._headers[header];

};

HeaderMap.prototype._prepareValidKey = function(header) {

    if ( typeof(header) !== "string" ) {

        throw new TypeError("HeaderMap _prepareValidKey, header given expected to be typeof string but found " + (typeof(header)) + ".");

    } else {

        return header.toLowerCase();

    }

};

HeaderMap.prototype.toObject = function() {

    return this._headers;

};

HeaderMap.prototype.fromObject = function(headers) {

    if ( !(headers instanceof Object) ) {

        throw new TypeError("HeaderMap fromObject, this method expected parameter headers to contain instance of type Object.");

    } else {

        this._headers = {};

        headersObjectKeys = Object.keys(headers);

        for (var i = 0; i < headersObjectKeys.length; i++) {

            this.append(headersObjectKeys[i], headers[ headersObjectKeys[i] ]);

        }

    }

};

exports.HeaderMap = HeaderMap;
