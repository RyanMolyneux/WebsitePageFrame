var Thread = require("../../general/threads/Thread.js").Thread;

function _setCodeToBeExecuted(codeToBeExecuted) {

    if ( !(codeToBeExecuted instanceof Function) ) {

        throw new TypeError("BrowserThread _setCodeToBeExecuted, parameter codeToBeExecuted expected to be instanceof Function.");

    } else {

        this._codeToBeExecuted = codeToBeExecuted;

    }

}

function _setCodeExecutingIntervalId (codeExecutingIntervalId) {

    if ( typeof(codeExecutingIntervalId) !== "number" && codeExecutingIntervalId !== null) {

        throw new TypeError("BrowserThread _setCodeExecutingIntervalId, parameter codeExecutingIntervalId expected to be typeof number or null but found " + (typeof(codeExecutingIntervalId)) + ".");

    } else {

        this._codeExecutingIntervalId = codeExecutingIntervalId;

    }

}

function setCodeIsToBeExecutedEveryXMilliseconds(codeIsToBeExecutedEveryXMilliseconds) {

    if ( typeof(codeIsToBeExecutedEveryXMilliseconds) !== "number" ) {

        throw new TypeError( "BrowserThread _setCodeIsToBeExecutedEveryXMilliseconds, expected parameter codeIsToBeExecutedEveryXMilliseconds to be "
                           + "typeof number but found " + (typeof(codeIsToBeExecutedEveryXMilliseconds)) + ".");

    } else if ( (codeIsToBeExecutedEveryXMilliseconds % 1) !== 0) {

        throw new TypeError( "BrowserThread _setCodeIsToBeExecutedEveryXMilliseconds, expected parameter codeIsToBeExecutedEveryXMilliseconds to be "
                           + " a integer but found " + (codeIsToBeExecutedEveryXMilliseconds) + ".")

    } else {

        this._codeIsToBeExecutedEveryXMilliseconds = codeIsToBeExecutedEveryXMilliseconds;

    }

}


function BrowserThread(codeToBeExecuted, codeIsToBeExecutedEveryXMilliseconds) {

    Thread.call(this, codeToBeExecuted);

    this._codeExecutingIntervalId = null;
    this._codeIsToBeExecutedEveryXMilliseconds = null;

    if ( codeIsToBeExecutedEveryXMilliseconds == null ) {

        codeIsToBeExecutedEveryXMilliseconds = 1000;

    }

    this.setCodeIsToBeExecutedEveryXMilliseconds(codeIsToBeExecutedEveryXMilliseconds);

}

BrowserThread.prototype = Object.create(Thread.prototype);
BrowserThread.prototype.constructor = BrowserThread;


BrowserThread.prototype.start = function() {

    if ( this.getState() === this.POSSIBLE_STATES.STOPPED && this._getCodeExecutingIntervalId() === null) {

        this._setCodeExecutingIntervalId( setInterval(this._getCodeToBeExecuted(), this.getCodeIsToBeExecutedEveryXMilliseconds()) );
        this._setState(this.POSSIBLE_STATES.IS_RUNNING);

    } else {

        throw new Error("BrowserThread start, thread is already in a running state.");

    }

};

BrowserThread.prototype.stop = function() {

    if ( this.getState() === this.POSSIBLE_STATES.IS_RUNNING ) {

        clearInterval( this._getCodeExecutingIntervalId() );

        this._setCodeExecutingIntervalId(null);
        this._setState(this.POSSIBLE_STATES.STOPPED);

    } else {

        throw new Error("BrowserThread stop, thread is already in a stopped state.");

    }

};

BrowserThread.prototype._setCodeToBeExecuted = _setCodeToBeExecuted;

BrowserThread.prototype._getCodeExecutingIntervalId = function() {

    return this._codeExecutingIntervalId;

};

BrowserThread.prototype._setCodeExecutingIntervalId = _setCodeExecutingIntervalId;

BrowserThread.prototype.getCodeIsToBeExecutedEveryXMilliseconds = function() {

    return this._codeIsToBeExecutedEveryXMilliseconds;

};

BrowserThread.prototype.setCodeIsToBeExecutedEveryXMilliseconds = setCodeIsToBeExecutedEveryXMilliseconds;


exports.BrowserThread = BrowserThread;
