var WebsitePageFramePingClient = require("../../../../src/client/clients/WebsitePageFramePingClient.js").WebsitePageFramePingClient;


function getMockWebsitePageFramePingClient() {

    return new WebsitePageFramePingClient();

}

describe("WebsitePageFramePingClient Test Suite", function() {

    beforeEach(function() {

        this.websitePageFramePingClient = getMockWebsitePageFramePingClient();

    });

    it("Send Message PreChecks Test", function() {

        expect(this.websitePageFramePingClient.sendMessagePreChecks()).toBe(true);

    });

});
