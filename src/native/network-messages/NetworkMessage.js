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

var HeaderMap = require("../maps/HeaderMap.js").HeaderMap;

function NetworkMessage(headerMap, body) {

    this._headerMap = null;
    this._body = null;

    this.setHeaderMap(headerMap);
    this.setBody(body);

}

NetworkMessage.prototype.getHeaderMap = function() {

    return this._headerMap;

};

NetworkMessage.prototype.setHeaderMap = function(headerMap) {

    if ( !(headerMap instanceof HeaderMap) ) {

        throw new TypeError("NetworkMessage setHeaderMap, parameter headerMap expected to be instanceof HeaderMap.");

    } else {

        this._headerMap = headerMap;

    }

};

NetworkMessage.prototype.getBody = function() {

    return this._body;

};

NetworkMessage.prototype.setBody = function(body) {

    this._body = body;

}

exports.NetworkMessage = NetworkMessage;
