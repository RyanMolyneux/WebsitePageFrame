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

var NetworkRequestHandler = require("./NetworkRequestHandler.js").NetworkRequestHandler;
var HeaderMap = require("../maps/HeaderMap.js").HeaderMap;
var Request = require("../network-messages/Request.js").Request;
var Response = require("../network-messages/Response.js").Response;
var PassThrough = require("stream").PassThrough;
var electronFetch = require("electron-fetch").default;

function ElectronNetworkRequestHandler(browserSession, cache, responsePreparationChainBuilder) {

    NetworkRequestHandler.call(this, electronFetch, cache, responsePreparationChainBuilder);

    this._browserSession = null;

    this.setBrowserSession(browserSession);

}

ElectronNetworkRequestHandler.prototype = Object.create(NetworkRequestHandler.prototype);
ElectronNetworkRequestHandler.prototype.constructor = ElectronNetworkRequestHandler;

ElectronNetworkRequestHandler.prototype.handleNetworkRequest = function(request) {

    if ( request instanceof Request ) {

        var response = null;

        return this._addSiteCookiesToRequestHeaderMap(request).then(function() {


            return this.getNetworkRequester()(request.getUrl(), {

              headers: request.getHeaderMap().toObject(),
              method: request.getMethod(),
              body: request.getBody(),
              timeout: 15000

            });

        }.bind(this)).then(function(fetchResponse) {

            response = new Response( this._extractNetworkRequesterResponseHeadersToHeaderMap(fetchResponse.headers),
                                            null,
                                            fetchResponse.status);

            if ( response.getHeaderMap().get("content-type").includes("text/html") ) {

                return fetchResponse.text();

            } else {

                return fetchResponse.body;

            }

        }.bind(this)).then(function(responseBody) {

            response.setBody(responseBody);

            var responsePreparationChainLink = this._findResponsePreparationChainLink(request, response);

            if (responsePreparationChainLink != undefined) {

                responsePreparationChainLink.handleResponsibility(response, this.getCache());


            }

            if ( typeof(responseBody) === "string" ) {

                var requestBodyAsStream = new PassThrough();

                requestBodyAsStream.push(response.getBody());
                requestBodyAsStream.push(null);

                response.setBody(requestBodyAsStream);

            }

            return response;

        }.bind(this));


    } else {

        throw new TypeError("ElectronNetworkRequestHandler handleNetworkRequest, parameter request expected to be instanceof Request.");

    }

};

ElectronNetworkRequestHandler.prototype._addSiteCookiesToRequestHeaderMap = function(request) {

    var requestUrl = request.getUrl();

    return this._browserSession.cookies.get({ url: requestUrl })
                                       .then(function(cookies) {


                                           var cookieHeaderField = "";

                                           for (var i = 0; i < cookies.length; i++) {

                                               if ( requestUrl.includes("http://") ^ (cookies[i].secure || requestUrl.includes("https://") ) ) {

                                                   request.getHeaderMap().append("Cookie", (cookies[i].name + "=" + cookies[i].value + ";"));

                                               }
                                           }



                                      }.bind(this));

};

ElectronNetworkRequestHandler.prototype._extractNetworkRequesterResponseHeadersToHeaderMap = function(responseHeaders) {

    var responseHeaderMap = new HeaderMap();
    var headerItrerator = responseHeaders.keys();
    var currentHeaderKeyEntry = headerItrerator.next();

    while (!currentHeaderKeyEntry.done) {

        responseHeaderMap.append(currentHeaderKeyEntry.value, responseHeaders.get(currentHeaderKeyEntry.value));

        currentHeaderKeyEntry = headerItrerator.next();
    }

    return responseHeaderMap;

};


ElectronNetworkRequestHandler.prototype.getBrowserSession = function() {

    return this._browserSession;

};

ElectronNetworkRequestHandler.prototype.setBrowserSession = function(browserSession) {

    if ( !(browserSession instanceof Object) ) {

        throw new TypeError("ElectronNetworkRequestHandler setBrowserSession, parameter browserSession expected to be instanceof Object.");

    } else {

        this._browserSession = browserSession;

    }

};

exports.ElectronNetworkRequestHandler = ElectronNetworkRequestHandler;
