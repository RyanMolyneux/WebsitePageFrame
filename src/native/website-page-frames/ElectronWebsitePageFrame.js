var WebsitePageFrame = require("./WebsitePageFrame.js").WebsitePageFrame;

function ElectronWebsitePageFrame(interceptors) {

    WebsitePageFrame.call(this, interceptors);

    this._WEBSITE_URL_UNIQUE_FRAGEMENT = "websitePageFrame";

}

ElectronWebsitePageFrame.prototype = Object.create(WebsitePageFrame.prototype);
ElectronWebsitePageFrame.prototype.constructor = ElectronWebsitePageFrame;

ElectronWebsitePageFrame.prototype.setupProtocolInterceptors = function(browserSession) {

    var websitePageFrameInterceptors = this.getInterceptors();

    for (var i = 0; i < websitePageFrameInterceptors.length; i++) {

        browserSession.protocol.interceptStreamProtocol(websitePageFrameInterceptors[i].getProtocol().getScheme(),
                                                        websitePageFrameInterceptors[i].interceptProtocolRequest.bind(websitePageFrameInterceptors[i]),
                                                        websitePageFrameInterceptors[i].complete);

    }
}

exports.ElectronWebsitePageFrame = ElectronWebsitePageFrame;
