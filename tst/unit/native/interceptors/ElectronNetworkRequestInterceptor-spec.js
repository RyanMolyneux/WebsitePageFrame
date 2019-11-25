var ElectronNetworkRequestInterceptor = require("../../../../src/native/interceptors/ElectronNetworkRequestInterceptor.js").ElectronNetworkRequestInterceptor;
var NetworkRequestInterceptor = require("../../../../src/native/interceptors/NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var ElectronNetworkRequestHandler = require("../../../../src/native/network-request-handlers/ElectronNetworkRequestHandler.js").ElectronNetworkRequestHandler;
var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;

function getMockElectronNetworkRequestInterceptor() {
    var protocol = new Protocol("file");
    var electronNetworkRequestHandler = new ElectronNetworkRequestHandler({});

    return new ElectronNetworkRequestInterceptor(protocol, electronNetworkRequestHandler);
}


describe("ElectronNetworkRequestInterceptor Class test suite", function() {

    beforeEach(function() {

        this.electronNetworkRequestInterceptor = getMockElectronNetworkRequestInterceptor();

    });

    it("Constructor test", function() {

        expect(this.electronNetworkRequestInterceptor).toBeInstanceOf(NetworkRequestInterceptor);

    });

});
