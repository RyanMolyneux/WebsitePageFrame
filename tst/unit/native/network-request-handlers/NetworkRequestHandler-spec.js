var NetworkRequestHandler = require("../../../../src/native/network-request-handlers/NetworkRequestHandler.js").NetworkRequestHandler;
var Cache = require("../../../../src/native/caches/Cache.js").Cache;
var ResponsibilityChainBuilder = require("../../../../src/general/builders/ResponsibilityChainBuilder.js").ResponsibilityChainBuilder;
var ResponsibilityChainLink = require("../../../../src/general/chain-links/ResponsibilityChainLink.js").ResponsibilityChainLink;

function getMockNetworkRequestHandler() {

   var mockNetworkRequester = { name: "MyRequester" };
   var mockCache = new Cache();
   var mockResponsePreparationChainBuilder = new ResponsibilityChainBuilder();

   mockResponsePreparationChainBuilder.attachChainLink( new ResponsibilityChainLink() );
   mockResponsePreparationChainBuilder.attachChainLink( new ResponsibilityChainLink() );
   mockResponsePreparationChainBuilder.attachChainLink( new ResponsibilityChainLink() );

   return new NetworkRequestHandler( mockNetworkRequester, mockCache, mockResponsePreparationChainBuilder);

}

describe("NetworkRequestHandler Class Test Suite", function() {


    beforeEach(function() {

        this.networkRequestHandler = getMockNetworkRequestHandler();

    });

    it("Constructor Test", function() {

        var defaultNetworkRequestHandlerToCompareTo = new NetworkRequestHandler({});
        var expectedNetworkRequestToCompareTo = { name: "MyRequester" };
        var expectedLengthOfResponsePreparationChain = 3;

        expect(this.networkRequestHandler.getNetworkRequester().name).toBe(expectedNetworkRequestToCompareTo.name);
        expect(this.networkRequestHandler.getCache()).toBeInstanceOf(Cache);
        expect(this.networkRequestHandler.getResponsePreparationChain().length).toBe(expectedLengthOfResponsePreparationChain);
        expect(defaultNetworkRequestHandlerToCompareTo.getCache()).not.toBeNull();
        expect(defaultNetworkRequestHandlerToCompareTo.getResponsePreparationChain().length).toBe(0);

    });

    it("Mutators Test", function() {

        var expectedAlteredNetworkRequester = { name: "Bob" };
        var expectedAlteredCache = new Cache();
        var expectedLengthOfAlteredResponsePreparationChain = 1;
        var newResponsePreparationChainBuilder = new ResponsibilityChainBuilder();

        newResponsePreparationChainBuilder.attachChainLink( new ResponsibilityChainLink() );

        this.networkRequestHandler.setNetworkRequester(expectedAlteredNetworkRequester);
        this.networkRequestHandler.setCache(expectedAlteredCache);
        this.networkRequestHandler.setResponsePreparationChain(newResponsePreparationChainBuilder);

        expect(this.networkRequestHandler.getNetworkRequester().name).toBe(expectedAlteredNetworkRequester.name);
        expect(this.networkRequestHandler.getCache()).toBe(expectedAlteredCache);
        expect(this.networkRequestHandler.getResponsePreparationChain().length).toBe(expectedLengthOfAlteredResponsePreparationChain);
        expect(function() {

            this.networkRequestHandler.setNetworkRequester("MyNetworkRequesterAsPrimitive");

        }.bind(this)).toThrowError();
        expect(function() {

            this.networkRequestHandler.setCache([]);

        }.bind(this)).toThrowError();
        expect(function() {

            this.networkRequestHandler.setResponsePreparationChain([]);

        }.bind(this)).toThrowError();

    });

    it("Handle Network Request Test", function() {

        expect(function() {

            this.networkRequestHandler.handleNetworkRequest();

        }.bind(this)).toThrowError();

    });


});
