var Interceptor = require("../interceptors/Interceptor.js").Interceptor;

function WebsitePageFrame(interceptors) {

    this._interceptors = null;


    this.setInterceptors(interceptors);

}

WebsitePageFrame.prototype.getInterceptors = function() {

    return this._interceptors;

}

WebsitePageFrame.prototype.setInterceptors = function(interceptors) {

    if ( !(interceptors instanceof Array) ) {

        throw new TypeError( "WebsitePageFrame setInterceptors, parameter interceptors expected to be instanceof Array.");

    } else if ( !( this._checkIfEmptyOrContainsOnlyInterceptors(interceptors) ) ) {

        throw new TypeError( "WebsitePageFrame setInterceptors, parameter interceptors Array expected to contain only "
                           + "instances of Interceptor or inheriting classes of Interceptor.");

    } else {

        this._interceptors = interceptors;

    }

}

WebsitePageFrame.prototype._checkIfEmptyOrContainsOnlyInterceptors = function(possiblePureInterceptorsArray) {

    var containsOnlyInterceptors = true;

    for (var i = 0; i < possiblePureInterceptorsArray.length; i++) {

        if ( !(possiblePureInterceptorsArray[i] instanceof Interceptor) ) {

            containsOnlyInterceptors = false;

            return containsOnlyInterceptors;

        }

    }

    return containsOnlyInterceptors;

};

WebsitePageFrame.prototype.setupProtocolInterceptors = function() {

    throw new Error("WebsitePageFrame setupProtocolInterceptors, this method is an abastract method which must be overridden.");

};

exports.WebsitePageFrame = WebsitePageFrame;
