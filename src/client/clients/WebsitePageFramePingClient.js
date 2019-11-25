var WebsitePageFrameClient = require("./WebsitePageFrameClient.js").WebsitePageFrameClient;

function WebsitePageFramePingClient() {

     WebsitePageFrameClient.call(this);

};

WebsitePageFramePingClient.prototype = Object.create(WebsitePageFrameClient.prototype);
WebsitePageFramePingClient.prototype.constructor = WebsitePageFramePingClient;

WebsitePageFramePingClient.prototype.sendMessagePreChecks = function(message) {

    return true;

};

exports.WebsitePageFramePingClient = WebsitePageFramePingClient;
