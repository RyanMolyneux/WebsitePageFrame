var TaskChainLink = require("../../../../src/general/chain-links/TaskChainLink.js").TaskChainLink;
var ChainLink = require("../../../../src/general/chain-links/ChainLink.js").ChainLink;

function getMockTaskChainLink() {

    return new TaskChainLink();

};


describe("TaskChainLink Class Test Suite", function() {

    beforeEach(function() {

        this.taskChainLink = getMockTaskChainLink();

    });

    it("Constructor Test", function() {

        expect(this.taskChainLink).toBeInstanceOf(TaskChainLink);

    });

    it("Preform Task Test", function() {

        expect(function() {

            this.taskChainLink.preformTask();

        }).toThrowError();

    });

});
