var Connection = require("../../general/connections/Connection.js").Connection;
var BrowserThread = require("../threads/BrowserThread.js").BrowserThread;
var WebsitePageFrameMessageBuilder = require("../builders/WebsitePageFrameMessageBuilder.js").WebsitePageFrameMessageBuilder;
var ipcRenderer = require("electron").ipcRenderer;

var connectionRetry = function() {

    if ( this.getCurrentConnectionRetriesLeft() !== 0 ) {

        var waitForResponseInXMilliseconds = 800;
        var messageBuilder = new WebsitePageFrameMessageBuilder();

        this._getPingClient().sendMessage( messageBuilder.finishBuild() );

        setTimeout(function() {

            var responseToPingClientMessage = this._getPingClient().getResponse();


            if ( responseToPingClientMessage !== null ) {


                this._setIsConnectionOpen(true);
                this.setCurrentConnectionRetriesLeft(this.getMaxConnectionRetries());

            } else {

                if ( this.getIsConnectionOpen() ) {

                    this._setIsConnectionOpen(false);

                }

                this.setCurrentConnectionRetriesLeft( this.getCurrentConnectionRetriesLeft() - 1 );

            }


        }.bind(this), waitForResponseInXMilliseconds);

    } else {

        this.getConnectionRetryThread().stop();
        this.setCurrentConnectionRetriesLeft( this.getMaxConnectionRetries() );

        throw new Error( "WebsitePageFrameConnection openNewConnection, currentConnectionRetriesLeft is 0 unable to successfully "
                       + "open connection.");

    }

};

function WebsitePageFrameConnection(childBrowsingContextInitialURL, childBrowsingContext, maxConnectionRetries) {

    Connection.call(this, new WebsitePageFramePingClient(), new BrowserThread(connectionRetry.bind(this), 900), maxConnectionRetries);

    this._WEBSITE_URL_UNIQUE_FRAGEMENT = "websitePageFrame";
    this._childBrowsingContextCurrentOrigin = "";
    this._childBrowsingContextInitialURL = "";
    this._childBrowsingContext = null;

    if ( childBrowsingContextInitialURL !== null && childBrowsingContextInitialURL !== undefined ) {

        this.updateChildBrowsingContextCurrentLocationInformation(childBrowsingContextInitialURL);

    }

    if ( childBrowsingContext == null ) {

        childBrowsingContext = null;

    }

    this.setChildBrowsingContext(childBrowsingContext);
    this._getPingClient().setClientConnection(this);

}

WebsitePageFrameConnection.prototype = Object.create(Connection.prototype);
WebsitePageFrameConnection.prototype.constructor = WebsitePageFrameConnection;


WebsitePageFrameConnection.prototype.openNewConnection = function() {

    if ( this._childBrowsingContextInitialURL.trim().length !== 0 ) {

        if ( this.getIsConnectionOpen() || this.getConnectionRetryThread().getState() === this.getConnectionRetryThread().POSSIBLE_STATES.IS_RUNNING ) {

            this.closeCurrentConnection();

        }

        this.getChildBrowsingContext().location.replace( this._childBrowsingContextInitialURL + "#" + this._WEBSITE_URL_UNIQUE_FRAGEMENT );

        this.getConnectionRetryThread().start();

    } else {

        throw new Error( "WebsitePageFrameConnection openNewConnection, expected childBrowsingContextInitialURL to not be empty, opening a connection "
                       + "to url empty is of no use and wasteful.");

    }

};

WebsitePageFrameConnection.prototype.closeCurrentConnection = function() {

    if ( this.getConnectionRetryThread().getState() === this.getConnectionRetryThread().POSSIBLE_STATES.IS_RUNNING ) {

        this.getConnectionRetryThread().stop();

    }

    if ( this.getIsConnectionOpen() ) {

        this._setIsConnectionOpen(false);

    }

    this.getChildBrowsingContext().location.replace("");

    ipcRenderer.sendSync("clear-cache");

};


WebsitePageFrameConnection.prototype.updateChildBrowsingContextCurrentLocationInformation = function(childBrowsingContextInitialURL) {

    if ( typeof(childBrowsingContextInitialURL) !==  "string" ) {

        throw new TypeError( "WebsitePageFrameConnection updateChildBrowsingContextCurrentLocationInformation, expected parameter childBrowsingContextInitialURL to be typeof string "
                           + "but found " + (typeof(childBrowsingContextInitialURL)) + ".");

    } else {

          var childBrowsingContextCurrentOrigin = (childBrowsingContextInitialURL.split("/", 3)[0]) + "//" + (childBrowsingContextInitialURL.split("/", 3)[2]) ;

          this._childBrowsingContextInitialURL = childBrowsingContextInitialURL;
          this._childBrowsingContextCurrentOrigin = childBrowsingContextCurrentOrigin;

    }


};

WebsitePageFrameConnection.prototype._setPingClient = function(pingClient) {

    if ( !(pingClient  instanceof WebsitePageFramePingClient) ) {

        throw new TypeError("WebsitePageFrameConnection _setPingClient, parameter pingClient expected to be instanceof WebsitePageFrameClient.");

    } else {

        this._pingClient = pingClient;

    }

};

WebsitePageFrameConnection.prototype._setConnectionRetryThread = function(connectionRetryThread) {

    if ( !(connectionRetryThread instanceof BrowserThread) ) {

        throw new TypeError("WebsitePageFrameConnection _setConnectionRetryThread, parameter expected to be instanceof BrowserThread.");

    } else {

        this._connectionRetryThread = connectionRetryThread;

    }

};

WebsitePageFrameConnection.prototype.getWebsiteUrlUniqueFragment = function() {

    return this._WEBSITE_URL_UNIQUE_FRAGEMENT;

};

WebsitePageFrameConnection.prototype.getChildBrowsingContextCurrentOrigin = function() {

    return this._childBrowsingContextCurrentOrigin;

};


WebsitePageFrameConnection.prototype.getChildBrowsingContextInitialURL = function() {

    return this._childBrowsingContextInitialURL;

};

WebsitePageFrameConnection.prototype.getChildBrowsingContext = function() {

    return this._childBrowsingContext;

};

WebsitePageFrameConnection.prototype.setChildBrowsingContext = function (childBrowsingContext) {

    if ( typeof(childBrowsingContext) !== "object" && childBrowsingContext !== null) {

        throw new TypeError("WebsitePageFrameConnection setChildBrowsingContext, expected parameter childBrowsingContext to be typeof object or null.");

    } else {

        this._childBrowsingContext = childBrowsingContext;

    }

};

exports.WebsitePageFrameConnection = WebsitePageFrameConnection;

var WebsitePageFramePingClient = require("../clients/WebsitePageFramePingClient.js").WebsitePageFramePingClient;
