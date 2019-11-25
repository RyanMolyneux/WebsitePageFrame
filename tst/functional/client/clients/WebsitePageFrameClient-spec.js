describe("WebsitePageFrameClient Functional Test Suite", function() {

    beforeAll(function() {

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    });

    beforeEach(function() {

        var electronAppScriptPath = __dirname + "/../..";

        this.app = this.setupMockSpectronApp(electronAppScriptPath);

        return this.app.start();
    });

    afterEach(function() {

        if (this.app && this.app.isRunning()) {

            return this.app.stop();

        }

    });

    it("Navigation Test", function() {

        var iframeInitialURL = "http://localhost:8080/navigation-test/index.html";

        return this.app.client.execute(this.setupWindowWebsitePageFrameClient, iframeInitialURL).executeAsync(this.waitUntilConnectionReady)
                              .execute(function() {

                                  var headingExtractionActionToBeInvoked = new websitePageFrame.Action([], [], function() {

                                      postMessageDataReturned.homePageHeading = document.getElementById("pageHeading").textContent;

                                  });

                                  window.messageBuilder = new websitePageFrame.WebsitePageFrameMessageBuilder();

                                  messageBuilder.attachAction(headingExtractionActionToBeInvoked);

                                  websitePageFrameClient.sendMessage( messageBuilder.finishBuild() );


                              }).executeAsync(this.waitUntilWebsitePageFrameResponseReturned).execute(function() {

                                  return websitePageFrameClient.getResponse().homePageHeading;

                              }).then(function(homePageHeading) {

                                  homePageHeading = homePageHeading.value;
                                  expect(homePageHeading.trim()).toBe("Home");

                              }).execute(function() {

                                  var navigatonActionToBeInvoked = new websitePageFrame.Action([], [], function() {

                                      window.location.assign("http://localhost:8080/navigation-test/about.html");

                                  });

                                  messageBuilder.attachAction(navigatonActionToBeInvoked);

                                  websitePageFrameClient.sendMessage( messageBuilder.finishBuild() );

                              }).executeAsync(this.waitUntilConnectionReady).execute(function() {

                                  var headingExtractionAction = new websitePageFrame.Action([], [], function() {

                                      postMessageDataReturned.aboutPageHeading = document.getElementById("pageHeading").textContent;

                                  });

                                  messageBuilder.attachAction(headingExtractionAction);

                                  websitePageFrameClient.sendMessage(messageBuilder.finishBuild());

                              }).executeAsync(this.waitUntilWebsitePageFrameResponseReturned).execute(function() {

                                  return websitePageFrameClient.getResponse().aboutPageHeading;

                              }).then(function(aboutPageHeading) {

                                  aboutPageHeading = aboutPageHeading.value;

                                  expect(aboutPageHeading.trim()).toBe("About");

                              });

    });

    it("Communication Test", function() {

        var iframeInitialURL = "http://localhost:8080/communications-test/index.html";

        return this.app.client.execute(this.setupWindowWebsitePageFrameClient, iframeInitialURL)
                              .executeAsync(this.waitUntilConnectionReady).execute(function () {

            var actionToBeInvoked = new websitePageFrame.Action([], [], function() {

                document.getElementById("heading").textContent = "HelloWorld";
                postMessageDataReturned.headingChanged = document.getElementById("heading").textContent;

            });

            var messageBuilder = new websitePageFrame.WebsitePageFrameMessageBuilder();

            messageBuilder.attachAction(actionToBeInvoked);

            websitePageFrameClient.sendMessage(messageBuilder.finishBuild());

        }).executeAsync(this.waitUntilWebsitePageFrameResponseReturned).execute(function() {

                return websitePageFrameClient.getResponse();

        }).then(function(messageResponse) {

                messageResponse = messageResponse.value;

                expect(messageResponse.ping.toLowerCase()).toEqual("pong");
                expect(messageResponse.messageSignature).toBeGreaterThanOrEqual(0);
                expect(messageResponse.headingChanged).toEqual("HelloWorld");

        });

    });

    it("Response Timeout Test", function() {

        var iframeInitialURL = "http://localhost:8080/communications-test/index.html";
        var responseTimeoutMilliseconds = 2000;

        return this.app.client.execute(this.setupWindowWebsitePageFrameClient, iframeInitialURL, null, responseTimeoutMilliseconds)
                              .executeAsync(this.waitUntilConnectionReady)
                              .execute(function() {

                                  var actionToBeInvoked = new websitePageFrame.Action([], [], function() {

                                      var waitUntilCurrentSecondsEqualToOrOver = ((new Date()).getSeconds() + 3);

                                      while ( (new Date()).getSeconds() < waitUntilCurrentSecondsEqualToOrOver);

                                  });

                                  var messageBuilder = new websitePageFrame.WebsitePageFrameMessageBuilder();

                                  messageBuilder.attachAction(actionToBeInvoked);

                                  var messageToBeSent = messageBuilder.finishBuild();

                                  websitePageFrameClient.sendMessage(messageToBeSent);

                              }).executeAsync(function(finishedWaitingForResponseTimeout) {

                                  setTimeout(function() {

                                      finishedWaitingForResponseTimeout({ response: websitePageFrameClient.getResponse(),
                                                                          messageSignature: websitePageFrameClient.getPreviousMessageSignature() });

                                  }, 3000);


                              }).then(function(expectedResults) {

                                  expectedResults = expectedResults.value;

                                  expect(expectedResults.messageSignature).toBeNull();
                                  expect(expectedResults.response).toBeNull();

                              });
    });

    it("Send Message wait for Response Test", function() {

        var iframeInitialURL = "http://localhost:8080/communications-test/index.html";
        var responseTimeoutMilliseconds = 20000;

        return this.app.client.execute(this.setupWindowWebsitePageFrameClient, iframeInitialURL, null, responseTimeoutMilliseconds)
                              .executeAsync(this.waitUntilConnectionReady)
                              .execute(function() {

                                  var actionToBeInvokedUntilResponseTimeout = new websitePageFrame.Action([], [], function() {

                                  });

                                  var websitePageFrameMessageBuilder = new websitePageFrame.WebsitePageFrameMessageBuilder();

                                  websitePageFrameMessageBuilder.attachAction(actionToBeInvokedUntilResponseTimeout);

                                  var firstMessageSent = websitePageFrameMessageBuilder.finishBuild();

                                  websitePageFrameClient.sendMessage(firstMessageSent);

                                  try {

                                      websitePageFrameClient.sendMessage(websitePageFrameMessageBuilder.finishBuild());

                                  } catch(error) {

                                      console.log(error);

                                  }
                                  return { "expectedMessageSignature" : firstMessageSent.getMessageSignature(),
                                           "previousMessageSignature": websitePageFrameClient.getPreviousMessageSignature() };

                              }).then(function(specTestResults) {

                                  specTestResults = specTestResults.value;

                                  expect(specTestResults.previousMessageSignature).toBe(specTestResults.expectedMessageSignature);

                              });

    });

    it("Handling unexpected response returned  WebsitePageFrameClient Test", function() {

        var iframeInitialURL = "http://localhost:8080/unexpected-message-response/index.html";

        return this.app.client.execute(this.setupWindowWebsitePageFrameClient, iframeInitialURL).executeAsync(this.waitUntilConnectionReady)
                              .execute(function() {

                                  var expectedCurrentWebsitePageFrameClientResponse = websitePageFrameClient.getResponse();

                              }).then(function(expectedCurrentWebsitePageFrameClientResponse) {

                                  expectedCurrentWebsitePageFrameClientResponse = expectedCurrentWebsitePageFrameClientResponse.value;

                                  expect(expectedCurrentWebsitePageFrameClientResponse).toBeNull();

                              });
    });


});
