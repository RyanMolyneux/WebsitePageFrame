var ResponseModificationChainLink = require("./ResponseModificationChainLink.js").ResponseModificationChainLink;
var HeaderMap = require("../maps/HeaderMap.js").HeaderMap;
var Response = require("../network-messages/Response.js").Response;

function RemoveXFrameOptionsChainLink() {

    ResponseModificationChainLink.call(this);

}

RemoveXFrameOptionsChainLink.prototype = Object.create(ResponseModificationChainLink.prototype);
RemoveXFrameOptionsChainLink.prototype.constructor = RemoveXFrameOptionsChainLink;

RemoveXFrameOptionsChainLink.prototype.preformTask = function(response, cache) {

    if ( response instanceof Response ) {

        response.getHeaderMap().remove("x-frame-options");

    } else {

        throw new TypeError("RemoveXFrameOptionsChainLink preformTask, response parameter expected to be instanceof Response.");

    }

};

exports.RemoveXFrameOptionsChainLink = RemoveXFrameOptionsChainLink;
