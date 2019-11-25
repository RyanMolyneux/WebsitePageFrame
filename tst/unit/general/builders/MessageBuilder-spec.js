var MessageBuilder = require("../../../../src/general/builders/MessageBuilder.js").MessageBuilder;
var Message = require("../../../../src/general/messages/Message.js").Message;
var Action = require("../../../../src/general/actions/Action.js").Action;

function getMockMessageBuilder() {

    return new MessageBuilder(function() { return Math.floor( Math.random() * 100); });

}

describe("MessageBuilder Class Test Suite", function() {


    beforeEach(function() {

        this.messageBuilder = getMockMessageBuilder();

    });

    it("Message Construction test", function() {

        this.messageBuilder.attachAction( new Action(["name"], ["Bob"], function() {}) );

        var message = this.messageBuilder.finishBuild();
        var messageAction = message.getAction();
        var messageSignature = message.getMessageSignature();

        expect(message).toBeInstanceOf(Message);

        expect(messageAction.getActionParameters()[0]).toBe("name");
        expect(messageAction.getActionArguements()[0]).toBe("Bob");

        expect(messageSignature).toBeGreaterThanOrEqual(0);
        expect(messageSignature).toBeLessThan(100);


    });

});
