var Message = require("../../../../src/general/messages/Message.js").Message;
var Action = require("../../../../src/general/actions/Action.js").Action;

function getMockMessage() {
    var action = new Action([], [], function() {});

    return new Message(action, 1);
}

function propertyFormatTest(message) {

    expect(message.getAction() instanceof Action).toBe(true);
    expect(message.getMessageSignature()).toBeDefined();
    expect(message.getMessageSignature() % 1).toBe(0);

}

describe("Message Class test suite", function() {

    beforeEach(function() {
        this.message = getMockMessage();
    });

    it("Constructor test", function() {

        propertyFormatTest(this.message);
        propertyFormatTest(new Message());

    });

    it("Mutators test", function() {

        expect(this.message.setAction.bind(this, null)).toThrowError();
        expect(this.message.setMessageSignature.bind(this, "")).toThrowError(0);

    });

    it("ToJsonFormat Test", function() {

        var jsonFormattedMessageToCompareTo = this.message.toJsonFormat();

        expect(jsonFormattedMessageToCompareTo.action).toBeDefined();
        expect(jsonFormattedMessageToCompareTo.messageSignature).toBeDefined();
        expect(jsonFormattedMessageToCompareTo.messageSignature).toBe(this.message.getMessageSignature());

    });

    it("From Json Format Test", function() {
        var messageToCompareTo = new Message();
        var jsonFormattedMessageToCompareTo = {
            action: {
                actionParameters: [],
                actionArguments: [],
                actionBody: ""
            },
            messageSignature: 123
        };

        messageToCompareTo.fromJsonFormat(jsonFormattedMessageToCompareTo);

        propertyFormatTest(messageToCompareTo);
    });
});
