var ElectronWebsitePageFrame = require("../../src/native/website-page-frames/ElectronWebsitePageFrame.js").ElectronWebsitePageFrame;
var ElectronCacheFactory = require("../../src/native/factory/ElectronCacheFactory.js").ElectronCacheFactory;
var WebsitePageFrameNavigationResponsePreparation = require("../../src/native/chain-links/WebsitePageFrameNavigationResponsePreparation.js").WebsitePageFrameNavigationResponsePreparation;
var WebsitePageFrameResourceResponsePreparation = require("../../src/native/chain-links/WebsitePageFrameResourceResponsePreparation.js").WebsitePageFrameResourceResponsePreparation;
var ElectronNetworkRequestHandler = require("../../src/native/network-request-handlers/ElectronNetworkRequestHandler.js").ElectronNetworkRequestHandler;
var ElectronNetworkRequestInterceptor = require("../../src/native/interceptors/ElectronNetworkRequestInterceptor.js").ElectronNetworkRequestInterceptor;
var ResponsibilityChainBuilder = require("../../src/general/builders/ResponsibilityChainBuilder.js").ResponsibilityChainBuilder;
var Protocol = require("../../src/native/protocols/Protocol.js").Protocol;
const { app, session, protocol, BrowserWindow } = require("electron");
let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({ width: 800,
                                    height: 600,
                                    webPreferences: {
                                        preload: `${__dirname}/preload.js`,
                                    }
                                  });

    appWindow.loadFile(`${__dirname}/index.html`);


    var cache = (new ElectronCacheFactory()).create();
    var responsePreparationChainBuilder = new ResponsibilityChainBuilder();

     responsePreparationChainBuilder.attachChainLink( new WebsitePageFrameNavigationResponsePreparation() );
     responsePreparationChainBuilder.attachChainLink( new WebsitePageFrameResourceResponsePreparation() );

     var electronNetworkRequestHandler = new ElectronNetworkRequestHandler( session.defaultSession,
                                                                                   cache,
                                                                                   responsePreparationChainBuilder );


     var electronHttpRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("http"),
                                                                                 electronNetworkRequestHandler );

     interceptors = [ electronHttpRequestInterceptor ];


    var electronWebsitePageFrame = new ElectronWebsitePageFrame(interceptors);

    electronWebsitePageFrame.setupProtocolInterceptors();


    appWindow.on("closed", () => {
        appWindow = null;
    });
}
app.on("ready", createWindow);
