var HeaderMap = require("../../../../src/native/maps/HeaderMap.js").HeaderMap;
var Request = require("../../../../src/native/network-messages/Request.js").Request;
var NetworkMessage = require("../../../../src/native/network-messages/NetworkMessage.js").NetworkMessage;

function getMockRequest() {

    return new Request("https://localhost:8080", "GET", new HeaderMap(), {});

}

describe("Request Class Test Suite", function() {

    beforeEach(function() {

        this.request = getMockRequest();

    });

    it("Constructor Test", function() {

        var expectedUrlOfRequest = "https://localhost:8080";
        var expectedMethodOfRequest = "GET";

        expect(this.request).toBeInstanceOf(NetworkMessage);
        expect(this.request.getUrl()).toBe(expectedUrlOfRequest);
        expect(this.request.getMethod()).toBe(expectedMethodOfRequest);

    });

    it("Mutators Test", function() {

        var expectedAlteredUrl = "https://localhost:9090";
        var expectedAlteredMethod = "POST";

        this.request.setUrl(expectedAlteredUrl);
        this.request.setMethod(expectedAlteredMethod);

        expect(this.request.getUrl()).toBe(expectedAlteredUrl);
        expect(this.request.getMethod()).toBe(expectedAlteredMethod);
        expect(function() {

            this.request.setUrl(null);

        }.bind(this)).toThrowError();
        expect(function() {

            this.request.setMethod(null);

        }.bind(this)).toThrowError();

    });

});
