var Script = require("./Script.js").Script;
var Message = require("../../general/messages/Message.js").Message;
var Action = require("../../general/actions/Action.js").Action;
var scriptCode = function() {

    var messageHandler = function(event) {

        var message = event.data;

        this.postMessageDataReturned = { ping: "pong"};

        if ( message.action != undefined ) {

            var actionToBeInvoked = new Function(message.action.actionParameters, message.action.actionBody);

            actionToBeInvoked.apply(this, message.action.actionArguements);

        }

        event.source.postMessage(postMessageDataReturned, event.origin);
    }

    window.addEventListener("message", messageHandler);

};

function IframeMessageHandlerScript() {
    Script.call(this, scriptCode);
}

IframeMessageHandlerScript.prototype = Object.create(Script.prototype);
IframeMessageHandlerScript.prototype.constructor = IframeMessageHandlerScript;


IframeMessageHandlerScript.prototype.toHtmlElementString = function() {
    return "<script>"
           + "("
               + this.getScriptCode()
           + ")()"
           + "</script>";
};


exports.IframeMessageHandlerScript = IframeMessageHandlerScript;
