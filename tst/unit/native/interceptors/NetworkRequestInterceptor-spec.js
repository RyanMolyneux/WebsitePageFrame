var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;
var NetworkRequestInterceptor = require("../../../../src/native/interceptors/NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var InterceptorSpec = require("./Interceptor-spec.js");

function getMockNetworkRequestInterceptor() {
    return new NetworkRequestInterceptor(new Protocol("ftp"), "text/html", "#websitePageFrame", { name: "networkRequesterMockup"});
}

function propertyEqualityTest(networkRequestInterceptor, networkRequestInterceptorToComparingTo) {
    expect(networkRequestInterceptor.getNetworkRequester().name).toEqual(networkRequestInterceptorToComparingTo.getNetworkRequester().name);
}

describe("NetworkRequestInterceptor Class test suite", function() {
    beforeEach(function() {
        this.networkRequestInterceptor = getMockNetworkRequestInterceptor();
    });

    it("Constructor test", function() {
        var networkRequestInterceptorToCompareTo = new NetworkRequestInterceptor( new Protocol("ftp"),
                                                                                    "text/html",
                                                                                    "#websitePageFrame",
                                                                                    { name: "networkRequesterMockup" })


        InterceptorSpec.propertyEqualityTest(this.networkRequestInterceptor, networkRequestInterceptorToCompareTo);
        propertyEqualityTest(this.networkRequestInterceptor, networkRequestInterceptorToCompareTo);
    });

    it("Mutators test", function() {
        var networkRequestInterceptorToCompareTo = new NetworkRequestInterceptor(new Protocol("ftp"),
                                                                                   "text/html",
                                                                                    "#websitePageFrame",
                                                                                   { name: "networkRequesterMockupV2" });

        this.networkRequestInterceptor.setNetworkRequester(networkRequestInterceptorToCompareTo.getNetworkRequester());

        propertyEqualityTest(this.networkRequestInterceptor, networkRequestInterceptorToCompareTo);
    });
});

exports.propertyEqualityTest = propertyEqualityTest;
