var ElectronNetworkRequestHandler = require("../../../../src/native/network-request-handlers/ElectronNetworkRequestHandler.js").ElectronNetworkRequestHandler;
var NetworkRequestHandler = require("../../../../src/native/network-request-handlers/NetworkRequestHandler.js").NetworkRequestHandler;
var ResponsibilityChainBuilder = require("../../../../src/general/builders/ResponsibilityChainBuilder.js").ResponsibilityChainBuilder;
var Cache = require("../../../../src/native/caches/Cache.js").Cache;

function getMockElectronNetworkRequestHandler() {

    var mockBrowserSession = { name: "MyBrowserSession" };
    var mockCache = new Cache();
    var mockResponsibilityChainBuilder = new ResponsibilityChainBuilder();

    return new ElectronNetworkRequestHandler(mockBrowserSession, mockCache, mockResponsibilityChainBuilder);

}

describe("ElectronNetworkRequestHandler Class Test Suite", function() {

    beforeEach(function() {

        this.electronNetworkRequestHandler = getMockElectronNetworkRequestHandler();

    });

    it("Constructor Test", function() {

        expect(this.electronNetworkRequestHandler).toBeInstanceOf(NetworkRequestHandler);
        expect(this.electronNetworkRequestHandler.getBrowserSession().name).toBe("MyBrowserSession");

    });

    it("Mutators Test", function() {

        var expectedBrowserSession = {};

        this.electronNetworkRequestHandler.setBrowserSession(expectedBrowserSession);

        expect(this.electronNetworkRequestHandler.getBrowserSession()).toBe(expectedBrowserSession);
        expect(function() {

            this.electronNetworkRequestHandler.setBrowserSession(null);

        }.bind(this)).toThrowError();


    });

});
