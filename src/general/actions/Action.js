function setActionParameters(actionParameters) {
    this._actionParameters = actionParameters;
}

function setActionArguements(actionArguements) {
    this._actionArguements = actionArguements;
}

function setActionBody(actionBody) {

    if (actionBody instanceof Function) {

        this._actionBody = "(" + actionBody + ")()"

    } else {
        throw new Error("Action.setActionBody method parameter actionBody must an instance of type Function");
    }
}


function Action(actionParameters, actionArguements, actionBody) {

    this._actionParameters = null;
    this._actionArguements = null;
    this._actionBody = null;


    if (actionParameters ==  null) {
        actionParameters = [];
    }

    if (actionArguements == null) {
        actionArguements = [];
    }

    if (actionBody == null) {
        actionBody = function() {};
    }

    this.setActionParameters(actionParameters);
    this.setActionArguements(actionArguements);
    this.setActionBody(actionBody);

}

Action.prototype.getActionParameters = function() {
    return this._actionParameters;
};

Action.prototype.setActionParameters = setActionParameters;

Action.prototype.getActionArguements = function() {
    return this._actionArguements;
};

Action.prototype.setActionArguements = setActionArguements;

Action.prototype.getActionBody = function() {
    return this._actionBody;
};

Action.prototype.setActionBody = setActionBody;

Action.prototype.toJsonFormat = function() {

    return {
        "actionParameters": this.getActionParameters(),
        "actionArguements": this.getActionArguements(),
        "actionBody": this.getActionBody()
    };
};

Action.prototype.fromJsonFormat = function(jsonFormattedAction) {
    this.setActionParameters(jsonFormattedAction.actionParameters);
    this.setActionArguements(jsonFormattedAction.actionArguements);

    var defaultActionBody = function() {};
    this.setActionBody(defaultActionBody);
};

exports.Action = Action;
