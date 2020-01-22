var Cache = require("../../../../src/native/maps/Cache.js").Cache;

function getMockCache() {

    var mockCache = new Cache();

    mockCache.set("name", "Bob");
    mockCache.set("Age", 100);
    mockCache.set("heightFt", "5.2");

    return mockCache;
}

describe("Cache Class Test Suite", function() {

    beforeEach(function() {

        this.cache = getMockCache();

    });

    it("Set Test", function() {

        var expectedKeyToThrowTypeError = 2;

        expect( function() {

            this.cache.set(expectedKeyToThrowTypeError, "InvalidKeysValue");

            }.bind(this)

        ).toThrowError();

    });

    it("Get Test", function() {

        var expectedCachedNameToCompareTo = "Bob";
        var expectedCachedAgeToCompareTo = 100;

        expect( this.cache.get("NAME") ).toBe(expectedCachedNameToCompareTo);
        expect( this.cache.get("age") ).toBe(expectedCachedAgeToCompareTo);
        expect( this.cache.get("NONEXISTINGKEY") ).toBeUndefined();

    });

    it("Remove Test", function() {

        var expectedKeyToBeRemoved = "name";

        this.cache.remove(expectedKeyToBeRemoved);

        expect(this.cache.get(expectedKeyToBeRemoved)).toBeUndefined();
        expect(this.cache.get("NAME")).toBeUndefined();

    });

    it("Has Test", function() {


        var expectedKeyCacheToHave = "HeightFT";

        expect( this.cache.has(expectedKeyCacheToHave) ).toBe(true);

    });

    it("Clear Test", function() {

        var expectedNameKeyReturnValueToBeNull = "NAME";
        var expectedAgeKeyReturnValueToBeNull = "AGE";

        this.cache.clear();

        expect(this.cache.get(expectedNameKeyReturnValueToBeNull)).toBeUndefined();
        expect(this.cache.get(expectedAgeKeyReturnValueToBeNull)).toBeUndefined();

    });

});
