var WebsitePageFrameCrossOriginMessagingScript = require("../../../../src/native/scripts/WebsitePageFrameCrossOriginMessagingScript.js").WebsitePageFrameCrossOriginMessagingScript;
var ScriptSpec = require("./Script-spec.js");

function getMockWebsitePageFrameCrossOriginMessagingScript() {
    return new WebsitePageFrameCrossOriginMessagingScript();
}

describe("WebsitePageFrameCrossOriginMessagingScript Class unit test suite", function() {
    beforeEach(function() {
        this.iframeMessageHandlerScript = getMockWebsitePageFrameCrossOriginMessagingScript();
    });

    it("Constructor test", function() {
        ScriptSpec.propertyFormatTest(this.iframeMessageHandlerScript);
    });
});
