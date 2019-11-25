var ChainLink = require("./ChainLink.js").ChainLink;
var TaskChainBuilder = require("../builders/TaskChainBuilder.js").TaskChainBuilder;

function ResponsibilityChainLink(taskChainBuilder) {

    ChainLink.call(this);

    this._taskChain = null;

    if ( taskChainBuilder == null ) {

      taskChainBuilder = new TaskChainBuilder();

    }

    this.setTaskChain(taskChainBuilder);

}

ResponsibilityChainLink.prototype = Object.create( ChainLink.prototype);
ResponsibilityChainLink.prototype.constructor = ResponsibilityChainLink;

ResponsibilityChainLink.prototype.getTaskChain = function() {

    return this._taskChain;

};

ResponsibilityChainLink.prototype.setTaskChain = function(taskChainBuilder) {

    if ( !(taskChainBuilder instanceof TaskChainBuilder) ) {

        throw new TypeError("ResponsibilityChainLink setTaskChain, expected parameter taskChainBuilder to be instanceof TaskChainBuilder.");

    } else {

        this._taskChain = taskChainBuilder.finishBuild();

    }

};

ResponsibilityChainLink.prototype.checkIfResponsible = function() {

    throw new Error("ResponsibilityChainLink checkIfResponsible, this method is an abstract method and must be overridden.");

};

ResponsibilityChainLink.prototype.handleResponsibility = function() {

    throw new Error("ResponsibilityChainLink handleResponsibility, this method is a abatract method and must be overridden.");

};

exports.ResponsibilityChainLink = ResponsibilityChainLink;
