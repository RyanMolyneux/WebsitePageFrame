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
