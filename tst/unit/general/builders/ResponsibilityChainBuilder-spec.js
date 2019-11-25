var ResponsibilityChainBuilder = require("../../../../src/general/builders/ResponsibilityChainBuilder.js").ResponsibilityChainBuilder;
var ResponsibilityChainLink = require("../../../../src/general/chain-links/ResponsibilityChainLink.js").ResponsibilityChainLink;
var ChainLink = require("../../../../src/general/chain-links/ChainLink.js").ChainLink;

function getMockResponsibilityChainBuilder() {

    return new ResponsibilityChainBuilder();

};

describe("ResponsibilityChainBuilder Class Test Suite", function() {

    beforeEach(function() {

        this.responsibilityChainBuilder = getMockResponsibilityChainBuilder();

    });

    it("AttachChainLink Test", function() {

        var expectedLengthOfResponsibilityChain = 3;

        this.responsibilityChainBuilder.attachChainLink(new ResponsibilityChainLink())
                                       .attachChainLink(new ResponsibilityChainLink())
                                       .attachChainLink(new ResponsibilityChainLink());

        expect( (this.responsibilityChainBuilder.finishBuild()).length ).toBe(expectedLengthOfResponsibilityChain);
        expect(function() {

            this.responsibilityChainBuilder.attachChainLink( new ChainLink() );

        }).toThrowError();

    });

});
