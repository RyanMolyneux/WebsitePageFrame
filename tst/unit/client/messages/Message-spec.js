var Message = require("../../../../src/client/messages/Message.js").Message;

function getMockMessage() {
    return new Message(function() { console.log("i am message action to be sent to website page frame.") });
}

function propertyFromatTest(message) {

    expect(message.getAction() instanceof Function).toBe(true);

}

describe("Message Class test suite", function() {
    beforeEach(function() {
        this.message = getMockMessage();
    });

    it("Constructor test", function() {

        propertyFromatTest(this.message);

    });

    it("Mutators test", function() {

        this.message.setAction(null);

        expect(this.message.getAction() instanceof Function).not.toBe(true);

    });
});
