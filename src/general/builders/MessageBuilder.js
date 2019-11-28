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


var Builder = require("./Builder.js").Builder;
var Message = require("../messages/Message.js").Message;

function _setMessageSignatureGenerator(messageSignatureGenerator) {

    if ( !(messageSignatureGenerator instanceof Function) ) {

        throw new TypeError("MessageBuilder _setMessageSignatureGenerator, expected parameter messageSignatureGenerator to be instanceof Function.");

    } else {

        this._messageSignatureGenerator = messageSignatureGenerator;

    }

}

function MessageBuilder(messageSignatureGenerator) {

    Builder.call(this);

    this._messageSignatureGenerator = null;

    this._setMessageSignatureGenerator(messageSignatureGenerator);

    this._messageBeingBuilt = new Message(null, this._messageSignatureGenerator());

}

MessageBuilder.prototype = Object.create(Builder);
MessageBuilder.prototype.constructor = MessageBuilder;

MessageBuilder.prototype._setMessageSignatureGenerator = _setMessageSignatureGenerator;

MessageBuilder.prototype.attachAction = function(actionToBeAttachedToMessage) {

    this._messageBeingBuilt.setAction(actionToBeAttachedToMessage);

    return this;

};

MessageBuilder.prototype.finishBuild = function() {

    var messageBuilt = this._messageBeingBuilt;

    this._messageBeingBuilt = new Message(null, this._messageSignatureGenerator());

    return messageBuilt;

};


exports.MessageBuilder = MessageBuilder;
