describe("BrowserThread Test Suite", function() {

    beforeAll(function() {

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    });

    beforeEach(function() {

        var electronAppScriptPath = __dirname + "/../..";

        this.app = this.setupMockSpectronApp(electronAppScriptPath);

        return this.app.start();

    });

    afterEach(function() {

        if ( this.app != null && this.app.isRunning() ) {

            return this.app.stop();

        }

    });

    it("BrowserThread Code Execution Test", function() {

        return this.app.client.executeAsync(function(currentBrowserThreadFinishedJob) {

                  window.numberOfTimesBrowserThreadFunctionExecuted = 0;
                  window.currentBrowserThreadFinishedJob = currentBrowserThreadFinishedJob

                  var currentBrowserThread = new websitePageFrame.BrowserThread(function() {

                      numberOfTimesBrowserThreadFunctionExecuted++;

                      if (numberOfTimesBrowserThreadFunctionExecuted >= 10) {

                          currentBrowserThread.stop();
                          currentBrowserThreadFinishedJob(numberOfTimesBrowserThreadFunctionExecuted);

                      }

                  }, 500);

                  currentBrowserThread.start();

               }).then(function(expectedBrowserThreadCodeToBeExecutedExecutionCount) {

                  expectedBrowserThreadCodeToBeExecutedExecutionCount = expectedBrowserThreadCodeToBeExecutedExecutionCount.value;

                  expect(expectedBrowserThreadCodeToBeExecutedExecutionCount).toBe(10);

               });

    });

    it("Browser Thread state change Test", function() {

        return this.app.client.execute(function() {

            window.myBrowserThread = new websitePageFrame.BrowserThread(function() {

                console.log("IM RUNNING");

            }, 1000);

            myBrowserThread.start();

            return (myBrowserThread.getState() === myBrowserThread.POSSIBLE_STATES.IS_RUNNING);

        }).then(function(expectedIsRunning) {

            expectedIsRunning = expectedIsRunning.value;

            expect(expectedIsRunning).toBe(true)

        }).execute(function() {

            myBrowserThread.stop();


            return (myBrowserThread.getState() === myBrowserThread.POSSIBLE_STATES.STOPPED);

        }).then(function(expectedHasStopped) {

            expectedHasStopped = expectedHasStopped.value;

            expect(expectedHasStopped).toBe(true);

        });

    });

});
