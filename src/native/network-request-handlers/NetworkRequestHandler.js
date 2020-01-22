var Cache = require("../maps/Cache.js").Cache;
var ResponsibilityChainBuilder = require("../../general/builders/ResponsibilityChainBuilder.js").ResponsibilityChainBuilder;

function NetworkRequestHandler(networkRequester, cache, responsePreparationChainBuilder) {

    this._networkRequester = null;
    this._cache = null;
    this._responsePreparationChain = null;

    if ( cache == null ) {

        cache = new Cache();

    }

    if ( responsePreparationChainBuilder == null ) {

        responsePreparationChainBuilder = new ResponsibilityChainBuilder();

    }

    this.setNetworkRequester(networkRequester);
    this.setCache(cache);
    this.setResponsePreparationChain(responsePreparationChainBuilder);

}

NetworkRequestHandler.prototype.handleNetworkRequest = function(request) {

    throw new Error("NetworkRequestHandler handleNetworkRequest, this method is a absract method and must be overridden before being used.");

};

NetworkRequestHandler.prototype._findResponsePreparationChainLink = function(request, response) {

    for (var i = 0; i < this._responsePreparationChain.length; i++) {

        if ( this._responsePreparationChain[i].checkIfResponsible(request, response, this._cache) ) {

            return this._responsePreparationChain[i];

        }

    }

    return null;

};

NetworkRequestHandler.prototype.getNetworkRequester = function() {

    return this._networkRequester;

};

NetworkRequestHandler.prototype.setNetworkRequester = function(networkRequester) {

    if ( !(networkRequester instanceof Object) ) {

        throw new TypeError("NetworkRequestHandler setNetworkRequester, parameter networkRequester expected to be instanceof Object.");

    } else {

        this._networkRequester = networkRequester;

    }

};

NetworkRequestHandler.prototype.getCache = function() {

    return this._cache;

};

NetworkRequestHandler.prototype.setCache = function(cache) {

    if ( !(cache instanceof Cache) ) {

        throw new TypeError("NetworkRequestHandler setCache, parameter cache expected to be instanceof Cache.");

    } else {

        this._cache = cache;

    }

};

NetworkRequestHandler.prototype.getResponsePreparationChain = function() {

    return this._responsePreparationChain;

};

NetworkRequestHandler.prototype.setResponsePreparationChain = function(responsePreparationChainBuilder) {

    if ( !(responsePreparationChainBuilder instanceof ResponsibilityChainBuilder) ) {

        throw new TypeError( "NetworkRequestHandler setResponsePreparationChain, parameter responsePreparationChainBuilder expected to be "
                           + "instanceof ResponsibilityChainBuilder.");

    } else {

        this._responsePreparationChain = responsePreparationChainBuilder.finishBuild();

    }

};

exports.NetworkRequestHandler = NetworkRequestHandler;
