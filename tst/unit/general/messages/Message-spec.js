var Message = require("../../../../src/general/messages/Message.js").Message;
var Action = require("../../../../src/general/actions/Action.js").Action;

function getMockMessage() {
    var action = new Action([], [], function() {});

    return new Message(action);
}

function propertyFromatTest(message) {

    expect(message.getAction() instanceof Action).toBe(true);

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

        expect(this.message.getAction() instanceof Action).not.toBe(true);

    });

    it("ToJsonFormat Test", function() {
        var jsonFormattedMessageToCompareTo = this.message.toJsonFormat();

        expect(jsonFormattedMessageToCompareTo.action).not.toBe(null);
    });

    it("From Json Format Test", function() {
        var messageToCompareTo = new Message();
        var jsonFormattedMessageToCompareTo = {
            action: {
                actionParameters: [],
                actionArguments: [],
                actionBody: ""
            }
        };

        messageToCompareTo.fromJsonFormat(jsonFormattedMessageToCompareTo);

        propertyFromatTest(messageToCompareTo);
    });
});
