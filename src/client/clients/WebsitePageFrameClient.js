var Client = require("../../general/clients/Client.js").Client;
var Message = require("../../general/messages/Message.js").Message;


function setClientConnection(websitePageFrameClientConnection) {

    if ( !(websitePageFrameClientConnection instanceof WebsitePageFrameConnection) && websitePageFrameClientConnection !== null) {

        throw new TypeError( "WebsitePageFrameClient setClientConnection, parameter websitePageFrameClientConnection expected to be instanceof "
                           + "WebsitePageFrameConnection.");

    } else {

        this._clientConnection = websitePageFrameClientConnection;

    }

}

function _setPreviousMessageSignature(previousMessageSignature) {

    if ( typeof(previousMessageSignature) !== "number" && previousMessageSignature !== null ) {

        throw new TypeError( "WebsitePageFrameClient _setPreviousMessageSignature, parameter previousMessageSignature expected to be typeof number "
                           + "or null but found " + (typeof(previousMessageSignature)) + ".");

    } else if ( (previousMessageSignature % 1) !== 0 ) {

        throw new TypeError( "WebsitePageFrameClient _setPreviousMessageSignature, parameter previousMessageSignature to be integer but "
                           + "found " + previousMessageSignature);

    } else {

        this._previousMessageSignature = previousMessageSignature;

    }

}


function WebsitePageFrameClient(websitePageFrameClientConnection, responseExpectedByTimeoutMilliseconds) {

    Client.call(this, websitePageFrameClientConnection, responseExpectedByTimeoutMilliseconds);

    this._previousMessageSignature = null;


    try {

        this._setupMessageResponseListener();

    } catch(error) {

        console.log(error);

    }


}

WebsitePageFrameClient.prototype = Object.create(Client.prototype);
WebsitePageFrameClient.prototype.constructor = WebsitePageFrameClient;

WebsitePageFrameClient.prototype._setupMessageResponseListener = function() {

    window.addEventListener("message", function(event) {

        if ( event.origin === this.getClientConnection().getChildBrowsingContextCurrentOrigin()
          && event.data.messageSignature === this.getPreviousMessageSignature() ) {

            this._setResponse(event.data);
            this._setPreviousMessageSignature(null);

        }


    }.bind(this));

}

WebsitePageFrameClient.prototype.sendMessage = function(message) {

    if ( this.sendMessagePreChecks(message) ) {

        this._setResponse(null);
        this._setPreviousMessageSignature(message.getMessageSignature());
        this.getClientConnection().getChildBrowsingContext().postMessage(message.toJsonFormat(), this.getClientConnection().getChildBrowsingContextCurrentOrigin());

        setTimeout(function(currentMessageSentMessageSignature) {

            if (this.getResponse() === null && (currentMessageSentMessageSignature === this.getPreviousMessageSignature()) ) {

                this._setPreviousMessageSignature(null);

                throw new Error( "WebsitePageFrameClient.sendMessage, response expected within "
                               + this.getResponseExpectedByTimeoutMilliseconds() + " milliseconds was not returned.");

            }

        }.bind(this, this.getPreviousMessageSignature()), this.getResponseExpectedByTimeoutMilliseconds());

    } else {

        throw new Error("WebsitePageFrameClient sendMessage, sendMessagePreChecks returned false meaning that message is not able to be sent for.");

    }

};

WebsitePageFrameClient.prototype.sendMessagePreChecks = function(message) {

    return (message instanceof Message) && this.isConnectionReady() && this._previousMessageSignature === null;

};

WebsitePageFrameClient.prototype.setClientConnection = setClientConnection;

WebsitePageFrameClient.prototype.getPreviousMessageSignature = function() {

    return this._previousMessageSignature;

};

WebsitePageFrameClient.prototype._setPreviousMessageSignature = _setPreviousMessageSignature;


exports.WebsitePageFrameClient = WebsitePageFrameClient;

var WebsitePageFrameConnection = require("../connections/WebsitePageFrameConnection.js").WebsitePageFrameConnection;
