function WebsitePageFrameClient(windowElementId, websiteUrl) {
    this._WEBSITE_URL_UNIQUE_FRAGMENT = "websitePageFrame"
    this._windowElementId = windowElementId;
    this._websiteUrl = websiteUrl;
    this._onLocationChangeDo = null;
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

WebsitePageFrameClient.prototype.getOnLocationChangeDo = function() {
    return this._onLocationChangeDo;
};

WebsitePageFrameClient.prototype.setOnLocationChangeDo = function(onLocationChangeDo) {

    var websitePageFrame = document.getElementById(this._windowElementId);

    if (websitePageFrame != null) {

        websitePageFrame.removeEventListener("load", this._onWindowLoadedDo);

        this._onLocationChangeDo = onLocationChangeDo;

        websitePageFrame.addEventListener("load", this._onLocationChangeDo);

    } else {

        throw new Error("ERROR expected element with id " + (this._windowElementId) + " to be present in document but did not find.");

    }

};

WebsitePageFrameClient.prototype.setOnWindowLoadedDo = function(onWindowLoadedDo, intervalCheckRate) {

    if ( !(onWindowLoadedDo instanceof Function) ) {

        throw new TypeError("WebsitePageFrameClient setOnWindowLoadedDo, arguement onWindowLoadedDo expected to be instanceof Function.");

    } else if (typeof(intervalCheckRate) !== "number") {

        throw new TypeError("WebsitePageFrameClient setOnWindowLoadedDo, arguement intervalCheckRate expected to be typeof 'number' but found " + (typeof(intervalCheckRate)));

    } else {
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
    console.log(websitePageFrame.contentDocument.readyState);
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
