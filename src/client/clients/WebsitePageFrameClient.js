/*
 *    This library provides a way to allow browser based programs to have cross parent to child window communication through code.
 *    Copyright (C) 2019  Ryan Molyneux
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


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

        setTimeout(function() {

            if (this.getResponse() === null) {

                this._setPreviousMessageSignature(null);

                throw new Error( "WebsitePageFrameClient.sendMessage, response expected within "
                               + this.getResponseExpectedByTimeoutMilliseconds() + " milliseconds was not returned.");

            }

        }.bind(this), this.getResponseExpectedByTimeoutMilliseconds());

    } else {

        throw new Error("WebsitePageFrameClient sendMessage, sendMessagePreChecks returned false meaning that message is not able to be sent for.");

    }

};

WebsitePageFrameClient.prototype.sendMessagePreChecks = function(message) {

    return this.isConnectionReady() && this._previousMessageSignature === null && (message instanceof Message);

};

WebsitePageFrameClient.prototype.setClientConnection = setClientConnection;

WebsitePageFrameClient.prototype.getPreviousMessageSignature = function() {

    return this._previousMessageSignature;

};

WebsitePageFrameClient.prototype._setPreviousMessageSignature = _setPreviousMessageSignature;


exports.WebsitePageFrameClient = WebsitePageFrameClient;

var WebsitePageFrameConnection = require("../connections/WebsitePageFrameConnection.js").WebsitePageFrameConnection;
