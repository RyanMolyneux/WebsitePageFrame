var WebsitePageFrameClient = require("../../../../src/client/website-page-frame-clients/WebsitePageFrameClient.js").WebsitePageFrameClient;

function getMockWebsitePageFrameClient() {
    return new WebsitePageFrameClient("videoWebsiteIframe", "https://www.froogle-video.com");
}


describe("WebsitePageFrameClient Class test suite", function() {
    beforeEach(function() {
        this.websitePageFrameClient = getMockWebsitePageFrameClient();
    });

    it("Constructor test", function() {
        expect(this.websitePageFrameClient.getWindowElementId()).toEqual("videoWebsiteIframe");
        expect(this.websitePageFrameClient.getWebsiteUrl()).toEqual("https://www.froogle-video.com");
    });

    it("Mutators test", function() {
        var windowElementIdComparingTo = "iframeIdTwo";
        var websiteUrlComparingTo = "http://www.pageurl-2.ie";

        this.websitePageFrameClient.setWindowElementId(windowElementIdComparingTo);
        this.websitePageFrameClient.setWebsiteUrl(websiteUrlComparingTo);

        expect(this.websitePageFrameClient.getWindowElementId()).toEqual(windowElementIdComparingTo);
        expect(this.websitePageFrameClient.getWebsiteUrl()).toEqual(websiteUrlComparingTo);
    });
});
