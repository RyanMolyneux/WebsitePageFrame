var ResponseModificationChainLink = require("../../../../src/native/chain-links/ResponseModificationChainLink.js").ResponseModificationChainLink;
var TaskChainLink = require("../../../../src/general/chain-links/TaskChainLink.js").TaskChainLink;

function getMockResponseModificationChainLink() {

    return new ResponseModificationChainLink();

}

describe("ResponseModificationChainLink Class Test Suite", function() {

    beforeEach(function() {

        this.responseModificationChainLink = getMockResponseModificationChainLink();

    });

    it("Constructor Test", function() {

        expect(this.responseModificationChainLink).toBeInstanceOf(TaskChainLink);

    });

});
