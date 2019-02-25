function WebsitePageFrameClient(windowElementId, websiteUrl) {
    this._windowElementId = windowElementId;
    this._websiteUrl = websiteUrl;
    this._WEBSITE_URL_UNIQUE_FRAGMENT = "websitePageFrame"
    this._postMessageDataReturned;
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
}

WebsitePageFrameClient.prototype.setPostMessageDataReturned = function(postMessageDataReturned) {
    this._postMessageDataReturned = postMessageDataReturned;
}

WebsitePageFrameClient.prototype.isWindowLoaded = function() {
    var result = false;

    if (this.getPostMessageDataRetured() != null && this.getPostMessageDataReturned().ping === "pong") {
        result = true;
    }

    return result;
}


WebsitePageFrameClient.prototype.loadWindow = function() {

    var element = document.getElementById(this.getWindowElementId());

    if (element != null) {
        element.setAttribute("src", this.getWebsiteUrl() + "#" + this._WEBSITE_URL_UNIQUE_FRAGMENT);

        window.addEventListener("message", function(event) {

            if (this.getWebsiteUrl().includes(event.origin)) {
                this.setPostMessageDataReturned(event.data);
            }

        }.bind(this));
    } else {
        throw new Error("ERROR!!!, method loadPage of call WebsitePageFrame, cannot find iframe element with id " + this.getIframeId());
    }

}

WebsitePageFrameClient.prototype.postMessage = function(message) {

    this._postMessageDataReturned = null;

    var windowElement = document.getElementById(this.getWindowElementId());
    windowElement.contentWindow.postMessage(message.toJsonFormat(), this.getWebsiteUrl());
}

exports.WebsitePageFrameClient = WebsitePageFrameClient;
