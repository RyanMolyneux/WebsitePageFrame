var Thread = require("../../../../src/general/threads/Thread.js").Thread;

function getMockThread() {

    return new Thread(function() {});

}


describe("Thread class test suite", function() {

    beforeEach(function() {

        this.thread = getMockThread();

    });

    it("Constructor Test", function() {

        expect(function () { new Thread(null); }).toThrowError();
        expect(this.thread.getState()).toBe(this.thread.POSSIBLE_STATES.STOPPED);

    });

    it("Start Test", function() {

        expect(function () { this.thread.start(); }).toThrowError();

    });

    it("Stop Test", function() {

        expect(function() { this.thread.start(); }).toThrowError();

    });

    it("PossibleStates Test", function() {

        var newPossibleStateModificationCheck = "STILL_RUNNING";

        expect(this.thread.POSSIBLE_STATES.IS_RUNNING).toBe("IS_RUNNING");
        expect(this.thread.POSSIBLE_STATES.STOPPED).toBe("STOPPED");

        this.thread.POSSIBLE_STATES.IS_RUNNING = newPossibleStateModificationCheck;

        expect(this.thread.POSSIBLE_STATES.IS_RUNNING).toBe("IS_RUNNING");

    });


});
