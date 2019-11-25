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

        var expectedResponseToBeCopiedAndAltered = new Response({ "x-frame-options": "DENY" }, "", 200);

        expect( (this.removeXFrameHeaderChainLink.preformTask(expectedResponseToBeCopiedAndAltered)).getHeaders()["x-frame-options"] ).toBeUndefined();

    });

});
