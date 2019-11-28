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


WebsitePageFrameCrossOriginMessagingScript.prototype.toHtmlElementString = function() {
    return "<script>"
           + "("
               + this.getScriptCode()
           + ")()"
           + "</script>";
};


exports.WebsitePageFrameCrossOriginMessagingScript = WebsitePageFrameCrossOriginMessagingScript;
