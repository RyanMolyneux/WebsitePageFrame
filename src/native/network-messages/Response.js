var NetworkMessage = require("./NetworkMessage.js").NetworkMessage;

function Response(headers, body, statusCode) {

    NetworkMessage.call(this, headers, body);

    this._statusCode = null;

    this.setStatusCode(statusCode);

}

Response.prototype = Object.create(NetworkMessage.prototype);
Response.prototype.constructor = Response;

Response.prototype.getStatusCode = function() {

    return this._statusCode;

};

Response.prototype.setStatusCode = function(statusCode) {

    if ( typeof(statusCode) !== "number" ) {

      throw new TypeError("Response setStatusCode, parameter statusCode expected to be typeof number but found " + (typeof(statusCode)) + ".");

    } else if ( (statusCode % 1) !== 0 ) {

      throw new TypeError("Response setStatusCode, arguement passed to parameter statusCode expected to be integer but found " + (statusCode) + ".");

    } else {

        this._statusCode = statusCode;

    }

}

exports.Response = Response;
