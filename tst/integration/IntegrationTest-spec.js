var WebsitePageFrameClient = require("../../src/client/website-page-frame-clients/WebsitePageFrameClient.js").WebsitePageFrameClient;
var Message = require("../../src/client/messages/Message.js");
var spectron = require("spectron");
var Application = require("spectron").Application;
var electronPath = require("electron");
var path = require("path");

function setupWindowWebsitePageFrameClient() {

    var websitePageFrameClient = new WebsitePageFrameClient("videoWebsiteWindow", "https://docs.google.com/document/d/1N2sZt-_tTwG23VgC6BYESiaC6T9jjT1k1uiiCE3Ncbk/edit");

    websitePageFrameClient.loadPage();

    window.addEventListener("message", function(event) {
        document.getElementById(event.data.targetId).innerHTML = event.data.returnedText;
    });
}

describe("reel-website-page-frame Integration test", function() {
    beforeAll(function() {
        this.app = new Application({
            path: electronPath,
            args: [ path.join(__dirname, "main.js") ]
        });

        return this.app.start();
    });

    afterEach(function() {
        if (this.app.isRunning()) {
            //return this.app.stop();
        }
    });

    it("Iframe Integration Test.", function() {
        this.app.webContents.executeJavaScript(`(${setupWindowWebsitePageFrameClient})()`);

        this.app.webContents.executeJavaScript(`(${function() {

            var messageToIframeWindow = new Message(function() {
               var headingToSendToParentWindow = document.getElementById("heading").innerHTML;

               window.parent.postMessage("message", { targetId: "testOutput1", returnedText: headingToSendToParentWindow });
            });

            websitePageFrameClient.postMessage(messageToIframeWindow)
        }})()`);

        this.app.webContents.executeJavaScript("document.getElementById('testOutput1')", function (headingChangedFromPostMessageCall) {

            assert(headingChangedFromPostMessageCall.length).not.toEqual(0);
        });
    });

});
