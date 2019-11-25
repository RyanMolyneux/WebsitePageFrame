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

    if ( this.POSSIBLE_STATES[state] === undefined ) {

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