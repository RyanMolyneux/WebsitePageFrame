var Action = require("../../../../src/general/actions/Action.js").Action;

var getMockAction = function() {
    return new Action(["a", "b"],
                      [ 5, 5 ],
                      function() {});
}

var propertiesEqualityTest = function(action, actionToCompareTo) {

    expect( new Function(action.getActionParameters(), action.getActionBody()) ).not.toThrow();

    expect(action.getActionParameters().length).toEqual(actionToCompareTo.getActionParameters().length);
    expect(action.getActionArguements().length).toEqual(actionToCompareTo.getActionArguements().length);

};

var propertiesEqualityTestJson = function(action, actionJsonFormattedToCompareTo) {

    expect(new Function(actionJsonFormattedToCompareTo.actionParameters, actionJsonFormattedToCompareTo.actionBody)).not.toThrow();

    expect(actionJsonFormattedToCompareTo.actionParameters.length).toEqual( action.getActionParameters().length );
    expect(actionJsonFormattedToCompareTo.actionArguements.length).toEqual( action.getActionArguements().length );

};

describe("Action test class suite", function() {

    beforeEach(function() {
        this.action = getMockAction();
    });

    it("Constructor test", function() {

        var actionToCompareTo = new Action(["a", "b"],
                                           [5, 5],
                                           function() {});

        propertiesEqualityTest(this.action, actionToCompareTo);
    });

    it("Mutators test", function() {
        var actionParametersToCompareTo = ["a", "b", "c"];
        var actionArgumentsToCompareTo = [4,4,2];
        //var actionBodyToCompareTo = {};

        this.action.setActionParameters(actionParametersToCompareTo);
        this.action.setActionArguements(actionArgumentsToCompareTo);

        propertiesEqualityTest(this.action, new Action(actionParametersToCompareTo, actionArgumentsToCompareTo, function() {}));
        //expect(this.action.setActionBody(actionBodyToCompareTo)).toThrowError(Error, "Action.setActionBody method parameter actionBody must an instance of type Function");
    });

    it("To Json Format Test", function() {
        var actionJsonFormattedToCompareTo = this.action.toJsonFormat();

        propertiesEqualityTestJson(this.action, actionJsonFormattedToCompareTo);

    });

    it("From Json Format Test", function() {
        var actionJsonFormattedToCompareTo = {
            actionParameters: [ "a" ],
            actionArguements: [ 10 ]
        };

        this.action.fromJsonFormat(actionJsonFormattedToCompareTo);
        propertiesEqualityTestJson(this.action, actionJsonFormattedToCompareTo);
    });
});;
