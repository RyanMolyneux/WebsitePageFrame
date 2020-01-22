describe("WebsitePageFrameConnection Test Suite", function() {

    beforeAll(function() {

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    });

    beforeEach(function() {

        var electronAppScriptPath = __dirname + "/../.."

        this.app = this.setupMockSpectronApp(electronAppScriptPath);

        return this.app.start();

    });

    afterEach(function() {

        if ( this.app != null && this.app.isRunning() ) {

            return this.app.stop();

        }

    });


    it("Connection Retry Thread stop after max retries Test", function() {

        var iframeInitialURLOfNoneExistantWebsite = "http://localhost:7070/non/existant/websites/route";
        var connectionMaxRetries = 10;

        return this.app.client.execute(this.setupWindowWebsitePageFrameClient, iframeInitialURLOfNoneExistantWebsite, null, null, connectionMaxRetries)
                              .executeAsync(function(waitUntilMaxConnectionRetriesReachedJobFinished) {

                                  setTimeout(function() {

                                      waitUntilMaxConnectionRetriesReachedJobFinished();

                                  }, 12000);

                              }).execute(function() {

                                  var connectionRetryThread = websitePageFrameClient.getClientConnection().getConnectionRetryThread();

                                  return (connectionRetryThread.getState() === connectionRetryThread.POSSIBLE_STATES.IS_RUNNING);

                              }).then(function(connectionRetryThreadIsStillRunning) {


                                  var connectionRetryThreadIsStillRunning = connectionRetryThreadIsStillRunning.value;

                                  expect(connectionRetryThreadIsStillRunning).toBe(false);

                              });

    });

    it("Connection Close test ensure cache clear for new origin Test", function() {

        var iframeInitialURL = "http://localhost:8080/default/index.html";
        var mockServerToTestOriginCacheResetSuccessWith = this.getMockNodeJSServer(7070);

        return this.app.client.execute(this.setupWindowWebsitePageFrameClient, iframeInitialURL)
                              .executeAsync(this.waitUntilConnectionReady)
                              .execute(function() {

                                  var websitePageFrameClientCurrentConnnection = websitePageFrameClient.getClientConnection();
                                  var newUrlToOpen = "http://localhost:7070/";

                                  websitePageFrameClientCurrentConnnection.updateChildBrowsingContextCurrentLocationInformation(newUrlToOpen);

                                  websitePageFrameClientCurrentConnnection.openNewConnection();

                              }).executeAsync(this.waitUntilConnectionReady)
                              .execute(function() {

                                  var retrieveChildBrowsingContextCurrentOrigin = new websitePageFrame.Action([], [], function() {

                                      postMessageDataReturned.childBrowsingContextOrigin = window.origin;

                                  })


                                  var websitePageFrameMessageBuilder = new websitePageFrame.WebsitePageFrameMessageBuilder();

                                  websitePageFrameMessageBuilder.attachAction(retrieveChildBrowsingContextCurrentOrigin);

                                  websitePageFrameClient.sendMessage(websitePageFrameMessageBuilder.finishBuild());

                              }).executeAsync(this.waitUntilWebsitePageFrameResponseReturned)
                              .execute(function() {

                                  return websitePageFrameClient.getResponse().childBrowsingContextOrigin;

                              }).then(function(expectedChildBrowsingContextOrigin) {

                                  expectedChildBrowsingContextOrigin = expectedChildBrowsingContextOrigin.value;

                                  mockServerToTestOriginCacheResetSuccessWith.close();

                                  expect(expectedChildBrowsingContextOrigin).toBe("http://localhost:7070");

                              });


    });

});
