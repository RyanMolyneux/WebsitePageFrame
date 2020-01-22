var HeaderMap = require("../maps/HeaderMap.js").HeaderMap;

function NetworkMessage(headerMap, body) {

    this._headerMap = null;
    this._body = null;

    this.setHeaderMap(headerMap);
    this.setBody(body);

}

NetworkMessage.prototype.getHeaderMap = function() {

    return this._headerMap;

};

NetworkMessage.prototype.setHeaderMap = function(headerMap) {

    if ( !(headerMap instanceof HeaderMap) ) {

        throw new TypeError("NetworkMessage setHeaderMap, parameter headerMap expected to be instanceof HeaderMap.");

    } else {

        this._headerMap = headerMap;

    }

};

NetworkMessage.prototype.getBody = function() {

    return this._body;

};

NetworkMessage.prototype.setBody = function(body) {

    this._body = body;

}

exports.NetworkMessage = NetworkMessage;
