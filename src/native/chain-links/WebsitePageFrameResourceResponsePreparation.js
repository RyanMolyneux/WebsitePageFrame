var ResponsePreparationChainLink = require("./ResponsePreparationChainLink.js").ResponsePreparationChainLink;
var TaskChainBuilder = require("../../general/builders/TaskChainBuilder.js").TaskChainBuilder;
var RemoveXFrameOptionsChainLink = require("./RemoveXFrameOptionsChainLink.js").RemoveXFrameOptionsChainLink;
var AddFileSchemaToFrameAnscestorsChainLink = require("./AddFileSchemaToFrameAnscestorsChainLink.js").AddFileSchemaToFrameAnscestorsChainLink;

function WebsitePageFrameResourceResponsePreparation() {

    ResponsePreparationChainLink.call(this);

    var taskChainBuilder = new TaskChainBuilder();

    taskChainBuilder.attachChainLink(new RemoveXFrameOptionsChainLink());
    taskChainBuilder.attachChainLink(new AddFileSchemaToFrameAnscestorsChainLink());

    this.setTaskChain(taskChainBuilder);

}

WebsitePageFrameResourceResponsePreparation.prototype = Object.create(ResponsePreparationChainLink.prototype);
WebsitePageFrameResourceResponsePreparation.prototype.constructor = WebsitePageFrameResourceResponsePreparation;

WebsitePageFrameResourceResponsePreparation.prototype.checkIfResponsible = function(request, response, cache) {

    var urlOfRequestSplit = request.getUrl().split("/", 3);
    var urlOfRequest = urlOfRequestSplit[0] + "//" + urlOfRequestSplit[2];
    var responseCspFrameAnscestors = null;

    if (response.getHeaders()["content-security-policy"] !== undefined
     && response.getHeaders()["content-security-policy"].includes("frame-ancestors")) {

        responseCspFrameAnscestors = response.getHeaders()["content-security-policy"].split("frame-ancestors")[1];
        responseCspFrameAnscestors = responseCspFrameAnscestors.split(";")[0];

    }

    var isResponsible = false;


    if ( urlOfRequest === cache.retrieve("website-page-frame-origin")
      || cache.retrieve("website-page-frame-origin") !== undefined
      && responseCspFrameAnscestors !== null
      && responseCspFrameAnscestors.includes(cache.retrieve("website-page-frame-origin")) ) {

        isResponsible = true;

    }

    return isResponsible;

}

WebsitePageFrameResourceResponsePreparation.prototype.handleResponsibility = function(response, cache) {

    var modifiedCopyOfResponse = response;

    for (var i = 0; i < this.getTaskChain().length; i++) {

        modifiedCopyOfResponse = this.getTaskChain()[i].preformTask(modifiedCopyOfResponse);

    }

    return modifiedCopyOfResponse;

};

exports.WebsitePageFrameResourceResponsePreparation = WebsitePageFrameResourceResponsePreparation;
