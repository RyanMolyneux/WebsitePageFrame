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
