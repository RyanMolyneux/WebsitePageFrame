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
