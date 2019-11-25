var Protocol = require("../../../../src/native/protocols/Protocol.js").Protocol;

function getMockProtocol() {
    return new Protocol("http");
}

describe("Protocol Class unit test suite", function() {
    beforeEach(function () {
        this.protocol = getMockProtocol();
    });

    it("Constructor test", function() {

        expect(this.protocol.getScheme()).toEqual("http");

    });

    it("Mutators test", function() {

        var schemeToCompareTo = "udp";
        var schemeToErrorCheckWith = 2;

        this.protocol.setScheme(schemeToCompareTo);

        expect(this.protocol.getScheme()).toEqual(schemeToCompareTo);
        expect(function() {

            this.protocol.setScheme(schemeToErrorCheckWith);

        }.bind(this)).toThrowError();

    });
});
