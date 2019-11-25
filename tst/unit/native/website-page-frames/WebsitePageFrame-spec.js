var WebsitePageFrame = require("../../../../src/native/website-page-frames/WebsitePageFrame.js").WebsitePageFrame;
var Interceptor = require("../../../../src/native/interceptors/Interceptor.js").Interceptor;
var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;

function getMockWebsitePageFrame() {

    var interceptors = [ new Interceptor(
        new Protocol("http")
    ), new Interceptor(
        new Protocol("https")
    ) ];

    return new WebsitePageFrame(interceptors);

}

function propertyFormatTest(websitePageFrame) {

    var websitePageFrameInterceptors = websitePageFrame.getInterceptors();

    for (var i = 0; i < websitePageFrameInterceptors; i++) {
        expect(websitePageFrameInterceptors[i] instanceof Interceptor).toBe(true);
    }

}

describe("WebsitePageFrame Class Test Suite",  function() {

    beforeEach(function() {

        this.websitePageFrame = getMockWebsitePageFrame();

    });

    it("Constructor Test", function() {

        var expectedLengthOfInterceptorArray = 2;

        propertyFormatTest(this.websitePageFrame);
        expect( (this.websitePageFrame.getInterceptors()).length ).toEqual(expectedLengthOfInterceptorArray);

    });

    it("Mutators Test", function() {

        var expectedLengthOfInterceptorArray = 1;
        var interceptorProtocolToErrorCheckWith = 2;

        this.websitePageFrame.setInterceptors([ new Interceptor(new Protocol("udp") ) ]);

        expect( (this.websitePageFrame.getInterceptors()).length ).toBe(expectedLengthOfInterceptorArray);
        expect(function(interceptorProtocolToErrorCheckWith) {

            this.websitePageFrame.setInterceptors(interceptorProtocolToErrorCheckWith);

        }.bind(this, interceptorProtocolToErrorCheckWith)).toThrowError();

    });

    it("Setup Protocol Interceptors Test", function() {

        expect(function() {

            this.websitePageFrame.setupProtocolInterceptors();

        }.bind(this)).toThrowError();

    });

});
