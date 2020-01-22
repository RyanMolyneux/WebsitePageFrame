var ResponsibilityChainLink = require("../../general/chain-links/ResponsibilityChainLink.js").ResponsibilityChainLink;

function ResponsePreparationChainLink(taskChainBuilder) {

    ResponsibilityChainLink.call(this, taskChainBuilder);

}

ResponsePreparationChainLink.prototype = Object.create(ResponsibilityChainLink.prototype);
ResponsePreparationChainLink.prototype.constructor = ResponsePreparationChainLink;

ResponsePreparationChainLink.prototype.checkIfResponsible = function(request, response, cache) {

    throw new Error("ResponsePreparationChainLink checkIfResponsible, this is a abstract method which should be overridden before being used.");

};

ResponsePreparationChainLink.prototype.handleResponsibility = function(response, cache) {

    for (var i = 0; i < this.getTaskChain().length; i++) {

        this.getTaskChain()[i].preformTask(response, cache);

    }

};

exports.ResponsePreparationChainLink = ResponsePreparationChainLink;
