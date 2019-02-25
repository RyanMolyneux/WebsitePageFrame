//- web client side scripts
var WebsitePageFrameClient = require("./src/client/website-page-frame-clients/WebsitePageFrameClient.js").WebsitePageFrameClient;

//- general scripts
var Message = require("./src/general/messages/Message.js").Message;
var Action = require("./src/general/actions/Action.js").Action;

//- native device scripts
var ElectronNetworkRequestInterceptor = require("./src/native/interceptors/ElectronNetworkRequestInterceptor.js").ElectronNetworkRequestInterceptor;
var NetworkRequestInterceptor = require("./src/native/interceptors/NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var Interceptor = require("./src/native/interceptors/Interceptor.js").Interceptor;
var Protocol = require("./src/native/protocols/Protocol.js").Protocol;
var IframeMessageHandlerScript = require("./src/native/scripts/IframeMessageHandlerScript.js").IframeMessageHandlerScript;
var Script = require("./src/native/scripts/Script.js").Script;
var ElectronWebsitePageFrame = require("./src/native/website-page-frames/ElectronWebsitePageFrame.js").ElectronWebsitePageFrame;
var WebsitePageFrame = require("./src/native/website-page-frames/WebsitePageFrame.js").WebsitePageFrame;


exports.client = {
    "WebsitePageFrameClient": WebsitePageFrameClient
};

exports.general = {
    "Message": Message,
    "Action": Action
};

exports.native = {
    "ElectronNetworkRequestInterceptor": ElectronNetworkRequestInterceptor,
    "NetworkRequestInterceptor": NetworkRequestInterceptor,
    "Interceptor": Interceptor,
    "Protocol": Protocol,
    "IframeMessageHandlerScript": IframeMessageHandlerScript,
    "Script": Script,
    "ElectronWebsitePageFrame": ElectronWebsitePageFrame,
    "WebsitePageFrame": WebsitePageFrame
};
