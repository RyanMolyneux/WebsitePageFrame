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

    var isResponsible = false;
    var contentType = response.getHeaderMap().get("content-type");

    if ( (response.getStatusCode() === 200 || response.getStatusCode() === 404)
      && contentType != undefined
      && contentType.includes("text/html")) {

        var requestUrlSplit = request.getUrl().split("/", 3);
        var requestBaseUrl = requestUrlSplit[0] + "//" + requestUrlSplit[2];
        var responseHeaderMap = response.getHeaderMap();
        var responseCspFrameAnscestors = "";
        var websitePageFrameCurrentOrigin = cache.get("website-page-frame-origin");


        if ( responseHeaderMap.has("content-security-policy")
          && responseHeaderMap.get("content-security-policy").includes("frame-ancestors")) {

            responseCspFrameAnscestors = responseHeaderMap.get("content-security-policy")
                                                          .split("frame-ancestors")[1]
                                                          .split(";")[0];
        }

        if ( websitePageFrameCurrentOrigin !== undefined
          && requestBaseUrl === websitePageFrameCurrentOrigin
          || responseCspFrameAnscestors.includes(websitePageFrameCurrentOrigin) ) {

            isResponsible = true;

        }

    }

    return isResponsible;

}

exports.WebsitePageFrameResourceResponsePreparation = WebsitePageFrameResourceResponsePreparation;
