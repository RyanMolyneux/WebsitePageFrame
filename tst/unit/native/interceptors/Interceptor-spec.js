var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;
var Interceptor = require("../../../../src/native/interceptors/Interceptor.js").Interceptor;

function getMockInterceptor() {
    var protocol = new Protocol("http");
    return new Interceptor(protocol);
}

function propertyEqualityTest(interceptor, protocol) {
    expect(interceptor.getProtocol().getScheme()).toEqual(protocol.getScheme());
}

describe("Interceptor Class test suite", function() {
    beforeEach(function() {
        this.interceptor = getMockInterceptor();
    });

    it("Constructor test", function() {
        expect(this.interceptor.getProtocol() instanceof Protocol).toBe(true);
    });

    it("Mutators test", function() {
        var protocol = new Protocol("udp");

        this.interceptor.setProtocol(protocol);

        propertyEqualityTest(this.interceptor, protocol);
    });
});

exports.propertyEqualityTest = propertyEqualityTest;
