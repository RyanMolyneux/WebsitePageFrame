var Script = require("./Script.js").Script;
var Message = require("../../general/messages/Message.js").Message;
var Action = require("../../general/actions/Action.js").Action;
var scriptCode = function() {

    window.addEventListener("message", function(event) {

        if (event.origin === "file://") {

            var message = event.data;

            this.postMessageDataReturned = { ping: "pong", messageSignature: event.data.messageSignature };

            if ( message.action != undefined ) {

                var actionToBeInvoked = new Function(message.action.actionParameters, message.action.actionBody);

                actionToBeInvoked.apply(this, message.action.actionArguements);

            }

            event.source.postMessage(postMessageDataReturned, event.origin);

        }
    });

};

function WebsitePageFrameCrossOriginMessagingScript() {
    Script.call(this, scriptCode);
}

WebsitePageFrameCrossOriginMessagingScript.prototype = Object.create(Script.prototype);
WebsitePageFrameCrossOriginMessagingScript.prototype.constructor = WebsitePageFrameCrossOriginMessagingScript;


exports.WebsitePageFrameCrossOriginMessagingScript = WebsitePageFrameCrossOriginMessagingScript;
