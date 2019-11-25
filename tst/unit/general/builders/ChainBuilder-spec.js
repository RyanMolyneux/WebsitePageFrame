var ChainBuilder = require("../../../../src/general/builders/ChainBuilder.js").ChainBuilder;
var ChainLink = require("../../../../src/general/chain-links/ChainLink.js").ChainLink;

function getMockChainBuilder() {

    return new ChainBuilder();

}


describe("ChainBuilder Class Test Suite", function() {

    beforeEach(function() {

        this.chainBuilder = getMockChainBuilder();

    });

    it("Constructor Test", function() {

        var chainBuilt = this.chainBuilder.finishBuild();

        expect(chainBuilt).toBeInstanceOf(Array);
        expect(chainBuilt.length).toBe(0);


    });

    it("Attach Chain Link Test", function() {

        this.chainBuilder.attachChainLink(new ChainLink())
                         .attachChainLink(new ChainLink());

        expect( ( this.chainBuilder.finishBuild() ).length).toBe(2);

    });

});
