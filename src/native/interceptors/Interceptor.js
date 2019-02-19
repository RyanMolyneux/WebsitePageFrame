function Interceptor(protocol) {
    this._protocol = protocol;
}

Interceptor.prototype.getProtocol = function() {
    return this._protocol;
}

Interceptor.prototype.setProtocol = function(protocol) {
    this._protocol = protocol;
}

exports.Interceptor = Interceptor;
