var WebsitePageFrameClient = require("../../src/client/website-page-frame-clients/WebsitePageFrameClient.js").WebsitePageFrameClient;
var Action = require("../../src/general/actions/Action.js");
var Message = require("../../src/general/messages/Message.js");
var spectron = require("spectron");
var Application = require("spectron").Application;
var electronPath = require("electron");
var path = require("path");

function setupWindowWebsitePageFrameClient() {

    window.websitePageFrameClient = new WebsitePageFrameClient("videoWebsiteWindow", "http://localhost:8080/index.html");

    websitePageFrameClient.loadWindow();
}

describe("reel-website-page-frame Integration test", function() {
    beforeAll(function() {
        this.app = new Application({
           path: electronPath,
           args: [ path.join(__dirname, "main.js") ],
           env: {
               ELECTRON_ENABLE_LOGGING: true,
               ELECTRON_ENABLE_STACK_DUMPING: true,
               NODE_ENV: "development"
           },
           chromeDriverLogPath: path.join(__dirname, "chromedriverlog.log"),
           webdriverLogPath: path.join(__dirname, "webdriverlogs"),
           webdriverOptions: {
          }
        });

        return this.app.start().then(() => {
            return this.app.webContents.executeJavaScript(`(${setupWindowWebsitePageFrameClient})()`);
        });
    });

    afterEach(function() {
        if (this.app.isRunning()) {
            //return this.app.stop();
        }
    });

    it("Iframe Integration Test.", function() {
        return this.app.client.waitUntilWindowLoaded(10000)
                              .execute(() => {

                                  var actionToBeInvoked = new Action([], [], function() {

                                      document.getElementById("heading").textContent = "HelloWorld";
                                      postMessageDataReturned.headingChanged = "HelloWorld";

                                  });

                                  var messageToWebsitePageFrame = new Message(actionToBeInvoked);

                                  websitePageFrameClient.postMessage(messageToWebsitePageFrame);

                              }).execute((websitePageFrame) => {

                                   var websitePageFrameDocument = document.getElementById(websitePageFrameClient.getWindowElementId()).contentDocument;

                                   var expectedData = {
                                       "websitePageFrameElementChangedText": websitePageFrameDocument.getElementById("heading").textContent,
                                       "postMessageDataReturned": websitePageFrameClient.getPostMessageDataReturned()
                                   };

                                   return expectedData;

                              }).then((expectedData) => {
                                 var expectedDataValue = expectedData.value;

                                 expect(expectedDataValue.postMessageDataReturned.ping.toLowerCase()).toEqual("pong");
                                 expect(expectedDataValue.postMessageDataReturned.headingChanged.toLowerCase()).toEqual("helloworld");
                                 expect(expectedDataValue.websitePageFrameElementChangedText.toLowerCase()).toEqual("helloworld");

                              });
    });
});
