var HeaderMap = require("../../../../src/native/maps/HeaderMap.js").HeaderMap;

function getMockHeaderMap() {

    var mockHeaderMap = new HeaderMap();

    mockHeaderMap.set("content-type", "text/html");
    mockHeaderMap.set("MyCustomHeader", ["EntryOne", "EntryTwo"]);
    mockHeaderMap.append("MyCustomHeader", "EntryThree");

    return mockHeaderMap;

}

describe("HeaderMap Class Test Suite", function() {

    beforeEach(function() {

        this.headerMap = getMockHeaderMap();

    });

    it("Test Get", function() {

       var expectedFirstKeyCheckValue = "text/html";
       var expectedSecondKeyCheckValueLength = 3;
       var expectedLastKeyCheckNonExistantKeyEntry = "Non-Existant-Entry";
       var customHeaderEntry = this.headerMap.get("MyCustomHeader");

      expect( this.headerMap.get("CoNTeNT-Type") ).toBe( expectedFirstKeyCheckValue );

      expect( customHeaderEntry ).toBeInstanceOf(Array);
      expect( customHeaderEntry.length ).toBe(expectedSecondKeyCheckValueLength);

      expect( this.headerMap.get(expectedLastKeyCheckNonExistantKeyEntry) ).toBeUndefined();

    });


    it("Test Remove", function() {

        var expectedKeyToHaveBeenRemoved = "content-type";

        this.headerMap.remove(expectedKeyToHaveBeenRemoved);

        expect( this.headerMap.get(expectedKeyToHaveBeenRemoved) ).toBeUndefined();

    });

    it("Test Has", function() {

        var expectedKeyToHave = "MyCustomHeader";
        var expectedKeyToNotHave = "MyCustomHeader2";

        expect( this.headerMap.has(expectedKeyToHave) ).toBe(true);
        expect( this.headerMap.has(expectedKeyToNotHave) ).toBe(false);

    });

    it("Test From Object", function() {


        var expectedObjectToSuccessfullyFillHeaderMap = {
            "content-type": [ "text/html" ],
            "Content-Encoding": "gzip"
        };


        this.headerMap.fromObject(expectedObjectToSuccessfullyFillHeaderMap);

        expect(this.headerMap.get("content-type")).toBe(expectedObjectToSuccessfullyFillHeaderMap["content-type"][0]);
        expect(this.headerMap.get("content-encoding")).toBe(expectedObjectToSuccessfullyFillHeaderMap["Content-Encoding"]);

        expect(function () {

            this.headerMap.fromObject(null);

        }.bind(this)).toThrowError();


    });


});
