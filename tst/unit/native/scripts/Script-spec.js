var Script = require("../../../../src/native/scripts/Script.js").Script;

function getMockScript() {
    return new Script(function () {
        this.helloWorld = true;
    });
}

function propertyFormatTest(scriptBeingFormatChecked) {
    scriptHtmlElementString = scriptBeingFormatChecked.toHtmlElementString();

    expect(scriptBeingFormatChecked.getScriptCode() instanceof Function).toBe(true);
    expect(scriptHtmlElementString).toMatch("^<script>");
    expect(scriptHtmlElementString).toMatch("</script>$")
}


describe("Script Class unit tests suite", function() {
    beforeEach(function() {
        this.script = getMockScript();
    });

    it("Constructor test", function() {
        propertyFormatTest(this.script);
    });
});

exports.propertyFormatTest = propertyFormatTest;
