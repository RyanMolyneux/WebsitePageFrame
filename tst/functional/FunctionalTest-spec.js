var WebsitePageFrameClient = require("../../src/client/website-page-frame-clients/WebsitePageFrameClient.js").WebsitePageFrameClient;
var Action = require("../../src/general/actions/Action.js");
var Message = require("../../src/general/messages/Message.js");
var spectron = require("spectron");
var Application = require("spectron").Application;
var electronPath = require("electron");
var path = require("path");

function setupWindowWebsitePageFrameClient() {

    window.websitePageFrameClient = new reelWebsitePageFrame.WebsitePageFrameClient("videoWebsiteWindow", "http://localhost:8080/index.html");

    websitePageFrameClient.loadWindow();
}

function getMockSpectronApp () {

    return new Application({
       path: electronPath,
       args: [ path.join(__dirname, "main.js") ],
       env: {
           ELECTRON_ENABLE_LOGGING: true,
           ELECTRON_ENABLE_STACK_DUMPING: true,
           NODE_ENV: "development"
       },
       chromeDriverLogPath: path.join(__dirname, "chromedriverlog.log"),
       webdriverLogPath: path.join(__dirname, "webdriverlogs"),
       waitTimeout: 20000,
    });

}

async function waitUntilIframeLoaded() {


    var isIframeLoaded = await this.app.client.execute(() => {
        return (document.getElementById("videoWebsiteWindow").contentWindow.origin === "http://localhost:8080");
    });

    return isIframeLoaded;
}

describe("WebsitePageFrame Functional Test", function() {

    beforeAll(function() {

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    });

    beforeEach(function() {

        this.app = getMockSpectronApp();

        return this.app.start().then(() => {
            return this.app.client.execute(setupWindowWebsitePageFrameClient);
        })
    });

    afterEach(function() {
        if (this.app.isRunning()) {
            //return this.app.stop();
        }
    });

    it("PostMessage Test", function() {

        return this.app.client.waitUntil(waitUntilIframeLoaded.bind(this), 12500).execute(() => {

            var actionToBeInvoked = new reelWebsitePageFrame.Action([], [], function() {

                document.getElementById("heading").textContent = "HelloWorld";
                postMessageDataReturned.headingChanged = "HelloWorld";

            });

            var messageToWebsitePageFrame = new reelWebsitePageFrame.Message(actionToBeInvoked);

            websitePageFrameClient.postMessage(messageToWebsitePageFrame);


        }).execute(() => {

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
