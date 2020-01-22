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

function Response(headers, body, statusCode) {

    NetworkMessage.call(this, headers, body);

    this._statusCode = null;

    this.setStatusCode(statusCode);

}

Response.prototype = Object.create(NetworkMessage.prototype);
Response.prototype.constructor = Response;

Response.prototype.getStatusCode = function() {

    return this._statusCode;

};

Response.prototype.setStatusCode = function(statusCode) {

    if ( typeof(statusCode) !== "number" ) {

      throw new TypeError("Response setStatusCode, parameter statusCode expected to be typeof number but found " + (typeof(statusCode)) + ".");

    } else if ( (statusCode % 1) !== 0 ) {

      throw new TypeError("Response setStatusCode, arguement passed to parameter statusCode expected to be integer but found " + (statusCode) + ".");

    } else {

        this._statusCode = statusCode;

    }

}

exports.Response = Response;
