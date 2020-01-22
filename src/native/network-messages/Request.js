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

var NetworkMessage = require("./NetworkMessage.js").NetworkMessage;

function Request(url, method, headers, body) {

    NetworkMessage.call(this, headers, body);

    this._url = null;
    this._method = null;

    this.setUrl(url);
    this.setMethod(method);

}

Request.prototype = Object.create(NetworkMessage.prototype);
Request.prototype.constructor = Request;

Request.prototype.getUrl = function() {

    return this._url;

};

Request.prototype.setUrl = function(url) {


    if ( typeof(url) !== "string" ) {

        throw new TypeError("Request setUrl, expected parameter url to be typeof string but found " + (typeof(url)) + ".");

    } else {

        this._url = url;

    }

};

Request.prototype.getMethod = function() {

    return this._method;

};

Request.prototype.setMethod = function(method) {

    if ( typeof(method) !== "string" ) {

        throw new TypeError("Request setMethod, parameter method expected to be typeof string but found " + (typeof(method)) + ".");

    } else {

        this._method = method;

    }

};

exports.Request = Request;
