function Protocol(scheme) {
    this._scheme = scheme;
}

Protocol.prototype.getScheme = function() {
    return this._scheme;
}

Protocol.prototype.setScheme = function(scheme) {
    this._scheme = scheme;
}

exports.Protocol = Protocol;
