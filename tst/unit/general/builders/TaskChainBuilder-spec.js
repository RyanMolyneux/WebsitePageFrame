var TaskChainBuilder = require("../../../../src/general/builders/TaskChainBuilder.js").TaskChainBuilder;
var TaskChainLink = require("../../../../src/general/chain-links/TaskChainLink.js").TaskChainLink;
var ChainLink = require("../../../../src/general/chain-links/ChainLink.js").ChainLink;


function getMockTaskChainBuilder() {

    return new TaskChainBuilder();

}

describe("TaskChainBuilder Class Test Suite", function() {

    beforeEach(function() {

        this.taskChainBuilder = getMockTaskChainBuilder();

    });

    it("Attach Chain Link Test", function() {

        var expectedLengthOfTaskChain = 3;

        this.taskChainBuilder.attachChainLink(new TaskChainLink())
                             .attachChainLink(new TaskChainLink())
                             .attachChainLink(new TaskChainLink())

        expect( (this.taskChainBuilder.finishBuild()).length ).toBe(expectedLengthOfTaskChain);
        expect(function() {

            this.taskChainBuilder(new ChainLink());

        }).toThrowError();

    });

});
