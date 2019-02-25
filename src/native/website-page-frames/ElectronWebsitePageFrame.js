var WebsitePageFrame = require("./WebsitePageFrame.js").WebsitePageFrame;
var ElectronNetworkRequestInterceptor = require("../interceptors/ElectronNetworkRequestInterceptor.js").ElectronNetworkRequestInterceptor;
var IframeMessageHandlerScript = require("../scripts/IframeMessageHandlerScript.js").IframeMessageHandlerScript;
var Protocol = require("../protocols/Protocol.js").Protocol;

function ElectronWebsitePageFrame(interceptors) {

    WebsitePageFrame.call(this, []);

    if (interceptors == undefined) {

        var defaultElectronWebsitePageFrameInterceptorScripts = [ new IframeMessageHandlerScript() ];

        var defaultElectronHttpRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("http"),
                                                                                           this.getWebsiteUrlUniqueFragment(),
                                                                                           defaultElectronWebsitePageFrameInterceptorScripts );
        var defaultElectronHttpsRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("https"),
                                                                                            this.getWebsiteUrlUniqueFragment(),
                                                                                            defaultElectronWebsitePageFrameInterceptorScripts );

        interceptors = [ defaultElectronHttpRequestInterceptor, defaultElectronHttpsRequestInterceptor ];
    }

    this.setInterceptors(interceptors);

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
