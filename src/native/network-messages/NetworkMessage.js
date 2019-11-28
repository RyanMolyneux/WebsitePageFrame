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


function NetworkMessage(headers, body) {

    this._headers = null;
    this._body = null;

    this.setHeaders(headers);
    this.setBody(body);


}

NetworkMessage.prototype.getHeaders = function() {

    return this._headers;

};

NetworkMessage.prototype.setHeaders = function(headers) {

    if ( !(headers instanceof Object) ) {

        throw new TypeError("NetworkMessage setHeaders, parameter headers expected to be instanceof Object.");

    } else {

        this._headers = headers;

    }

};

NetworkMessage.prototype.getBody = function() {

    return this._body;

};

NetworkMessage.prototype.setBody = function(body) {

    if ( typeof(body) !== "string" && body !== null ) {

        throw new TypeError("NetworkMessage setBody, parameter body expected to be typeof string or to be null but found " + (typeof(body)) + ".");

    } else {

        this._body = body;

    }

}

exports.NetworkMessage = NetworkMessage;
