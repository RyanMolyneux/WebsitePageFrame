var Connection = require("../../../../src/general/connections/Connection.js").Connection;
var Client = require("../../../../src/general/clients/Client.js").Client;
var Thread = require("../../../../src/general/threads/Thread.js").Thread;

function getMockConnection() {
    return new Connection(new Client(), new Thread(function() {}), 3);

}

describe("Connection Class Test Suite", function() {

    beforeEach(function() {

        this.connection = getMockConnection();

    });

    it("Constructor Test", function() {

        var connectionWithDefaultMaxRetries = new Connection(new Client(), new Thread(function() {}));
        var isConnectionOpenToCompareTo = false;
        var maxConnectionRetriesToCompareTo = 3;


        expect(this.connection.getIsConnectionOpen()).toBe(isConnectionOpenToCompareTo);
        expect(this.connection.getMaxConnectionRetries()).toBe(maxConnectionRetriesToCompareTo);
        expect(connectionWithDefaultMaxRetries.getMaxConnectionRetries()).toBeGreaterThan(0);

    });

    it("Mutators Test", function() {

        var maxConnectionRetriesToCompareTo = 5;
        var setMaxConnectionRetriesCopy = this.connection.setMaxConnectionRetries;
        var boundSetMaxConnectionRetriesTypeErrorCheckWith = setMaxConnectionRetriesCopy.bind(this.connection, null);
        var boundSetMaxConnectionRetriesTypeErrorCheckWithTwo = setMaxConnectionRetriesCopy.bind(this.connection, 123.1);

        this.connection.setMaxConnectionRetries(maxConnectionRetriesToCompareTo);

        expect(this.connection.getMaxConnectionRetries()).toBe(maxConnectionRetriesToCompareTo);
        expect(boundSetMaxConnectionRetriesTypeErrorCheckWith).toThrowError();
        expect(boundSetMaxConnectionRetriesTypeErrorCheckWithTwo).toThrowError();

    });


    it("Open New Connection Test", function() {

        var boundOpenConnectionToErrorCheckWith = this.connection.openNewConnection.bind(this);

        expect(boundOpenConnectionToErrorCheckWith).toThrowError();

    });

    it("Close Current Connection Test", function() {

        var boundCloseConnectionToErrorCheckWith = this.connection.closeCurrentConnection.bind(this);

        expect(boundCloseConnectionToErrorCheckWith).toThrowError();

    });

});
