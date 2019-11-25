var ResponseModificationChainLink = require("./ResponseModificationChainLink.js").ResponseModificationChainLink;
var Response = require("../network-messages/Response.js").Response;

function AddFileSchemaToFrameAnscestorsChainLink() {

    ResponseModificationChainLink.call(this);

}

AddFileSchemaToFrameAnscestorsChainLink.prototype = Object.create(ResponseModificationChainLink.prototype);
AddFileSchemaToFrameAnscestorsChainLink.prototype.constructor = AddFileSchemaToFrameAnscestorsChainLink;

AddFileSchemaToFrameAnscestorsChainLink.prototype.preformTask = function(response) {

    if ( response instanceof Response ) {

        var modifiedCopyOfResponseHeaders = {};
        var responseHeadersObjectKeys = Object.keys(response.getHeaders());

        for (var i = 0; i < responseHeadersObjectKeys.length; i++) {

            if ( responseHeadersObjectKeys[i].toLowerCase() !== "content-security-policy" ) {

                modifiedCopyOfResponseHeaders[ responseHeadersObjectKeys[i] ] = response.getHeaders()[ responseHeadersObjectKeys[i] ];

            } else {

                var contentSecurityPolicySplit = response.getHeaders()[ responseHeadersObjectKeys[i] ].split("frame-ancestors");
                var contentSecurityPolicy = null;

                if ( contentSecurityPolicySplit.length > 1 ) {

                    contentSecurityPolicy =  contentSecurityPolicySplit[0]
                                           + "frame-ancestors file://* "
                                           + contentSecurityPolicySplit[1];

                } else {

                    contentSecurityPolicy = contentSecurityPolicySplit[0];

                }

                modifiedCopyOfResponseHeaders[ responseHeadersObjectKeys[i] ] = contentSecurityPolicy;

            }

        }

        return new Response(modifiedCopyOfResponseHeaders, response.getBody(), response.getStatusCode());

    } else {

        throw new TypeError("AddFileSchemaToFrameAnscestorsChainLink preformTask, parameter response expected to be instanceof Response.");

    }


};

exports.AddFileSchemaToFrameAnscestorsChainLink = AddFileSchemaToFrameAnscestorsChainLink;
