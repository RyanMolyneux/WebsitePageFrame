var WebsitePageFrameClient = require("../../../../src/client/clients/WebsitePageFrameClient.js").WebsitePageFrameClient;
var Client = require("../../../../src/general/clients/Client.js").Client;
var WebsitePageFrameConnection = require("../../../../src/client/connections/WebsitePageFrameConnection.js").WebsitePageFrameConnection;

function getMockWebsitePageFrameClient() {

    return new WebsitePageFrameClient(new WebsitePageFrameConnection(), 1000);

}

describe("WebsitePageFrameClient Class Test Suite", function() {

    beforeEach(function() {

        this.websitePageFrameClient = getMockWebsitePageFrameClient();

    });

    it("Constructor Test", function() {

        var defaultWebsitePageFrameClient = new WebsitePageFrameClient();

        expect(this.websitePageFrameClient.getPreviousMessageSignature()).toBeNull();
        expect(this.websitePageFrameClient.getClientConnection()).toBeInstanceOf(WebsitePageFrameConnection);
        expect(defaultWebsitePageFrameClient.getClientConnection()).toBeNull();

    });

    it("Mutators Test", function() {

        var boundSetClientConnectionToErrorCheckWith = this.websitePageFrameClient.setClientConnection.bind(this, new Client());

    });

});
