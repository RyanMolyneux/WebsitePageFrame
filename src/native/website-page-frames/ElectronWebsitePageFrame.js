/*
 *    This library provides an alternative in app browser to webview by removing specific restrictions placed upon iframe and more.
 *    Copyright (C) 2019  Ryan Molyneux
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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

        var defaultEmptyElectronHttpRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("http"),
                                                                                                new ElectronNetworkRequestHandler(session.defaultSession) );

        var defaultElectronHttpsRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("https"),
                                                                                            defaultElectronNetworkRequestHandler );

        interceptors = [ defaultEmptyElectronHttpRequestInterceptor, defaultElectronHttpsRequestInterceptor ];

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
