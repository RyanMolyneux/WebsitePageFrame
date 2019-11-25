var TaskChainLink = require("../../general/chain-links/TaskChainLink.js").TaskChainLink;

function ResponseModificationChainLink() {

    TaskChainLink.call(this);

}

ResponseModificationChainLink.prototype = Object.create(TaskChainLink.prototype);
ResponseModificationChainLink.prototype.constructor = ResponseModificationChainLink;

exports.ResponseModificationChainLink = ResponseModificationChainLink;
