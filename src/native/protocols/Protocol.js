function Protocol(scheme) {
    this._scheme = scheme;
}

Protocol.prototype.getScheme = function() {
    return this._scheme;
}

Protocol.prototype.setScheme = function(scheme) {

    if ( typeof(scheme) !== "string") {

        throw new TypeError( "Protocol setScheme, expected scheme to be typeof string but found"
                           + (typeof(scheme)) + ".");

    } else {

        this._scheme = scheme;
        
    }

}

exports.Protocol = Protocol;
