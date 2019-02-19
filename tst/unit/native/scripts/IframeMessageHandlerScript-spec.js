var IframeMessageHandlerScript = require("../../../../src/native/scripts/IframeMessageHandlerScript.js").IframeMessageHandlerScript;
var ScriptSpec = require("./Script-spec.js");

function getMockIframeMessageHandlerScript() {
    return new IframeMessageHandlerScript();
}

describe("IframeMessageHandlerScript Class unit test suite", function() {
    beforeEach(function() {
        this.iframeMessageHandlerScript = getMockIframeMessageHandlerScript();
    });

    it("Constructor test", function() {
        ScriptSpec.propertyFormatTest(this.iframeMessageHandlerScript);
    });
});
