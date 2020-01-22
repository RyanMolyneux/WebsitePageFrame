var WebsitePageFrameNavigationResponsePreparation = require("../../../../src/native/chain-links/WebsitePageFrameNavigationResponsePreparation.js").WebsitePageFrameNavigationResponsePreparation;
var ResponsePreparationChainLink = require("../../../../src/native/chain-links/ResponsePreparationChainLink.js").ResponsePreparationChainLink;
var HeaderMap = require("../../../../src/native/maps/HeaderMap.js").HeaderMap;
var Request = require("../../../../src/native/network-messages/Request.js").Request;
var Response = require("../../../../src/native/network-messages/Response.js").Response;
var Cache = require("../../../../src/native/maps/Cache.js").Cache;


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

        var responsibleRequestHeaderMap = new HeaderMap();
        var responseHeaderMap = new HeaderMap();


        responsibleRequestHeaderMap.set("Origin", "https://www.google.com");
        responsibleRequestHeaderMap.set("Sec-Fetch-Mode", "nested-navigate");

        responseHeaderMap.set("Content-Type", "text/html");

        var responsibleRequestToTestWith = new Request( "https://www.google.com#websitePageFrame",
                                                        "GET",
                                                        responsibleRequestHeaderMap,
                                                        {});


        var unresponsibleRequestHeaderMap = new HeaderMap();

        unresponsibleRequestHeaderMap.set("origin", "https://www.facebook.com");
        unresponsibleRequestHeaderMap.set("Sec-Fetch-Mode", "nested-navigate");

        var unresponsibleRequestToTestWith = new Request( "https://www.facebook.com",
                                                          "GET",
                                                          unresponsibleRequestHeaderMap,
                                                          {});

        var cacheToTestWith = new Cache();

        expect(this.websitePageFrameNavigationResponsePreparation.checkIfResponsible( responsibleRequestToTestWith,
                                                                   new Response(responseHeaderMap, {}, 200),
                                                                   cacheToTestWith )).toBe(true);

        expect(this.websitePageFrameNavigationResponsePreparation.checkIfResponsible( unresponsibleRequestToTestWith,
                                                                   new Response(responseHeaderMap, {}, 200),
                                                                   cacheToTestWith ) ).toBe(false);



        expect(cacheToTestWith.get("website-page-frame-origin")).toBe("https://www.google.com");


        responsibleRequestToTestWith.setUrl("https://www.google.com/about");

        expect(this.websitePageFrameNavigationResponsePreparation.checkIfResponsible( responsibleRequestToTestWith,
                                                                   new Response(responseHeaderMap, "", 200),
                                                                   cacheToTestWith) ).toBe(true);
    });


});
