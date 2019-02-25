var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;
var Interceptor = require("../../../../src/native/interceptors/Interceptor.js").Interceptor;

function getMockInterceptor() {
    var protocol = new Protocol("http");
    var pathFragmentIdentifierIntercepting = "#websitePageFrame";
    var contentTypeIntercepting = "text/html";
    return new Interceptor(protocol,
                           contentTypeIntercepting,
                           pathFragmentIdentifierIntercepting);
}

function propertyEqualityTest(interceptor, interceptorToCompareTo) {

    expect(interceptor.getProtocol().getScheme()).toEqual(interceptorToCompareTo.getProtocol().getScheme());
    expect(interceptor.getContentTypeIntercepting()).toEqual(interceptorToCompareTo.getContentTypeIntercepting());
    expect(interceptor.getPathFragmentIdentifierIntercepting()).toEqual(interceptorToCompareTo.getPathFragmentIdentifierIntercepting());

}

describe("Interceptor Class test suite", function() {
    beforeEach(function() {
        this.interceptor = getMockInterceptor();
    });

    it("Constructor test", function() {

        expect(this.interceptor.getProtocol() instanceof Protocol).toBe(true);
        expect(this.interceptor.getContentTypeIntercepting()).toEqual("text/html");
        expect(this.interceptor.getPathFragmentIdentifierIntercepting()).toEqual("#websitePageFrame");

    });

    it("Mutators test", function() {
        var interceptorToCompareTo = new Interceptor( new Protocol("udp"),
                                                      "application/javascript",
                                                      "#scripts");


        this.interceptor.setProtocol(interceptorToCompareTo.getProtocol());
        this.interceptor.setContentTypeIntercepting(interceptorToCompareTo.getContentTypeIntercepting());
        this.interceptor.setPathFragmentIdentifierIntercepting(interceptorToCompareTo.getPathFragmentIdentifierIntercepting());

        propertyEqualityTest(this.interceptor, interceptorToCompareTo);
    });
});

exports.propertyEqualityTest = propertyEqualityTest;
