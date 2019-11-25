var NetworkMessage = require("../../../../src/native/network-messages/NetworkMessage.js").NetworkMessage;

function getMockNetworkMessage() {

    return new NetworkMessage( { "Content-Type": "text/html" },
                               "<!DOCTYPE html> <html> <head> </head> <body> <h1> Hello World!!! </h1>  </body> </html>");

}

describe("NetworkMessage Class Test Suite", function() {

    beforeEach(function() {

        this.networkMessage = getMockNetworkMessage();

    });

    it("Constructor Test", function() {

        var expectedContentTypeHeaderToCompareTo = "text/html";

        expect(this.networkMessage.getHeaders()).toBeInstanceOf(Object);
        expect(this.networkMessage.getHeaders()["Content-Type"]).toBe(expectedContentTypeHeaderToCompareTo);
        expect(this.networkMessage.getBody()).toContain("Hello World");


    });

    it("Mutators Test", function() {

        var expectedAlteredContentTypeHeaderToCompareTo = "application/json";
        var expectedAlteredBodyToCompareTo = null;

        this.networkMessage.setHeaders({ "Content-Type": expectedAlteredContentTypeHeaderToCompareTo });
        this.networkMessage.setBody(expectedAlteredBodyToCompareTo);


        expect(this.networkMessage.getHeaders()["Content-Type"]).toBe(expectedAlteredContentTypeHeaderToCompareTo);
        expect(this.networkMessage.getBody()).toBeNull();
        expect(function() {

            this.networkMessage.setHeaders(null);

        }.bind(this));
        expect(function() {

            this.networkMessage.setBody(2);

        }.bind(this));


    });

});
