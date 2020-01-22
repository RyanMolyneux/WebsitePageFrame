var HeaderMap = require("../../../../src/native/maps/HeaderMap.js").HeaderMap;
var NetworkMessage = require("../../../../src/native/network-messages/NetworkMessage.js").NetworkMessage;

function getMockNetworkMessage() {

    var headerMap = new HeaderMap();

    headerMap.set("Content-Type", "text/html");

    return new NetworkMessage( headerMap,
                               { html: "<!DOCTYPE html> <html> <head> </head> <body> <h1> Hello World!!! </h1>  </body> </html>" });

}

describe("NetworkMessage Class Test Suite", function() {

    beforeEach(function() {

        this.networkMessage = getMockNetworkMessage();

    });

    it("Constructor Test", function() {

        var expectedContentTypeHeaderToCompareTo = "text/html";

        expect(this.networkMessage.getHeaderMap()).toBeInstanceOf(HeaderMap);
        expect(this.networkMessage.getHeaderMap().get("Content-Type")).toBe(expectedContentTypeHeaderToCompareTo);
        expect(this.networkMessage.getBody()).toBeInstanceOf(Object);
        expect(this.networkMessage.getBody()["html"]).toContain("Hello World");


    });

    it("Mutators Test", function() {

        var expectedAlteredContentTypeHeaderToCompareTo = "application/json";
        var expectedAlteredBodyToCompareTo = null;

        this.networkMessage.getHeaderMap().set("Content-Type", expectedAlteredContentTypeHeaderToCompareTo);
        this.networkMessage.setBody(expectedAlteredBodyToCompareTo);


        expect(this.networkMessage.getHeaderMap().get("Content-Type")).toBe(expectedAlteredContentTypeHeaderToCompareTo);
        expect(this.networkMessage.getBody()).toBeNull();

        expect(function() {

            this.networkMessage.setHeaderMap(null);

        }.bind(this));

    });

});
