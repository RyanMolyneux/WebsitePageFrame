var HeaderMap = require("../../../../src/native/maps/HeaderMap.js").HeaderMap;
var RemoveXFrameOptionsChainLink = require("../../../../src/native/chain-links/RemoveXFrameOptionsChainLink.js").RemoveXFrameOptionsChainLink;
var ResponseModificationChainLink = require("../../../../src/native/chain-links/ResponseModificationChainLink.js").ResponseModificationChainLink;
var Response = require("../../../../src/native/network-messages/Response.js").Response;

function getMockRemoveXFrameOptionsChainLink() {

    return new RemoveXFrameOptionsChainLink();

}

describe("RemoveXFrameOptionsChainLink Class Test Suite", function() {

    beforeEach(function() {

        this.removeXFrameHeaderChainLink = getMockRemoveXFrameOptionsChainLink();

    });


    it("Constructor Test", function() {

        expect(this.removeXFrameHeaderChainLink).toBeInstanceOf(ResponseModificationChainLink);

    });

    it("Preform Task Test", function() {

        var headerMap = new HeaderMap();

        headerMap.set("X-Frame-Options", "DENY")

        var expectedResponseToBeAltered = new Response(headerMap, {}, 200);

        this.removeXFrameHeaderChainLink.preformTask(expectedResponseToBeAltered);

        expect( expectedResponseToBeAltered.getHeaderMap().get("x-frame-options") ).toBeUndefined();

    });

});
