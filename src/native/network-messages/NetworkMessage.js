function NetworkMessage(headers, body) {

    this._headers = null;
    this._body = null;

    this.setHeaders(headers);
    this.setBody(body);


}

NetworkMessage.prototype.getHeaders = function() {

    return this._headers;

};

NetworkMessage.prototype.setHeaders = function(headers) {

    if ( !(headers instanceof Object) ) {

        throw new TypeError("NetworkMessage setHeaders, parameter headers expected to be instanceof Object.");

    } else {

        this._headers = headers;

    }

};

NetworkMessage.prototype.getBody = function() {

    return this._body;

};

NetworkMessage.prototype.setBody = function(body) {

    if ( typeof(body) !== "string" && body !== null ) {

        throw new TypeError("NetworkMessage setBody, parameter body expected to be typeof string or to be null but found " + (typeof(body)) + ".");

    } else {

        this._body = body;

    }

}

exports.NetworkMessage = NetworkMessage;
