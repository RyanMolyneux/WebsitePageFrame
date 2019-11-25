var BrowserThread = require("../../../../src/client/threads/BrowserThread.js").BrowserThread;


function getMockBrowserThread() {

    return new BrowserThread(function () {}, 2000);

}


describe("BrowserThread class test suite", function() {

    beforeEach(function() {

        this.browserThread = getMockBrowserThread();

    });

    it("Constructor Test", function () {

        var defaultBrowserThread = new BrowserThread(function() {});

        expect(this.browserThread.getCodeIsToBeExecutedEveryXMilliseconds()).toBe(2000);

        expect(defaultBrowserThread.getCodeIsToBeExecutedEveryXMilliseconds()).toBe(1000);

        expect(function () { return new BrowserThread({}, 1000); }.bind(this) ).toThrowError();

    });

    it("Mutators Test", function () {

        var codeIsToBeExecutedEveryXMillisecondsToCompareTo = 1250;
        var copyOfSetIsCodeToBeExecutedXMilliseconds = this.browserThread.setCodeIsToBeExecutedEveryXMilliseconds;
        var codeIsToBeExecutedEveryXMillisecondsErrorCheck = copyOfSetIsCodeToBeExecutedXMilliseconds.bind(this.thread, 1.25);
        var codeIsToBeExecutedEveryXMillisecondsErrorCheckTwo = copyOfSetIsCodeToBeExecutedXMilliseconds.bind(this.thread, null);


        this.browserThread.setCodeIsToBeExecutedEveryXMilliseconds(codeIsToBeExecutedEveryXMillisecondsToCompareTo);

        expect( this.browserThread.getCodeIsToBeExecutedEveryXMilliseconds() ).toBe(codeIsToBeExecutedEveryXMillisecondsToCompareTo);

        expect( codeIsToBeExecutedEveryXMillisecondsErrorCheck ).toThrowError();

        expect( codeIsToBeExecutedEveryXMillisecondsErrorCheckTwo ).toThrowError();

    });



});
