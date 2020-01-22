var Map = require("../../../../src/general/maps/Map.js").Map;


function getMockMap() {

    return new Map();

}

describe("Map Class Test Suite", function() {


    beforeEach(function() {

        this.map = getMockMap();

    });

    it("Test Default Set Key & Value", function() {

        expect(function() {

            this.map.set("myKey0", "myKeysValue");

        }.bind(this)).toThrowError();

    });

    it("Test Default Get Key Value", function() {

        expect(function() {

            this.map.get("myKey1");

        }.bind(this)).toThrowError();

    });

    it("Test Default Remove Key & Value", function() {

        expect(function() {

            this.map.remove("myKey2");

        }.bind(this)).toThrowError();

    });

    it("Test Default Has Key", function() {

        expect(function() {

            this.map.has("myKey3");

        }.bind(this)).toThrowError();

    });

});
