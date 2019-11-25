var NetworkRequestHandler = require("./NetworkRequestHandler.js").NetworkRequestHandler;
var Request = require("../network-messages/Request.js").Request;
var Response = require("../network-messages/Response.js").Response;
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

         var requestResponse = null;

        return this._attachSiteCookiesToRequestHeader(request).then(function() {

            return this.getNetworkRequester()(request.getUrl(), {

              headers: request.getHeaders(),
              method: request.getMethod()

            });

        }.bind(this)).then(function(response) {

            requestResponse = new Response( this._formatResponseHeadersToObject(response.headers),
                                            "",
                                            response.status);

            return response.text();

        }.bind(this)).then(function(responseBody) {

            requestResponse.setBody(responseBody);

            for (var i = 0; i < this.getResponsePreparationChain().length; i++) {

                var responsePreparationChainLink = this.getResponsePreparationChain()[i];

                if ( responsePreparationChainLink.checkIfResponsible( request,
                                                                      requestResponse,
                                                                      this.getCache() ) ) {

                    requestResponse = responsePreparationChainLink.handleResponsibility(requestResponse, this.getCache());
                    i = this.getResponsePreparationChain().length;

                }

            }

            return requestResponse;

        }.bind(this))


    } else {

        throw new TypeError("ElectronNetworkRequestHandler handleNetworkRequest, parameter request expected to be instanceof Request.");

    }

};

ElectronNetworkRequestHandler.prototype._attachSiteCookiesToRequestHeader = function(request) {



    return this._browserSession.cookies.get({ url: request.getUrl() })
                                       .then(function(cookies) {
                                           var cookieHeaderField = "";

                                           for (var i = 0; i < cookies.length; i++) {

                                               cookieHeaderField += (cookies[i].name + "=" + cookies[i].value + ";");

                                           }

                                           request.getHeaders().Cookie = cookieHeaderField;

                                      }.bind(this));

};

ElectronNetworkRequestHandler.prototype._formatResponseHeadersToObject = function(responseHeaders) {

    var responseHeadersFormated = {};
    var headerItrerator = responseHeaders.keys();
    var currentHeaderKeyEntry = headerItrerator.next();

    while (!currentHeaderKeyEntry.done) {

        responseHeadersFormated[currentHeaderKeyEntry.value.toLowerCase()] = responseHeaders.get(currentHeaderKeyEntry.value);

        currentHeaderKeyEntry = headerItrerator.next();
    }

    return responseHeadersFormated;

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