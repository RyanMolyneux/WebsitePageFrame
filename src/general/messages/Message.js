/*
 *    This library provides an alternative in app browser to webview by removing specific restrictions placed upon iframe and more.
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

var Action = require("../actions/Action.js").Action;

function setAction(action) {

    if ( !(action instanceof Action) ) {

        throw new TypeError("Message setAction, expected parameter to be instance of Action.");

    } else {

        this._action = action;

    }

}

function setMessageSignature(messageSignature) {

    if ( typeof(messageSignature) !== "number" ) {

        throw new TypeError("Message _setMessageSignature, expected parameter messageSignature to be typeof 'number' but found " + ( typeof(messageSignature) ) );

    } else if ( (messageSignature % 1) !== 0 ) {

        throw new TypeError("Message _setMessageSignature, exepected parameter messageSignature to be integer but found float.");

    } else {

        this._messageSignature = messageSignature;

    }


}

function Message(action, messageSignature) {

    this._action = null;
    this._messageSignature = null;

    if ( action == null ) {

        action = new Action();

    }

    if ( messageSignature == null ) {

        messageSignature = 0;

    }

    this.setAction(action);
    this.setMessageSignature(messageSignature);

}

Message.prototype.toJsonFormat = function() {
    return {
        "action": this.getAction().toJsonFormat(),
        "messageSignature": this.getMessageSignature()
    };
}

Message.prototype.fromJsonFormat = function(jsonFormattedMessage) {
    var action = new Action();

    action.fromJsonFormat(jsonFormattedMessage.action);

    this.setAction(action);
    this.setMessageSignature(jsonFormattedMessage.messageSignature);
}

Message.prototype.getAction = function() {
    return this._action;
};

Message.prototype.setAction = setAction;

Message.prototype.getMessageSignature = function() {
    return this._messageSignature;
};

Message.prototype.setMessageSignature = setMessageSignature;


exports.Message = Message;
