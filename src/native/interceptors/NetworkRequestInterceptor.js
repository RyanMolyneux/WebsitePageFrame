var Interceptor = require("./Interceptor.js").Interceptor;

function NetworkRequestInterceptor(protocol, contentTypeIntercepting, pathFragmentIdentifierIntercepting, networkRequester) {
    Interceptor.call(this, protocol, contentTypeIntercepting, pathFragmentIdentifierIntercepting);

    this._networkRequester = networkRequester;
}

NetworkRequestInterceptor.prototype = Object.create(Interceptor.prototype);
NetworkRequestInterceptor.prototype.constructor = NetworkRequestInterceptor;

NetworkRequestInterceptor.prototype.getNetworkRequester = function() {
    return this._networkRequester;
}

NetworkRequestInterceptor.prototype.setNetworkRequester = function(networkRequester) {
    this._networkRequester = networkRequester;
}

exports.NetworkRequestInterceptor = NetworkRequestInterceptor;
