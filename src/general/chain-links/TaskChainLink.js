var ChainLink = require("./ChainLink.js").ChainLink;

function TaskChainLink() {

    ChainLink.call(this);

}

TaskChainLink.prototype = Object.create(TaskChainLink.prototype);
TaskChainLink.prototype.constructor = TaskChainLink;

TaskChainLink.prototype.preformTask = function() {

    throw new Error( "TaskChainLink preformTask, this is an abstract method and as such cannot be called, it "
                   + "should be supplied implemntation through TaskChainLinks subclasses.");

};

exports.TaskChainLink = TaskChainLink;
