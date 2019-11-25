var Cache = require("../../../../src/native/caches/Cache.js").Cache;

function getMockCache() {

    var mockCache = new Cache();

    mockCache.store("name", "Bob");
    mockCache.store("Age", 100);

    return mockCache;
}

describe("Cache Class Test Suite", function() {

    beforeEach(function() {

        this.cache = getMockCache();

    });

    it("Retrieve Test", function() {

        var expectedCachedNameToCompareTo = "Bob";
        var expectedCachedAgeToCompareTo = 100;

        expect( this.cache.retrieve("NAME") ).toBe(expectedCachedNameToCompareTo);
        expect( this.cache.retrieve("age") ).toBe(expectedCachedAgeToCompareTo);
        expect( this.cache.retrieve("NONEXISTINGKEY") ).toBeUndefined();

    });

    it("Remove Test", function() {

        var expectedKeyToBeRemoved = "name";

        this.cache.remove(expectedKeyToBeRemoved);

        expect(this.cache.retrieve(expectedKeyToBeRemoved)).toBeUndefined();
        expect(this.cache.retrieve("NAME")).toBeUndefined();

    });

    it("Clear Test", function() {

        var expectedNameKeyReturnValueToBeNull = "NAME";
        var expectedAgeKeyReturnValueToBeNull = "AGE";

        this.cache.clear();

        expect(this.cache.retrieve(expectedNameKeyReturnValueToBeNull)).toBeUndefined();
        expect(this.cache.retrieve(expectedAgeKeyReturnValueToBeNull)).toBeUndefined();

    });

});
