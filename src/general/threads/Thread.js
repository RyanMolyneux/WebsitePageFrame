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

function _setCodeToBeExecuted(codeToBeExecuted) {

    if ( !(codeToBeExecuted instanceof Object) ) {

        throw new TypeError("Thread _setCodeToBeExecuted, expected parameter codeToBeExecuted to be instanceof Object.");

    } else {

        this._codeToBeExecuted = codeToBeExecuted;

    }

}

function Thread(codeToBeExecuted) {

    this.POSSIBLE_STATES = Object.freeze({ IS_RUNNING: "IS_RUNNING", STOPPED: "STOPPED" });
    this._state = null;
    this._codeToBeExecuted = null;

    this._setState(this.POSSIBLE_STATES.STOPPED);
    this._setCodeToBeExecuted(codeToBeExecuted);

}

Thread.prototype.start = function() {

    throw new Error("Thread start, this method stands as a template from the base class Thread it must be replaced/overridden before it is able to be used.");

};

Thread.prototype.stop = function() {

    throw new Error("Thread stop, this method stands as a template from the base class Thread it must be replaced/overridden before it is able to be used.");

};


Thread.prototype.getState = function() {

    return this._state;

};

Thread.prototype._setState = function(state) {

    if ( this.POSSIBLE_STATES[state] == undefined ) {

        throw Error("Thread _setState, this method expects the parameter state to contain a constant from POSSIBLE_STATES object.");

    } else {

        this._state = state;

    }

};

Thread.prototype._getCodeToBeExecuted = function() {

    return this._codeToBeExecuted;

};

Thread.prototype._setCodeToBeExecuted = _setCodeToBeExecuted;

exports.Thread = Thread;
