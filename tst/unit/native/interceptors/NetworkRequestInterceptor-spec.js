var NetworkRequestInterceptor = require("../../../../src/native/interceptors/NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var Interceptor = require("../../../../src/native/interceptors/Interceptor.js").Interceptor;
var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;
var NetworkRequestHandler = require("../../../../src/native/network-request-handlers/NetworkRequestHandler.js").NetworkRequestHandler;
var Cache = require("../../../../src/native/caches/Cache.js").Cache;
var ResponsibilityChainBuilder = require("../../../../src/general/builders/ResponsibilityChainBuilder.js").ResponsibilityChainBuilder;



function getMockNetworkRequestInterceptor() {

    var mockProtocolBeingIntercepted = new Protocol("ftp");
    var mockNetworkRequester = { name: "MockNetworkRequester" };
    var mockCache = new Cache();
    var mockResponsibilityChainBuilder = new ResponsibilityChainBuilder();
    var mockNetworkRequestHandler = new NetworkRequestHandler(mockNetworkRequester, mockCache, mockResponsibilityChainBuilder);

    return new NetworkRequestInterceptor(mockProtocolBeingIntercepted, mockNetworkRequestHandler);
}

function propertyEqualityTest(networkRequestInterceptor, networkRequestInterceptorToComparingTo) {

    var newInterceptorsRequestHandlersRequestersName = networkRequestInterceptor.getNetworkRequestHandler().getNetworkRequester().name;
    var interceptorRequestHandlerRequesterNameComparingTo = networkRequestInterceptorToComparingTo.getNetworkRequestHandler().getNetworkRequester().name;

    expect(newInterceptorsRequestHandlersRequestersName).toBe(interceptorRequestHandlerRequesterNameComparingTo);

}

describe("NetworkRequestInterceptor Class test suite", function() {

    beforeEach(function() {

        this.networkRequestInterceptor = getMockNetworkRequestInterceptor();

    });

    it("Constructor test", function() {

        expect(this.networkRequestInterceptor).toBeInstanceOf(Interceptor);
        propertyEqualityTest(this.networkRequestInterceptor, getMockNetworkRequestInterceptor());

    });

    it("Mutators test", function() {

        var networkRequestHandlerToCompareTo = new NetworkRequestHandler({ name: "NewMockNetworkRequester" });

        this.networkRequestInterceptor.setNetworkRequestHandler( networkRequestHandlerToCompareTo );

        propertyEqualityTest(this.networkRequestInterceptor, new NetworkRequestInterceptor( new Protocol("udp"), networkRequestHandlerToCompareTo ) );
        expect(function() {

            this.networkRequestInterceptor.setNetworkRequestHandler(null);

        }.bind(this)).toThrowError();

    });
});
