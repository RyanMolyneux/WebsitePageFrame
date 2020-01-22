/*
 *    This library provides an alternative in app browser to webview by removing specific restrictions placed upon iframe and more.
 *    Copyright (C) 2019  Ryan Molyneux
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function setClientConnection(clientConnection) {

    if ( !(clientConnection instanceof Connection) && clientConnection !== null ) {

        throw new TypeError("Client setClientConnection, parameter clientConnection expected to be instanceof Connection or null.");

    } else {

        this._clientConnection = clientConnection;

    }

}

function setResponseExpectedByTimeoutMilliseconds(responseExpectedByTimeoutMilliseconds) {


    if ( typeof(responseExpectedByTimeoutMilliseconds) !== "number" ) {

        throw new TypeError( "Client setResponseExpectedByTimeoutMilliseconds, parameter responseExpectedByTimeoutMilliseconds "
                           + "expected to be typeof number but found " + (typeof(responseExpectedByTimeoutMilliseconds)) + ".");

    } else if ( (responseExpectedByTimeoutMilliseconds % 1) !== 0 ) {

        throw new TypeError( "Client setResponseExpectedByTimeoutMilliseconds, parameter responseExpectedByTimeoutMilliseconds expected "
                           + "to be integer but found " + (responseExpectedByTimeoutMilliseconds) + ".");

    } else {

        this._responseExpectedByTimeoutMilliseconds = responseExpectedByTimeoutMilliseconds;

    }

}


function Client(clientConnection, responseExpectedByTimeoutMilliseconds) {

    this._clientConnection = null;
    this._response = null;
    this._responseExpectedByTimeoutMilliseconds = null;

    if ( clientConnection == null ) {

        clientConnection = null;

    }

    if ( responseExpectedByTimeoutMilliseconds == null ) {

        responseExpectedByTimeoutMilliseconds = 1000;

    }

    this.setClientConnection(clientConnection);
    this.setResponseExpectedByTimeoutMilliseconds(responseExpectedByTimeoutMilliseconds);

}


Client.prototype.sendMessage = function(message) {

    if ( this.sendMessagePreChecks() ) {

        throw new Error( "Client sendMessage, templated method sendMessage is here as a placeholder to be replaced/overridden by subclasses and "
                       + "as such should not be called directly.");

    }

};

Client.prototype.sendMessagePreChecks = function(message) {

    throw new Error( "Client sendMessagePreChecks, templated method sendMessagePreChecks is here as a placedholder to be replaced/overridden by "
                   + "subclasses and as such should not be called directly.");

};

Client.prototype.isConnectionReady = function() {

    if ( this._clientConnection instanceof Connection ) {

        return this._clientConnection.getIsConnectionOpen();

    } else {

        throw new Error( "Client isConnectionReady, clientConnection must first be initialized for this method to provide you any valuable "
                       + "information.");

    }

};

Client.prototype.getClientConnection = function() {

    return this._clientConnection;

};

Client.prototype.setClientConnection = setClientConnection;

Client.prototype.getResponse = function() {

    return this._response;

};

Client.prototype._setResponse = function(response) {

    if ( !(response instanceof Object) && response !== null) {

        throw new TypeError("Client _setResponse, parameter response expected to be instanceof Object or null.");

    } else {

        this._response = response;

    }

}

Client.prototype.getResponseExpectedByTimeoutMilliseconds = function() {

    return this._responseExpectedByTimeoutMilliseconds;

}

Client.prototype.setResponseExpectedByTimeoutMilliseconds = setResponseExpectedByTimeoutMilliseconds;

exports.Client = Client;

var Connection = require("../connections/Connection.js").Connection;
