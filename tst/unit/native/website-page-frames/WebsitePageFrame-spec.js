var WebsitePageFrame = require("../../../../src/native/website-page-frames/WebsitePageFrame.js").WebsitePageFrame;
var Interceptor = require("../../../../src/native/interceptors/Interceptor.js").Interceptor;


function getMockWebsitePageFrame() {
    var interceptors = [ new Interceptor(), new Interceptor() ];
    return new WebsitePageFrame(interceptors);
}

function propertyFromatTest(websitePageFrame) {

    var websitePageFrameInterceptors = websitePageFrame.getInterceptors();

    for (var i = 0; i < websitePageFrameInterceptors; i++) {
        expect(websitePageFrameInterceptors[i] instanceof Interceptor).toBe(true);
    }
}

describe("WebsitePageFrame Class test suite",  function() {
    beforeEach(function() {
        this.websitePageFrame = getMockWebsitePageFrame();
    });

    it("Constructor test", function() {

        propertyFromatTest(this.websitePageFrame);

    });

    it("Mutators test", function() {
        this.websitePageFrame.setInterceptors([ null ]);

        expect(this.websitePageFrame.getInterceptors()[0] instanceof Interceptor).not.toBe(true);

    });
});
