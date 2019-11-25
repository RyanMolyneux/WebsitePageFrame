var WebsitePageFrameNavigationResponsePreparation = require("../../../../src/native/chain-links/WebsitePageFrameNavigationResponsePreparation.js").WebsitePageFrameNavigationResponsePreparation;
var ResponsePreparationChainLink = require("../../../../src/native/chain-links/ResponsePreparationChainLink.js").ResponsePreparationChainLink;
var Request = require("../../../../src/native/network-messages/Request.js").Request;
var Response = require("../../../../src/native/network-messages/Response.js").Response;
var Cache = require("../../../../src/native/caches/Cache.js").Cache;


function getMockWebsitePageFrameNavigationResponsePreparation() {

    return new WebsitePageFrameNavigationResponsePreparation();

}

describe("WebsitePageFrameNavigationResponsePreparation Class Test Suite", function() {

    beforeEach(function() {

        this.websitePageFrameNavigationResponsePreparation = getMockWebsitePageFrameNavigationResponsePreparation();

    });

    it("Constructor Test", function() {

        expect(this.websitePageFrameNavigationResponsePreparation).toBeInstanceOf(ResponsePreparationChainLink);

    });

    it("Check If Responsible", function() {

        var responsibleRequestToTestWith = new Request( "https://www.google.com#websitePageFrame",
                                                        "GET",
                                                        { origin: "https://www.google.com", "Sec-Fetch-Mode": "nested-navigate" },
                                                        "");
        var unresponsibleRequestToTestWith = new Request( "https://www.facebook.com",
                                                          "GET",
                                                          { origin: "https://www.facebook.com", "Sec-Fetch-Mode": "nested-navigate" },
                                                          "");

        var cacheToTestWith = new Cache();

        expect(this.websitePageFrameNavigationResponsePreparation.checkIfResponsible( responsibleRequestToTestWith,
                                                                   new Response({}, "", 200),
                                                                   cacheToTestWith )).toBe(true);

        expect(this.websitePageFrameNavigationResponsePreparation.checkIfResponsible( unresponsibleRequestToTestWith,
                                                                   new Response({}, "", 200),
                                                                   cacheToTestWith ) ).toBe(false);



        expect(cacheToTestWith.retrieve("website-page-frame-origin")).toBe("https://www.google.com");


        responsibleRequestToTestWith.setUrl("https://www.google.com/about");

        expect(this.websitePageFrameNavigationResponsePreparation.checkIfResponsible( responsibleRequestToTestWith,
                                                                   new Response({}, "", 200),
                                                                   cacheToTestWith) ).toBe(true);
    });


});
