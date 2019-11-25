var ResponseModificationChainLink = require("./ResponseModificationChainLink.js").ResponseModificationChainLink;
var Response = require("../network-messages/Response.js").Response;

function RemoveXFrameOptionsChainLink() {

    ResponseModificationChainLink.call(this);

}

RemoveXFrameOptionsChainLink.prototype = Object.create(ResponseModificationChainLink.prototype);
RemoveXFrameOptionsChainLink.prototype.constructor = RemoveXFrameOptionsChainLink;

RemoveXFrameOptionsChainLink.prototype.preformTask = function(response) {

    if ( response instanceof Response ) {

        var modifiedCopyOfResponseHeaders = {};
        var responseHeadersObjectKeys = Object.keys(response.getHeaders());

        for (var i = 0; i < responseHeadersObjectKeys.length; i++) {

            if ( responseHeadersObjectKeys[i] !== "x-frame-options" && responseHeadersObjectKeys[i] !== "content-encoding") {

                modifiedCopyOfResponseHeaders[ responseHeadersObjectKeys[i] ] = response.getHeaders()[ responseHeadersObjectKeys[i] ];

            }

        }

        return new Response(modifiedCopyOfResponseHeaders, response.getBody(), response.getStatusCode());

    } else {

        throw new TypeError("RemoveXFrameOptionsChainLink preformTask, response parameter expected to be instanceof Response.");

    }

};

exports.RemoveXFrameOptionsChainLink = RemoveXFrameOptionsChainLink;
