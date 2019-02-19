var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;
var NetworkRequestInterceptor = require("../../../../src/native/interceptors/NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var InterceptorSpec = require("./Interceptor-spec.js");

function getMockNetworkRequestInterceptor() {
    return new NetworkRequestInterceptor(new Protocol("ftp"), { name: "networkRequesterMockup"});
}

function propertyEqualityTest(networkRequestInterceptor, networkRequesterMockup) {
    expect(networkRequestInterceptor.getNetworkRequester().name).toEqual(networkRequesterMockup.name);
}

describe("NetworkRequestInterceptor Class test suite", function() {
    beforeEach(function() {
        this.networkRequestInterceptor = getMockNetworkRequestInterceptor();
    });

    it("Constructor test", function() {
        var protocolComparingTo = new Protocol("ftp");
        var networkRequesterComparingTo = { name: "networkRequesterMockup" };

        InterceptorSpec.propertyEqualityTest(this.networkRequestInterceptor, protocolComparingTo);
        propertyEqualityTest(this.networkRequestInterceptor, networkRequesterComparingTo);
    });

    it("Mutators test", function() {
        var networkRequesterComparingTo = { name: "networkRequesterMockupV2" };

        this.networkRequestInterceptor.setNetworkRequester(networkRequesterComparingTo);

        propertyEqualityTest(this.networkRequestInterceptor, networkRequesterComparingTo);
    });
});

exports.propertyEqualityTest = propertyEqualityTest;
