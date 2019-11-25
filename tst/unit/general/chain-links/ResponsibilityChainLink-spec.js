var ResponsibilityChainLink = require("../../../../src/general/chain-links/ResponsibilityChainLink.js").ResponsibilityChainLink;
var TaskChainBuilder = require("../../../../src/general/builders/TaskChainBuilder.js").TaskChainBuilder;
var TaskChainLink = require("../../../../src/general/chain-links/TaskChainLink.js").TaskChainLink;

function getMockResponsibilityChainLink() {

    return new ResponsibilityChainLink();

}

describe("ResponsibilityChainLink Class Test Suite", function() {

    beforeEach(function() {

        this.responsibilityChainLink = getMockResponsibilityChainLink();

    });

    it("Constructor Test", function() {

        var expectedLengthOfResponsibilityLinksTaskChain = 0;

        expect( (this.responsibilityChainLink.getTaskChain()).length ).toBe(expectedLengthOfResponsibilityLinksTaskChain);

    });

    it("Mutators Test", function() {

        var taskChainBuilder = new TaskChainBuilder().attachChainLink( new TaskChainLink() )
                                                     .attachChainLink( new TaskChainLink() );
        var expectedTaskChainLengthOfResponsibilityChainAfterMutation = 2;

        this.responsibilityChainLink.setTaskChain( taskChainBuilder );

        expect( (this.responsibilityChainLink.getTaskChain()).length ).toBe(expectedTaskChainLengthOfResponsibilityChainAfterMutation);
        expect(function() {

            this.responsibilityChainLink.setTaskChain(null);

        }).toThrowError();

    });

    it("Check If Responsible Test", function() {

        expect(function() {

            this.responsibilityChainLink.checkIfResponsible();

        }).toThrowError();

    });

    it("Handle Responsibility Test", function() {

        expect(function() {

            this.responsibilityChainLink.handleResponsibility();

        }).toThrowError();

    });

});
