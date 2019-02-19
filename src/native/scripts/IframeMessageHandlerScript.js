var Script = require("./Script.js").Script;

var scriptCode = function() {

    var messageHandler = function(event) {

        event.data.getAction().call(this);

    }

    window.addEventListener("message", messageHandler);
};

function IframeMessageHandlerScript() {
    Script.call(this, scriptCode);
}

IframeMessageHandlerScript.prototype = Object.create(Script.prototype);
IframeMessageHandlerScript.prototype.constructor = IframeMessageHandlerScript;

exports.IframeMessageHandlerScript = IframeMessageHandlerScript;
