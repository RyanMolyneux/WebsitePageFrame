function WebsitePageFrame(interceptors) {
    this._interceptors = interceptors;
    this._WEBSITE_URL_UNIQUE_FRAGEMENT = "#websitePageFrame";
}

WebsitePageFrame.prototype.getInterceptors = function() {
    return this._interceptors;
}

WebsitePageFrame.prototype.setInterceptors = function(interceptors) {
    this._interceptors = interceptors;
}

WebsitePageFrame.prototype.getWebsiteUrlUniqueFragment = function() {
    return this._WEBSITE_URL_UNIQUE_FRAGEMENT;
}

exports.WebsitePageFrame = WebsitePageFrame;
