function Message(action) {
    this._action = action;
}

Message.prototype.getAction = function() {
    return this._action;
}

Message.prototype.setAction = function(action) {
    this._action = action;
}

exports.Message = Message;
