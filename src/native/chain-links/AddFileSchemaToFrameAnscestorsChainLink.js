var ResponseModificationChainLink = require("./ResponseModificationChainLink.js").ResponseModificationChainLink;
var Response = require("../network-messages/Response.js").Response;

function AddFileSchemaToFrameAnscestorsChainLink() {

    ResponseModificationChainLink.call(this);

}

AddFileSchemaToFrameAnscestorsChainLink.prototype = Object.create(ResponseModificationChainLink.prototype);
AddFileSchemaToFrameAnscestorsChainLink.prototype.constructor = AddFileSchemaToFrameAnscestorsChainLink;

AddFileSchemaToFrameAnscestorsChainLink.prototype.preformTask = function(response, cache) {

    if ( response instanceof Response ) {

        var contentSecurityPolicy = response.getHeaderMap().get("content-security-policy");

        if ( contentSecurityPolicy !== undefined && contentSecurityPolicy.includes("frame-ancestors") ) {


                var contentSecurityPolicySplit = contentSecurityPolicy.split("frame-ancestors");


                response.getHeaderMap().set("content-security-policy", contentSecurityPolicySplit[0]
                                                                    + "frame-ancestors file://* "
                                                                    + contentSecurityPolicySplit[1] );

        }

    } else {

        throw new TypeError("AddFileSchemaToFrameAnscestorsChainLink preformTask, parameter response expected to be instanceof Response.");

    }


};

exports.AddFileSchemaToFrameAnscestorsChainLink = AddFileSchemaToFrameAnscestorsChainLink;
