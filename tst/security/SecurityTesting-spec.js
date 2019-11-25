describe("Running ReelWebsitePageFrame Automated Security Test's", function() {

    beforeAll(function() {

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    });

    beforeEach(function () {


        this.app = this.setupMockSpectronApp(__dirname);

        return this.app.start();

    });

    it("WebsitePageFrame Manual ClickJacking mitigation Check Test", function () {

        var iframeInitialURL = "http://localhost:8080/clickjacking/frame.html";
        var mockServerToTestClickJackingVulnerabilityPatched = this.getMockNodeJSServer(7070, { "Content-Type": "text/html",
                                                                                                "X-Frame-Options": "DENY",
                                                                                                "Content-Security-Policy": "frame-ancestors http://localhost:7070;" });

        return this.app.client.execute(this.setupWindowWebsitePageFrameClient, iframeInitialURL).executeAsync(this.waitUntilConnectionReady).execute(function() { while(true); });

    });

});
