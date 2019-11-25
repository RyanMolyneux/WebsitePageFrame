var ElectronWebsitePageFrame = require("../../../../src/native/website-page-frames/ElectronWebsitePageFrame.js").ElectronWebsitePageFrame;
var WebsitePageFrame = require("../../../../src/native/website-page-frames/WebsitePageFrame.js").WebsitePageFrame;
var Interceptor = require("../../../../src/native/interceptors/Interceptor.js").Interceptor;
var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;

function getMockElectronWebsitePageFrame() {

    var mockInterceptors = [ new Interceptor( new Protocol("https")) ];
    var mockElectronWebsitePageFrame = new ElectronWebsitePageFrame(mockInterceptors);

    return mockElectronWebsitePageFrame;

}

describe("ElectronWebsitePageFrame Class Test Suite", function() {

    beforeEach(function() {

        this.electronWebsitePageFrame = getMockElectronWebsitePageFrame();

    });

    it("Constructor Test", function() {

        expect(this.electronWebsitePageFrame).toBeInstanceOf(WebsitePageFrame);

    });

})
