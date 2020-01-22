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

var NetworkRequestInterceptor = require("./NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var ElectronNetworkRequestHandler = require("../network-request-handlers/ElectronNetworkRequestHandler.js").ElectronNetworkRequestHandler;
var HeaderMap = require("../maps/HeaderMap.js").HeaderMap;
var Request = require("../network-messages/Request.js").Request;
var PassThrough = require('stream').PassThrough;

function ElectronNetworkRequestInterceptor(protocol, electronNetworkRequestHandler) {

    NetworkRequestInterceptor.call(this, protocol, electronNetworkRequestHandler);

}

ElectronNetworkRequestInterceptor.prototype = Object.create(NetworkRequestInterceptor.prototype);
ElectronNetworkRequestInterceptor.prototype.constructor = ElectronNetworkRequestInterceptor;

ElectronNetworkRequestInterceptor.prototype.interceptProtocolRequest = function(request, callback) {

    var requestHeaderMap = new HeaderMap();

    requestHeaderMap.fromObject(request.headers);

    request = new Request(request.url, request.method, requestHeaderMap, (request.uploadData)? request.uploadData[0].bytes: null );

    this.getNetworkRequestHandler().handleNetworkRequest(request)
                                   .then(function(response) {

                                      response.getHeaderMap().remove("content-encoding");

                                      callback({
                                          headers: response.getHeaderMap().toObject(),
                                          data: response.getBody(),
                                          statusCode: response.getStatusCode()
                                      });
                                   }).catch(this.complete);

};

ElectronNetworkRequestInterceptor.prototype.complete = function(errorHasOccured) {

    if (errorHasOccured) {

        console.error(errorHasOccured);
    }

};

exports.ElectronNetworkRequestInterceptor = ElectronNetworkRequestInterceptor;
