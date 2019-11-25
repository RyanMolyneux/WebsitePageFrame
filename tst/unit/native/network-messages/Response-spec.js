var Response = require("../../../../src/native/network-messages/Response.js").Response;
var NetworkMessage = require("../../../../src/native/network-messages/NetworkMessage.js").NetworkMessage;

function getMockResponse() {

    return new Response({}, "", 200);

}

describe("Response Class Test Suite", function() {


    beforeEach(function() {

        this.response = getMockResponse();

    });

    it("Constructor Test", function() {

        var expectedResponseStatusCodeToCompareTo = 200;

        expect(this.response).toBeInstanceOf(NetworkMessage);
        expect(this.response.getStatusCode()).toBe(expectedResponseStatusCodeToCompareTo);

    });

    it("Mutators Test", function() {

        var expectedAlteredStatusCodeToCompareTo = 404;

        this.response.setStatusCode(expectedAlteredStatusCodeToCompareTo);

        expect(this.response.getStatusCode()).toBe(expectedAlteredStatusCodeToCompareTo);
        expect(function() {

            this.response.setStatusCode(null);

        }.bind(this)).toThrowError();
        expect(function() {

            this.response.setStatusCode(404.4);

        }.bind(this)).toThrowError();

    });

});
