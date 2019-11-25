var AddFileSchemaToFrameAnscestorsChainLink = require("../../../../src/native/chain-links/AddFileSchemaToFrameAnscestorsChainLink.js").AddFileSchemaToFrameAnscestorsChainLink;
var ResponseModificationChainLink = require("../../../../src/native/chain-links/ResponseModificationChainLink.js").ResponseModificationChainLink;

function getMockAddFileSchemaToFrameAncestorsChainLink() {

    return new AddFileSchemaToFrameAnscestorsChainLink();

}

describe("AddFileSchemaToFrameAnscestorsChainLink Class Test Suite", function() {

    beforeEach(function() {

        this.addFileSchemaToFrameAnscestorsChainLink = getMockAddFileSchemaToFrameAncestorsChainLink();

    });

    it("Constructor Test", function() {

        expect(this.addFileSchemaToFrameAnscestorsChainLink).toBeInstanceOf(ResponseModificationChainLink);

    });

});
