var BodyScriptInjectionChainLink = require("../../../../src/native/chain-links/BodyScriptInjectionChainLink.js").BodyScriptInjectionChainLink;
var ResponseModificationChainLink = require("../../../../src/native/chain-links/ResponseModificationChainLink.js").ResponseModificationChainLink;
var Script = require("../../../../src/native/scripts/Script.js").Script;


function getMockBodyScriptInjectionChainLink() {

    var scriptsToBeInjectedIntoPageBody = [ new Script(), new Script() ];

    return new BodyScriptInjectionChainLink(scriptsToBeInjectedIntoPageBody);

}

describe("BodyScriptInjectionChainLink Class Test Suite", function() {

    beforeEach(function() {

        this.bodyScriptInjectionChainLink = getMockBodyScriptInjectionChainLink();

    });

    it("Constructor Test", function() {

        var expectedLengthOfScriptsToBeInjectedArray = 2;

        expect(this.bodyScriptInjectionChainLink).toBeInstanceOf(BodyScriptInjectionChainLink);
        expect(this.bodyScriptInjectionChainLink.getScriptsToBeInjected().length).toBe(expectedLengthOfScriptsToBeInjectedArray);
        expect(this.bodyScriptInjectionChainLink.getScriptsToBeInjected()[0]).toBeInstanceOf(Script);

    });

    it("Mutators Test", function() {

        var expectedAlteredScriptsToBeInjectedArray = [ new Script(), new Script(), new Script(), new Script() ];

        this.bodyScriptInjectionChainLink.setScriptsToBeInjected(expectedAlteredScriptsToBeInjectedArray);

        expect(this.bodyScriptInjectionChainLink.getScriptsToBeInjected()).toBe(expectedAlteredScriptsToBeInjectedArray);
        expect(function() {

            this.bodyScriptInjectionChainLink.setScriptsToBeInjected(null);

        }.bind(this)).toThrowError();
        expect(function() {

            this.bodyScriptInjectionChainLink.setScriptsToBeInjected([ {} ])

        }.bind(this)).toThrowError();

    });

});
