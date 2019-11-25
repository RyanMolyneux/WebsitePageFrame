var Thread = require("../threads/Thread.js").Thread;


function _setPingClient(pingClient) {


    if ( !(pingClient instanceof Client) ) {

        throw new TypeError("Connection _setPingClient, expected parameter pingClient to be instanceof Connection.");

    } else {

        this._pingClient = pingClient;

    }

}

function _setConnectionRetryThread(connectionRetryThread) {

    if ( !(connectionRetryThread instanceof Thread) ) {

        throw new TypeError("Connection _setConnectionRetryThread, expected parameter connectionRetryThread to be instanceof Thread.");

    } else {

        this._connectionRetryThread = connectionRetryThread;

    }

}

function setMaxConnectionRetries(maxConnectionRetries) {

    if ( typeof(maxConnectionRetries) !== "number" ) {

        throw new TypeError( "Connection setMaxConnectionRetries, expected parameter maxConnectionRetries to be typeof number but found "
                           + (typeof(maxConnectionRetries)) + ".");

    } else if ( (maxConnectionRetries % 1) !== 0 ) {

        throw new TypeError( "Connection setMaxConnectionRetries, expected parameter maxConnectionRetries to be integer but found "
                           + (maxConnectionRetries) + ".");

    } else {

        this._maxConnectionRetries = maxConnectionRetries;

    }

}

function Connection(pingClient, connectionRetryThread, maxConnectionRetries) {

    this._pingClient = null;
    this._connectionRetryThread = null;
    this._currentConnectionRetriesLeft = null;
    this._maxConnectionRetries = null;
    this._isConnectionOpen = false;

    if ( maxConnectionRetries == null ) {

        maxConnectionRetries = 1;

    }

    this._setPingClient(pingClient);
    this._setConnectionRetryThread(connectionRetryThread);
    this.setCurrentConnectionRetriesLeft(maxConnectionRetries);
    this.setMaxConnectionRetries(maxConnectionRetries);

}

Connection.prototype.openNewConnection = function() {

      throw new Error("Connection openNewConnection, abstract method openNewConnection stands as placeholder to be "
                    + "replaced/overridden in subclasses and as such should not be called without first being overridden.");

};


Connection.prototype.closeCurrentConnection = function() {

    throw new Error( "Connection closeCurrentConnection, abstract method closeCurrentConnection stands as a placeholder to be "
                   + "repalaced/overridden in subclasses and as such should not be called without first being overridden.");

};


Connection.prototype.getIsConnectionOpen = function () {

    return this._isConnectionOpen;

};

Connection.prototype._setIsConnectionOpen = function (isConnectionOpen) {

    if ( typeof(isConnectionOpen) !== "boolean" ) {

        throw new TypeError("Connection _setIsConnectionOpen, expected parameter isConnectionOpen to be typeof boolean but found " + (typeof(isConnectionOpen)) + ".");

    } else {

        this._isConnectionOpen = isConnectionOpen;

    }

};

Connection.prototype._getPingClient = function() {

    return this._pingClient;

};

Connection.prototype._setPingClient = _setPingClient;

Connection.prototype.getConnectionRetryThread = function() {

    return this._connectionRetryThread;

};

Connection.prototype._setConnectionRetryThread = _setConnectionRetryThread;

Connection.prototype.getCurrentConnectionRetriesLeft = function() {

    return this._currentConnectionRetriesLeft;

};

Connection.prototype.setCurrentConnectionRetriesLeft = function(currentConnectionRetriesLeft) {

    if ( typeof(currentConnectionRetriesLeft) !== "number" ) {

        throw new TypeError( "Connection setCurrentConnectionRetriesLeft, expected parameter currentConnectionRetriesLeft to be typeof number but "
                           + "found " + (typeof(currentConnectionRetriesLeft)) + ".");

    } else if ( (currentConnectionRetriesLeft % 1) !== 0 ) {

        throw new TypeError( "Connection setCurrentConnectionRetriesLeft, expected parameter to be integer but found "
                           + (currentConnectionRetriesLeft) + ".");

    } else {

        this._currentConnectionRetriesLeft = currentConnectionRetriesLeft;

    }

};

Connection.prototype.getMaxConnectionRetries = function() {

    return this._maxConnectionRetries;

};

Connection.prototype.setMaxConnectionRetries = setMaxConnectionRetries;

exports.Connection = Connection;

var Client = require("../clients/Client.js").Client;
