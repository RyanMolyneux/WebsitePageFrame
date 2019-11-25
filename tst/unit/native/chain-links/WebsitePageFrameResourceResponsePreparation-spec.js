var WebsitePageFrameResourceResponsePreparation = require("../../../../src/native/chain-links/WebsitePageFrameResourceResponsePreparation.js").WebsitePageFrameResourceResponsePreparation;
var ResponsePreparationChainLink = require("../../../../src/native/chain-links/ResponsePreparationChainLink.js").ResponsePreparationChainLink;
var Request = require("../../../../src/native/network-messages/Request.js").Request;
var Response = require("../../../../src/native/network-messages/Response.js").Response;
var Cache = require("../../../../src/native/caches/Cache.js").Cache;

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

    it("Check Is Responsible Test", function() {

        var requestToTestWith = new Request( "https://www.google.com/home/index.html", "GET", { }, "");
        var responseToTestWith = new Response( { "content-security-policy": "img-src *; frame-ancestors https://www.google.com; object-src *" },
                                               "",
                                               200);
        var cacheToTestWith = new Cache();

        cacheToTestWith.store("website-page-frame-origin", "https://www.google.com");

        expect(this.websitePageFrameResourceResponsePreparation.checkIfResponsible( requestToTestWith,
                                                                                    responseToTestWith,
                                                                                    cacheToTestWith)).toBe(true);

        requestToTestWith.setUrl("https://www.youtube.com");

        expect(this.websitePageFrameResourceResponsePreparation.checkIfResponsible( requestToTestWith,
                                                                                    responseToTestWith,
                                                                                    cacheToTestWith)).toBe(true);



        expect(this.websitePageFrameResourceResponsePreparation.checkIfResponsible( new Request("https://www.facebook.com/home/index.html", "GET", {}, ""),
                                                                                    new Response({ "content-security-policy": "frame-ancestors https://*.facebook.com"}, "", 200),
                                                                                    cacheToTestWith )).toBe(false);

    });

});
