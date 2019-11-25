var MessageBuilder = require("../../general/builders/MessageBuilder.js").MessageBuilder;

function WebsitePageFrameMessageBuilder() {

    var messageSignatureGenerator = function() {

        return window.crypto.getRandomValues(new Uint32Array(1))[0];

    };

    MessageBuilder.call(this, messageSignatureGenerator);

}

WebsitePageFrameMessageBuilder.prototype = Object.create(MessageBuilder.prototype);
WebsitePageFrameMessageBuilder.prototype.constructor = WebsitePageFrameMessageBuilder;

exports.WebsitePageFrameMessageBuilder = WebsitePageFrameMessageBuilder;
