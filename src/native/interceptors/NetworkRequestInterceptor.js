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

var Interceptor = require("./Interceptor.js").Interceptor;
var NetworkRequestHandler = require("../network-request-handlers/NetworkRequestHandler.js").NetworkRequestHandler;

function NetworkRequestInterceptor(protocol, networkRequestHandler) {
    Interceptor.call(this, protocol);

    this._networkRequestHandler = null;

    this.setNetworkRequestHandler(networkRequestHandler);
}

NetworkRequestInterceptor.prototype = Object.create(Interceptor.prototype);
NetworkRequestInterceptor.prototype.constructor = NetworkRequestInterceptor;

NetworkRequestInterceptor.prototype.getNetworkRequestHandler = function() {
    return this._networkRequestHandler;
};

NetworkRequestInterceptor.prototype.setNetworkRequestHandler = function(networkRequestHandler) {

    if ( !(networkRequestHandler instanceof NetworkRequestHandler) ) {

        throw new TypeError("NetworkRequestInterceptor setNetworkRequestHandler, parameter networkRequestHandler expected to be instanceof NetworkRequestHandler.");

    } else {

        this._networkRequestHandler = networkRequestHandler;

    }

};

exports.NetworkRequestInterceptor = NetworkRequestInterceptor;
