var ElectronNetworkRequestInterceptor = require("../../../../src/native/interceptors/ElectronNetworkRequestInterceptor.js").ElectronNetworkRequestInterceptor;
var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;
var Script = require("../../../../src/native/scripts/Script.js").Script;
var InterceptorSpec = require("./Interceptor-spec.js");
var NetworkRequestInterceptorSpec = require("./NetworkRequestInterceptor-spec.js");

function getMockScriptsToBeInjected() {
    return [ new Script (function () { console.log("hello") }), new Script(function() { console.log("world") }) ];
}

function getMockElectronNetworkRequestInterceptor() {
    var protocol = new Protocol("file");
    var scriptsToBeInjected = getMockScriptsToBeInjected();
    return new ElectronNetworkRequestInterceptor(protocol, "#websitePageFrame", scriptsToBeInjected);
}

function propertyFromatTest(electronNetworkRequestInterceptor) {

    var scriptsToBeInjected = electronNetworkRequestInterceptor.getScriptsToBeInjected();

    for (var i = 0; i < scriptsToBeInjected.length; i++) {
        expect(scriptsToBeInjected[i] instanceof Script).toBe(true);
        expect(scriptsToBeInjected[i].getScriptCode() instanceof Function).toBe(true);
    }

}

describe("ElectronNetworkRequestInterceptor Class test suite", function() {

    beforeEach(function() {
        this.electronNetworkRequestInterceptor = getMockElectronNetworkRequestInterceptor();
    });

    it("Constructor test", function() {
        var electronNetworkRequestInterceptorToCompareTo = new ElectronNetworkRequestInterceptor(new Protocol("file"), "#websitePageFrame", []);

        InterceptorSpec.propertyEqualityTest(this.electronNetworkRequestInterceptor, electronNetworkRequestInterceptorToCompareTo);
        expect(this.electronNetworkRequestInterceptor.getNetworkRequester()).not.toBe(null);
        propertyFromatTest(this.electronNetworkRequestInterceptor);

    });

    it("Mutators test", function() {
        var newScriptsToBeInjected = [ "", {} ];

        this.electronNetworkRequestInterceptor.setScriptsToBeInjected(newScriptsToBeInjected);

        expect(this.electronNetworkRequestInterceptor.getScriptsToBeInjected()[0]).not.toBe(true);
        expect(this.electronNetworkRequestInterceptor.getScriptsToBeInjected()[1]).not.toBe(true);
    });
});
