

var ElectronNetworkRequestInterceptor = require("./src/native/interceptors/ElectronNetworkRequestInterceptor.js").ElectronNetworkRequestInterceptor;
var NetworkRequestInterceptor = require("./src/native/interceptors/NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var Interceptor = require("./src/native/interceptors/Interceptor.js").Interceptor;
var ElectronNetworkRequestHandler = require("./src/native/network-request-handlers/ElectronNetworkRequestHandler.js").ElectronNetworkRequestHandler;
var NetworkRequestHandler = require("./src/native/network-request-handlers/NetworkRequestHandler.js").NetworkRequestHandler;
var Response = require("./src/native/network-messages/Response.js").Response;
var Request = require("./src/native/network-messages/Request.js").Request;
var NetworkMessage = require("./src/native/network-messages/NetworkMessage.js").NetworkMessage;
var Protocol = require("./src/native/protocols/Protocol.js").Protocol;
var WebsitePageFrameCrossOriginMessagingScript = require("./src/native/scripts/WebsitePageFrameCrossOriginMessagingScript.js").WebsitePageFrameCrossOriginMessagingScript;
var Script = require("./src/native/scripts/Script.js").Script;
var ElectronCacheFactory = require("./src/native/factory/ElectronCacheFactory.js").ElectronCacheFactory;
var ElectronWebsitePageFrame = require("./src/native/website-page-frames/ElectronWebsitePageFrame.js").ElectronWebsitePageFrame;
var WebsitePageFrame = require("./src/native/website-page-frames/WebsitePageFrame.js").WebsitePageFrame;
var ResponsibilityChainBuilder = require("./src/general/builders/ResponsibilityChainBuilder.js").ResponsibilityChainBuilder;
var TaskChainBuilder = require("./src/general/builders/TaskChainBuilder.js").TaskChainBuilder;
var ChainBuilder = require("./src/general/builders/ChainBuilder.js").ChainBuilder;
var Builder = require("./src/general/builders/Builder.js").Builder;
var WebsitePageFrameNavigationResponsePreparation = require("./src/native/chain-links/WebsitePageFrameNavigationResponsePreparation.js").WebsitePageFrameNavigationResponsePreparation;
var WebsitePageFrameResourceResponsePreparation = require("./src/native/chain-links/WebsitePageFrameResourceResponsePreparation.js").WebsitePageFrameResourceResponsePreparation;
var ResponsePreparationChainLink = require("./src/native/chain-links/ResponsePreparationChainLink.js").ResponsePreparationChainLink;
var ResponsibilityChainLink = require("./src/general/chain-links/ResponsibilityChainLink.js").ResponsibilityChainLink;
var BodyScriptInjection = require("./src/native/chain-links/BodyScriptInjection.js").BodyScriptInjection;
var RemoveXFrameOptionsChainLink = require("./src/native/chain-links/RemoveXFrameOptionsChainLink.js").RemoveXFrameOptionsChainLink;
var AddFileSchemaToFrameAnscestorsChainLink = require("./src/native/chain-links/AddFileSchemaToFrameAnscestorsChainLink.js").AddFileSchemaToFrameAnscestorsChainLink;
var ResponseModificationChainLink = require("./src/native/chain-links/ResponseModificationChainLink.js").ResponseModificationChainLink;
var TaskChainLink = require("./src/general/chain-links/TaskChainLink.js").TaskChainLink;
var ChainLink = require("./src/general/chain-links/ChainLink.js").ChainLink;
var Client = require("./src/general/clients/Client.js").Client;
var Connection = require("./src/general/connections/Connection.js").Connection;
var HeaderMap = require("./src/native/maps/HeaderMap.js").HeaderMap;
var Cache = require("./src/native/maps/Cache.js").Cache;
var Map = require("./src/general/maps/Map.js").Map;
var Thread = require("./src/general/threads/Thread.js").Thread;
var Message = require("./src/general/messages/Message.js").Message;
var Action = require("./src/general/actions/Action.js").Action;

exports.general = {

    "ResponsibilityChainLink": ResponsibilityChainLink,
    "TaskChainLink": TaskChainLink,
    "ChainLink": ChainLink,
    "ResponsibilityChainBuilder": ResponsibilityChainBuilder,
    "TaskChainBuilder": TaskChainBuilder,
    "ChainBuilder": ChainBuilder,
    "Builder": Builder,
    "Client": Client
    "Connection": Connection,
    "Map": Map,
    "Thread": Thread,
    "Message": Message,
    "Action": Action
};

exports.native = {
    "WebsitePageFrameNavigationResponsePreparation": WebsitePageFrameNavigationResponsePreparation,
    "WebsitePageFrameResourceResponsePreparation": WebsitePageFrameResourceResponsePreparation,
    "ResponsePreparationChainLink": ResponsePreparationChainLink,
    "BodyScriptInjection": BodyScriptInjection,
    "RemoveXFrameOptionsChainLink": RemoveXFrameOptionsChainLink,
    "AddFileSchemaToFrameAnscestorsChainLink": AddFileSchemaToFrameAnscestorsChainLink,
    "ResponseModificationChainLink": ResponseModificationChainLink,
    "HeaderMap": HeaderMap,
    "Cache": Cache,
    "ElectronNetworkRequestHandler": ElectronNetworkRequestHandler,
    "NetworkRequestHandler": NetworkRequestHandler,
    "Response": Response,
    "Request": Request,
    "NetworkMessage": NetworkMessage,
    "ElectronNetworkRequestInterceptor": ElectronNetworkRequestInterceptor,
    "NetworkRequestInterceptor": NetworkRequestInterceptor,
    "Interceptor": Interceptor,
    "Protocol": Protocol,
    "WebsitePageFrameCrossOriginMessagingScript": WebsitePageFrameCrossOriginMessagingScript,
    "Script": Script,
    "ElectronCacheFactory": ElectronCacheFactory,
    "ElectronWebsitePageFrame": ElectronWebsitePageFrame,
    "WebsitePageFrame": WebsitePageFrame
};
