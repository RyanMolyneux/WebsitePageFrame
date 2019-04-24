var WINDOW_LOCATION_CHANGE_DO = function() {

    var websitePageFrame = document.getElementById(this._windowElementId);

    if ( !(websitePageFrame.contentWindow.location.href.includes(this._WEBSITE_URL_UNIQUE_FRAGMENT)) ) {

        this.setWebsiteUrl(websitePageFrame.contentWindow.location.href);
        this.loadWindow();
        websitePageFrame.contentWindow.location.reload();

    }

}

function WebsitePageFrameClient(windowElementId, websiteUrl) {
    this._WEBSITE_URL_UNIQUE_FRAGMENT = "websitePageFrame";
    this._WINDOW_LOCATION_CHANGE_DO = null;
    this._windowElementId = windowElementId;
    this._websiteUrl = websiteUrl;
    this._onWindowLocationHrefChangeDo = null;
    this._onWindowLocationHrefChangeDoIntervalId = null;
    this._onWindowLoadedDo = null;
    this._onWindowLoadedDoIntervalId = null;
    this._postMessageDataReturned = null;
};

WebsitePageFrameClient.prototype.getWindowElementId = function() {
    return this._windowElementId;
};

WebsitePageFrameClient.prototype.setWindowElementId = function(windowElementId) {
    this._windowElementId = windowElementId;
};

WebsitePageFrameClient.prototype.getWebsiteUrl = function() {
    return this._websiteUrl;
};

WebsitePageFrameClient.prototype.setWebsiteUrl = function(websiteUrl) {
    this._websiteUrl = websiteUrl;
};

WebsitePageFrameClient.prototype.getPostMessageDataReturned = function() {
    return this._postMessageDataReturned;
};

WebsitePageFrameClient.prototype.setPostMessageDataReturned = function(postMessageDataReturned) {
    this._postMessageDataReturned = postMessageDataReturned;
};


WebsitePageFrameClient.prototype.setOnWindowLocationHrefChangeDo = function(onWindowLocationHrefChangeDo, intervalCheckRate) {

    if ( !(onWindowLocationHrefChangeDo instanceof Function) ) {

        throw new TypeError("WebsitePageFrameClient setOnWindowLocationHrefChangeDo, expected arguement onWindowLocationHrefChangeDo to be instance of Function.");

    } else if ( typeof(intervalCheckRate) !== "number" ) {

        throw new TypeError("WebsitePageFrameClient setOnWindowLocationHrefChangeDo, expected argument intervalCheckRate to be typeof 'number' but found " + (typeof(intervalCheckRate)));

    } else {

        if (this._onWindowLocationHrefChangeDo != null) {

            this.removeOnWindowLocationHrefChangeDo();

        }

        this.setWebsiteUrl(document.getElementById(this._windowElementId).contentWindow.location.href);

        this._onWindowLocationHrefChangeDo = onWindowLocationHrefChangeDo;
        this._onWindowLocationHrefChangeDoIntervalId = setInterval(function() {

            var websitePageFrameCurrentLocationHref = document.getElementById(this._windowElementId).contentWindow.location.href;

            if (this._websiteUrl !== websitePageFrameCurrentLocationHref) {



                this.setWebsiteUrl(websitePageFrameCurrentLocationHref);

                setTimeout(function(websitePageFrameCurrentLocationHref) {

                    if (this.getWebsiteUrl() === websitePageFrameCurrentLocationHref) {

                        this._onWindowLocationHrefChangeDo();

                    }

                }.bind(this, websitePageFrameCurrentLocationHref), 1000);
            }

        }.bind(this), intervalCheckRate);

    }

};

WebsitePageFrameClient.prototype.removeOnWindowLocationHrefChangeDo = function() {

    this._onWindowLocationHrefChangeDo = null;
    clearInterval(this._onWindowLocationHrefChangeDoIntervalId);

}

WebsitePageFrameClient.prototype.setOnWindowLoadedDo = function(onWindowLoadedDo, intervalCheckRate) {

    if ( !(onWindowLoadedDo instanceof Function) ) {

        throw new TypeError("WebsitePageFrameClient setOnWindowLoadedDo, arguement onWindowLoadedDo expected to be instanceof Function.");

    } else if (typeof(intervalCheckRate) !== "number") {

        throw new TypeError("WebsitePageFrameClient setOnWindowLoadedDo, arguement intervalCheckRate expected to be typeof 'number' but found " + (typeof(intervalCheckRate)));

    } else {

        if (this._onWindowLoadedDo != null) {

            clearInterval(this._onWindowLoadedDoIntervalId);

        }

        this._onWindowLoadedDo = onWindowLoadedDo;
        this._onWindowLoadedDoIntervalId = setInterval(function() {

            if (this.isWindowLoaded() === true) {

              this._onWindowLoadedDo();
              this._onWindowLoadedDo = null;
              clearInterval(this._onWindowLoadedDoIntervalId);
              this._onWindowLoadedDoIntervalId = null;

            }

        }.bind(this), intervalCheckRate);
    }
}


WebsitePageFrameClient.prototype.isWindowLoaded = function() {

    var result = false;
    var websitePageFrame = document.getElementById(this._windowElementId);

    if (websitePageFrame != null && websitePageFrame.contentDocument.readyState === "complete") {
        result = true;
    }

    return result;
}


WebsitePageFrameClient.prototype.loadWindow = function() {

    var websitePageFrame = document.getElementById(this._windowElementId);

    if (websitePageFrame != null) {

        websitePageFrame.setAttribute("src", this._websiteUrl + "#" + this._WEBSITE_URL_UNIQUE_FRAGMENT);

        window.addEventListener("message", function(event) {

            if (this._websiteUrl.includes(event.origin)) {
                this.setPostMessageDataReturned(event.data);
            }

        }.bind(this));

        if (this._WINDOW_LOCATION_CHANGE_DO == null) {

            this._WINDOW_LOCATION_CHANGE_DO = WINDOW_LOCATION_CHANGE_DO;

            websitePageFrame.addEventListener("load", this._WINDOW_LOCATION_CHANGE_DO.bind(this));

        }
    } else {
        throw new Error("ERROR!!!, method loadPage of call WebsitePageFrame, cannot find iframe element with id " + this._windowElementId);
    }

}

WebsitePageFrameClient.prototype.postMessage = function(message) {

    this._postMessageDataReturned = null;

    var windowElement = document.getElementById(this._windowElementId);

    windowElement.contentWindow.postMessage(message.toJsonFormat(), this._websiteUrl);
}

exports.WebsitePageFrameClient = WebsitePageFrameClient;
