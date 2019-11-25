var Client = require("../../../../src/general/clients/Client.js").Client;
var Connection = require("../../../../src/general/connections/Connection.js").Connection;
var Thread = require("../../../../src/general/threads/Thread.js").Thread;

function getMockConnection() {

    var pingClient = new Client();

    return new Connection(pingClient, new Thread(function() {}), 6);

}

function getMockClient() {

    return new Client(getMockConnection(), 2000);

}

describe("Client Class Test Suite", function() {

    beforeEach(function() {

        this.client = getMockClient();

    });

    it("Constructor Test", function() {

        var defaultClient = new Client();
        var responseExpectedByTimeoutMillisecondsToCompareTo = 2000;

        expect(this.client.getClientConnection()).toBeInstanceOf(Connection);
        expect(this.client.getResponseExpectedByTimeoutMilliseconds()).toBe(responseExpectedByTimeoutMillisecondsToCompareTo);

        expect(defaultClient.getClientConnection()).toBeNull();
        expect(defaultClient.getResponseExpectedByTimeoutMilliseconds()).toBeGreaterThan(0);


    });

    it("Mutators Test", function() {

        var clientConnectionToCompareTo = new Connection(new Client(), new Thread(function() {}), 8);
        var boundSetClientConnectionToErrorCheckWith = this.client.setClientConnection.bind(this.client, 123);
        var responseExpectedByTimeoutMillisecondsToCompareTo = 4500;
        var setResponseExpectedByTimeoutMillisecondsCopy = this.client.setResponseExpectedByTimeoutMilliseconds;
        var boundSetResponseExpectedByTimeoutMillisecondsToErrorCheckWith = setResponseExpectedByTimeoutMillisecondsCopy.bind(this.client, "");
        var boundSetResponseExpectedByTimeoutMillisecondsToErrorCheckWith2 = setResponseExpectedByTimeoutMillisecondsCopy.bind(this.client, 1.2);

        this.client.setClientConnection(clientConnectionToCompareTo);
        this.client.setResponseExpectedByTimeoutMilliseconds(responseExpectedByTimeoutMillisecondsToCompareTo);

        expect(this.client.getClientConnection()).toBe(clientConnectionToCompareTo);
        expect(this.client.getResponseExpectedByTimeoutMilliseconds()).toBe(responseExpectedByTimeoutMillisecondsToCompareTo);

        expect(boundSetClientConnectionToErrorCheckWith).toThrowError();
        expect(boundSetResponseExpectedByTimeoutMillisecondsToErrorCheckWith).toThrowError();
        expect(boundSetResponseExpectedByTimeoutMillisecondsToErrorCheckWith2).toThrowError();

    });

    it("Is Connection Ready Test", function() {


        var defaultClient = new Client();
        var boundIsConnectionReadyToErrorCheckWith = defaultClient.isConnectionReady.bind(defaultClient);

        expect(boundIsConnectionReadyToErrorCheckWith).toThrowError();

    });

    it("Templated Base Functions Testing", function() {

        var boundSendMessagePreChecksToErrorCheckWith = this.client.sendMessagePreChecks.bind(this.client, null);
        var boundSendMessageToErrorCheckWith = this.client.sendMessage.bind(this.client, null);


        expect(boundSendMessagePreChecksToErrorCheckWith).toThrowError();
        expect(boundSendMessageToErrorCheckWith).toThrowError();

    });

});
