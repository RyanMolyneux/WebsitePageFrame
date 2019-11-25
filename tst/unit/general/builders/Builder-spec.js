var Builder = require("../../../../src/general/builders/Builder.js").Builder;

function getMockBuilder() {

    return new Builder();

}

describe("Builder Class test suite", function() {

    beforeEach(function() {

        this.builder = getMockBuilder();

    });

    it("Finish Build Test", function() {


        expect(this.builder.finishBuild.bind(this)).toThrowError();

    });

});
