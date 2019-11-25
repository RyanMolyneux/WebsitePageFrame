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
