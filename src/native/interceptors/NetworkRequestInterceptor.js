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
