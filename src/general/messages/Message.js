var Action = require("../actions/Action.js").Action;

function Message(action) {
    this._action = action;
}

Message.prototype.getAction = function() {
    return this._action;
};

Message.prototype.setAction = function(action) {
    this._action = action;
};

Message.prototype.toJsonFormat = function() {
    return {
        "action": this.getAction().toJsonFormat()
    };
}

Message.prototype.fromJsonFormat = function(jsonFormattedMessage) {
    var action = new Action();
    action.fromJsonFormat(jsonFormattedMessage.action);

    this.setAction(action);
}

exports.Message = Message;
