var WebsitePageFrameConnection = require("../../../../src/client/connections/WebsitePageFrameConnection.js").WebsitePageFrameConnection;

function getMockWebsitePageFrameConnection() {

    return new WebsitePageFrameConnection("http://somewhereovertherainbow.com/page/1", { name: "Israel Kamakawiwoʻole" }, 3);

}


describe("WebsitePageFrameConnection Class Test Suite", function() {

    beforeEach(function() {

        this.websitePageFrameConnection = getMockWebsitePageFrameConnection();

    });

    it("Constructor Test", function() {

        var EXPECTED_WEBSITE_URL_UNIQUE_FRAGEMENT = "websitePageFrame"
        var expectedChildBrowsingContextCurrentOriginToCompareTo = "http://somewhereovertherainbow.com";
        var expectedChildBrowsingContextInitialURLToCompareTo =  expectedChildBrowsingContextCurrentOriginToCompareTo + "/page/1";
        var expectedChildBrowsingContextToCompareTo = { name: "Israel Kamakawiwoʻole" };
        var defaultWebsitePageFrameConnection = new WebsitePageFrameConnection();
        var expectedDefaultChildBrowsingContextCurrentOriginToCompareTo = "";



        expect(this.websitePageFrameConnection.getWebsiteUrlUniqueFragment()).toBe(EXPECTED_WEBSITE_URL_UNIQUE_FRAGEMENT);;
        expect(this.websitePageFrameConnection.getChildBrowsingContextCurrentOrigin()).toBe(expectedChildBrowsingContextCurrentOriginToCompareTo);
        expect(this.websitePageFrameConnection.getChildBrowsingContextInitialURL()).toBe(expectedChildBrowsingContextInitialURLToCompareTo);
        expect(this.websitePageFrameConnection.getChildBrowsingContext().name).toBe(expectedChildBrowsingContextToCompareTo.name);

        expect(defaultWebsitePageFrameConnection.getChildBrowsingContextCurrentOrigin()).toBe(expectedDefaultChildBrowsingContextCurrentOriginToCompareTo);
        expect(defaultWebsitePageFrameConnection.getChildBrowsingContext()).toBeNull();

    });


    it("Mutators Test", function() {

        var expectedChildBrowsingContextCurrentOriginToCompareTo = "http://wayuphigh.com";
        var expectedChildBrowsingContextInitialURLToCompareTo = expectedChildBrowsingContextCurrentOriginToCompareTo + "/page/2";
        var expectedChildBrowsingContextToCompareTo = { released: 1990 };
        var updateChildBrowsingContextCurrentLocationInfoCopy = this.websitePageFrameConnection.updateChildBrowsingContextCurrentLocationInformation;
        var boundUpdateChildBrowsingContextCurrentLocationInfoToErrorCheckWith = updateChildBrowsingContextCurrentLocationInfoCopy
                                                                                 .bind(this.websitePageFrameConnection, null);
        var boundSetChildBrowsingContext = this.websitePageFrameConnection.setChildBrowsingContext.bind(this.websitePageFrameConnection, "browsing context");


        this.websitePageFrameConnection.updateChildBrowsingContextCurrentLocationInformation(expectedChildBrowsingContextInitialURLToCompareTo);
        this.websitePageFrameConnection.setChildBrowsingContext(expectedChildBrowsingContextToCompareTo);

        expect(this.websitePageFrameConnection.getChildBrowsingContextCurrentOrigin()).toBe(expectedChildBrowsingContextCurrentOriginToCompareTo);
        expect(this.websitePageFrameConnection.getChildBrowsingContextInitialURL()).toBe(expectedChildBrowsingContextInitialURLToCompareTo);
        expect(this.websitePageFrameConnection.getChildBrowsingContext().released).toBe(expectedChildBrowsingContextToCompareTo.released);

        expect(boundUpdateChildBrowsingContextCurrentLocationInfoToErrorCheckWith).toThrowError();
        expect(boundSetChildBrowsingContext).toThrowError();

    });

});
