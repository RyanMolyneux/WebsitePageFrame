var WebsitePageFrameResourceResponsePreparation = require("../../../../src/native/chain-links/WebsitePageFrameResourceResponsePreparation.js").WebsitePageFrameResourceResponsePreparation;
var ResponsePreparationChainLink = require("../../../../src/native/chain-links/ResponsePreparationChainLink.js").ResponsePreparationChainLink;
var HeaderMap = require("../../../../src/native/maps/HeaderMap.js").HeaderMap;
var Request = require("../../../../src/native/network-messages/Request.js").Request;
var Response = require("../../../../src/native/network-messages/Response.js").Response;
var Cache = require("../../../../src/native/maps/Cache.js").Cache;

function getMockWebsitePageFrameResourceResponsePreparation() {

    return new WebsitePageFrameResourceResponsePreparation();

}

describe("WebsitePageFrameResourceResponsePreparation Class Test Suite", function() {

    beforeEach(function() {

        this.websitePageFrameResourceResponsePreparation = getMockWebsitePageFrameResourceResponsePreparation();

    });

    it("Constructor Test", function() {

        expect(this.websitePageFrameResourceResponsePreparation).toBeInstanceOf(ResponsePreparationChainLink);

    });

    it("Check If Responsible Test", function() {

        var requestToTestWith = new Request( "https://www.google.com/home/index.html", "GET", new HeaderMap(), {});
        var responseToTestWithHeaderMap = new HeaderMap();

        responseToTestWithHeaderMap.set("content-type", "text/html;");
        responseToTestWithHeaderMap.set("content-security-policy", "img-src *; frame-ancestors https://www.google.com; object-src *");

        var responseToTestWith = new Response( responseToTestWithHeaderMap,
                                               {},
                                               200);
        var cacheToTestWith = new Cache();

        cacheToTestWith.set("website-page-frame-origin", "https://www.google.com");

        expect(this.websitePageFrameResourceResponsePreparation.checkIfResponsible( requestToTestWith,
                                                                                    responseToTestWith,
                                                                                    cacheToTestWith)).toBe(true);

        requestToTestWith.setUrl("https://www.youtube.com");

        expect(this.websitePageFrameResourceResponsePreparation.checkIfResponsible( requestToTestWith,
                                                                                    responseToTestWith,
                                                                                    cacheToTestWith)).toBe(true);


        var responseHeaderMapToTestIsNotResponsibleWith = new HeaderMap()

        responseHeaderMapToTestIsNotResponsibleWith.set("content-security-policy", "frame-ancestors https://*.facebook.com");

        expect(this.websitePageFrameResourceResponsePreparation.checkIfResponsible( new Request("https://www.facebook.com/home/index.html", "GET", new HeaderMap(), {}),
                                                                                    new Response(responseHeaderMapToTestIsNotResponsibleWith, "", 200),
                                                                                    cacheToTestWith )).toBe(false);

    });

});
