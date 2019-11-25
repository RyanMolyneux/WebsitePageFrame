var NetworkMessage = require("./NetworkMessage.js").NetworkMessage;

function Request(url, method, headers, body) {

    NetworkMessage.call(this, headers, body);

    this._url = null;
    this._method = null;

    this.setUrl(url);
    this.setMethod(method);

}

Request.prototype = Object.create(NetworkMessage.prototype);
Request.prototype.constructor = Request;

Request.prototype.getUrl = function() {

    return this._url;

};

Request.prototype.setUrl = function(url) {


    if ( typeof(url) !== "string" ) {

        throw new TypeError("Request setUrl, expected parameter url to be typeof string but found " + (typeof(url)) + ".");

    } else {

        this._url = url;

    }

};

Request.prototype.getMethod = function() {

    return this._method;

};

Request.prototype.setMethod = function(method) {

    if ( typeof(method) !== "string" ) {

        throw new TypeError("Request setMethod, parameter method expected to be typeof string but found " + (typeof(method)) + ".");

    } else {

        this._method = method;

    }

};

exports.Request = Request;
