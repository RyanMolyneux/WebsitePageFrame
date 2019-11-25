var TaskChainLink = require("../chain-links/TaskChainLink.js").TaskChainLink;
var ChainBuilder = require("./ChainBuilder").ChainBuilder;

function TaskChainBuilder() {

    ChainBuilder.call(this);

}

TaskChainBuilder.prototype = Object.create( ChainBuilder.prototype );
TaskChainBuilder.prototype.constructor = TaskChainBuilder;

TaskChainBuilder.prototype.attachChainLink = function(taskChainLink) {

    if ( !(taskChainLink instanceof TaskChainLink) ) {

        throw new TypeError("TaskChainBuilder attachChainLink, expected parameter taskChainLink to be instanceof TaskChainLink.");

    } else {

        this._chain.push(taskChainLink);

        return this;

    }

};

exports.TaskChainBuilder = TaskChainBuilder;
