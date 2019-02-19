function WebsitePageFrame(interceptors) {
    this._interceptors = interceptors;
}

WebsitePageFrame.prototype.getInterceptors = function() {
    return this._interceptors;
}

WebsitePageFrame.prototype.setInterceptors = function(interceptors) {
    this._interceptors = interceptors;
}

exports.WebsitePageFrame = WebsitePageFrame;
