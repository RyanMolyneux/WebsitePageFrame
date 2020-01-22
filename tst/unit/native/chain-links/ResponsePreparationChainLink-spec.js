var ResponsePreparationChainLink = require("../../../../src/native/chain-links/ResponsePreparationChainLink.js").ResponsePreparationChainLink;
var ResponsibilityChainLink = require("../../../../src/general/chain-links/ResponsibilityChainLink.js").ResponsibilityChainLink;
var TaskChainBuilder = require("../../../../src/general/builders/TaskChainBuilder.js").TaskChainBuilder;

function getMockResponsePreparationChainLink() {

    return new ResponsePreparationChainLink(new TaskChainBuilder());

}

describe("ResponsePreparationChainLink Class Test Suite", function() {

    beforeEach(function() {

        this.responsePreparationChainLink = getMockResponsePreparationChainLink();

    });

    it("Constructor Test", function() {

        expect(this.responsePreparationChainLink).toBeInstanceOf(ResponsibilityChainLink);

    });

    it("Check If Responsibile Test", function() {

        expect(function() {

            this.responsePreparationChainLink.checkIfResponsible();

        }.bind(this)).toThrowError();

    });


});
