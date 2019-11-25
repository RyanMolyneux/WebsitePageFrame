var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;
var Interceptor = require("../../../../src/native/interceptors/Interceptor.js").Interceptor;

function getMockInterceptor() {

    var protocol = new Protocol("http");

    return new Interceptor(protocol);

}


function propertyEqualityTest(interceptor, interceptorToCompareTo) {

    expect(interceptor.getProtocol().getScheme()).toEqual(interceptorToCompareTo.getProtocol().getScheme());

}

describe("Interceptor Class test suite", function() {
    beforeEach(function() {
        this.interceptor = getMockInterceptor();
    });

    it("Constructor test", function() {

        expect(this.interceptor.getProtocol()).toBeInstanceOf(Protocol);

    });

    it("Mutators test", function() {

        var interceptorToCompareTo = new Interceptor( new Protocol("udp") );

        this.interceptor.setProtocol(interceptorToCompareTo.getProtocol());

        propertyEqualityTest(this.interceptor, interceptorToCompareTo);
        expect(function() {

            this.interceptor.setProtocol(null);

        });

    });

    it("Intercept Protocol Request Test", function() {

        expect(function() {

            this.interceptor.interceptProtocolRequest();

        }).toThrowError();

    });
});
