var ElectronWebsitePageFrame = require("../../src/native/website-page-frames/ElectronWebsitePageFrame.js").ElectronWebsitePageFrame;
var ElectronNetworkRequestInterceptor = require("../../src/native/interceptors/ElectronNetworkRequestInterceptor.js").ElectronNetworkRequestInterceptor;
var IframeMessageHandlerScript = require("../../src/native/scripts/IframeMessageHandlerScript.js").IframeMessageHandlerScript;
var Protocol = require("../../src/native/protocols/Protocol.js").Protocol;
const { app, session, BrowserWindow } = require("electron");
let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({ width: 800, height: 600 });

    appWindow.loadFile(`${__dirname}/client/index.html`);


    var http = new Protocol("http");
    var https = new Protocol("https");
    var interceptorsInjectionScripts = [ new IframeMessageHandlerScript() ];
    var electronWebsitePageFrame = new ElectronWebsitePageFrame();


    electronWebsitePageFrame.setupProtocolInterceptors(session.defaultSession);


    appWindow.on("closed", () => {
        appWindow = null;
    });
}

app.on("ready", createWindow);
