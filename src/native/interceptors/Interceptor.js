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

var Protocol = require("../protocols/Protocol.js").Protocol;

function Interceptor(protocol) {

    this._protocol = null;

    this.setProtocol(protocol);
}

Interceptor.prototype.getProtocol = function() {

    return this._protocol;

};

Interceptor.prototype.setProtocol = function(protocol) {

    if ( !(protocol instanceof Protocol) ) {

        throw new TypeError("Interceptor setProtocol, expected parameter protocol to be instanceof Protocol.");

    } else {

        this._protocol = protocol;

    }

};

Interceptor.prototype.interceptProtocolRequest = function() {

    throw new Error("Interceptor interceptProtocolRequest, this method is abstract and must be overridden.");

};

exports.Interceptor = Interceptor;
