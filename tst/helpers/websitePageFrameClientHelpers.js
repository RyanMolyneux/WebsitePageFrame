beforeAll(function() {

    this.setupWindowWebsitePageFrameClient = function(childBrowsingContextCurrentURL, iframeElementId,  responseExpectedByTimeoutMilliseconds, maxConnectionRetries) {

        if ( iframeElementId == null ) {

            iframeElementId = "nestedBrowsingContext";

        }

        if ( responseExpectedByTimeoutMilliseconds == null ) {

            responseExpectedByTimeoutMilliseconds = 8000;

        }

        if ( maxConnectionRetries == null ) {

            maxConnectionRetries = 5;

        }

        var childBrowsingContext = document.getElementById(iframeElementId).contentWindow;



        var websitePageFrameConnection = new websitePageFrame.WebsitePageFrameConnection(childBrowsingContextCurrentURL, childBrowsingContext, maxConnectionRetries);

        websitePageFrameConnection.openNewConnection();

        window.websitePageFrameClient = new websitePageFrame.WebsitePageFrameClient(websitePageFrameConnection, responseExpectedByTimeoutMilliseconds);

    };


    this.waitUntilConnectionReady = function(finishedJobCallback) {

        window.waitUntilIntervalId = setInterval(function(finishedJobCallback) {

           if ( websitePageFrameClient.isConnectionReady() ) {

                finishedJobCallback();
                clearInterval(waitUntilIntervalId);

          }

        }.bind(window, finishedJobCallback), 1000);

    };

    this.waitUntilWebsitePageFrameResponseReturned = function(finishedJobCallback) {

        window.waitUntilIntervalId = setInterval(function(finishedJobCallback) {

            if ( websitePageFrameClient.getResponse() !== null ) {

                finishedJobCallback();
                clearInterval(waitUntilIntervalId);

            }


        }.bind(window, finishedJobCallback), 1000);

    };



});
