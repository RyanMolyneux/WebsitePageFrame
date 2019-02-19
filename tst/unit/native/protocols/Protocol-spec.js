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
        let schemeToCompareTo = "udp";

        this.protocol.setScheme(schemeToCompareTo);

        expect(this.protocol.getScheme()).toEqual(schemeToCompareTo);
    });
});
