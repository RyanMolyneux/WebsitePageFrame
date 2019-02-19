function WebsitePageFrameClient(windowElementId, websiteUrl) {
    this._windowElementId = windowElementId;
    this._websiteUrl = websiteUrl;
    this._WEBSITE_URL_UNIQUE_FRAGMENT = "websitePageFrame"
}

WebsitePageFrameClient.prototype.getWindowElementId = function() {
    return this._windowElementId;
}

WebsitePageFrameClient.prototype.setWindowElementId = function(windowElementId) {
    this._windowElementId = windowElementId;
}

WebsitePageFrameClient.prototype.getWebsiteUrl = function() {
    return this._websiteUrl;
}

WebsitePageFrameClient.prototype.setWebsiteUrl = function(websiteUrl) {
    this._websiteUrl = websiteUrl;
}

WebsitePageFrameClient.prototype.loadPage = function() {

    var element = document.getElementById(this.getWindowElementId());

    if (element != null) {
        element.setAttribute("src", this.getWebsiteUrl() + "#" + this._WEBSITE_URL_UNIQUE_FRAGMENT);
    } else {
      throw new Error("ERROR!!!, method loadPage of call WebsitePageFrame, cannot find iframe element with id " + this.getIframeId());
    }

}

WebsitePageFrameClient.prototype.postMessage = function(message) {
    var windowElement = document.getElementById(this.windowElementId);

    window.contentWindow.postMessage("message", message);
}

exports.WebsitePageFrameClient = WebsitePageFrameClient;
