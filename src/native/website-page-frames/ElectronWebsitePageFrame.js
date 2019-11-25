var WebsitePageFrame = require("./WebsitePageFrame.js").WebsitePageFrame;
var ElectronNetworkRequestInterceptor = require("../interceptors/ElectronNetworkRequestInterceptor.js").ElectronNetworkRequestInterceptor;
var Interceptor = require("../interceptors/Interceptor.js").Interceptor;
var ElectronNetworkRequestHandler = require("../network-request-handlers/ElectronNetworkRequestHandler.js").ElectronNetworkRequestHandler;
var ElectronCacheFactory = require("../factory/ElectronCacheFactory.js").ElectronCacheFactory;
var ResponsibilityChainBuilder = require("../../general/builders/ResponsibilityChainBuilder.js").ResponsibilityChainBuilder;
var WebsitePageFrameNavigationResponsePreparation = require("../chain-links/WebsitePageFrameNavigationResponsePreparation.js").WebsitePageFrameNavigationResponsePreparation;
var WebsitePageFrameResourceResponsePreparation = require("../chain-links/WebsitePageFrameResourceResponsePreparation.js").WebsitePageFrameResourceResponsePreparation;
var Protocol = require("../protocols/Protocol.js").Protocol;
var session = require("electron").session;

function ElectronWebsitePageFrame(interceptors) {

    WebsitePageFrame.call(this, []);

    if (interceptors == null) {

       var defaultCache = (new ElectronCacheFactory()).create();
       var defaultResponsePreparationChainBuilder = new ResponsibilityChainBuilder();

        defaultResponsePreparationChainBuilder.attachChainLink( new WebsitePageFrameNavigationResponsePreparation() );
        defaultResponsePreparationChainBuilder.attachChainLink( new WebsitePageFrameResourceResponsePreparation() );

        var defaultElectronNetworkRequestHandler = new ElectronNetworkRequestHandler( session.defaultSession,
                                                                                      defaultCache,
                                                                                      defaultResponsePreparationChainBuilder );

        var defaultElectronHttpRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("http"),
                                                                                           defaultElectronNetworkRequestHandler );

        var defaultElectronHttpsRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("https"),
                                                                                            defaultElectronNetworkRequestHandler );

        interceptors = [ defaultElectronHttpRequestInterceptor, defaultElectronHttpsRequestInterceptor ];

    }

    this.setInterceptors(interceptors);

}

ElectronWebsitePageFrame.prototype = Object.create(WebsitePageFrame.prototype);
ElectronWebsitePageFrame.prototype.constructor = ElectronWebsitePageFrame;

ElectronWebsitePageFrame.prototype.setupProtocolInterceptors = function() {

    var websitePageFrameInterceptors = this.getInterceptors();

    for (var i = 0; i < websitePageFrameInterceptors.length; i++) {

        websitePageFrameInterceptors[i].getNetworkRequestHandler()
                                       .getBrowserSession().protocol.interceptStreamProtocol( websitePageFrameInterceptors[i].getProtocol().getScheme(),
                                                                                              websitePageFrameInterceptors[i].interceptProtocolRequest.bind(websitePageFrameInterceptors[i]),
                                                                                              websitePageFrameInterceptors[i].complete);

    }
}

exports.ElectronWebsitePageFrame = ElectronWebsitePageFrame;
