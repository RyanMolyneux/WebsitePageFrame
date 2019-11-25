var ChainBuilder = require("./ChainBuilder.js").ChainBuilder;
var ResponsibilityChainLink = require("../chain-links/ResponsibilityChainLink.js").ResponsibilityChainLink;

function ResponsibilityChainBuilder() {

  ChainBuilder.call(this);

}

ResponsibilityChainBuilder.prototype = Object.create( ChainBuilder.prototype );
ResponsibilityChainBuilder.prototype.constructor = ResponsibilityChainBuilder;

ResponsibilityChainBuilder.prototype.attachChainLink = function(responsibilityChainLink) {

    if ( !(responsibilityChainLink instanceof ResponsibilityChainLink) ) {

        throw new TypeError( "ResponsibilityChainBuilder attachChainLink, expected parameter responsibilityChainLink to be instanceof "
                           + " ResponsibilityChainLink.");

    } else {

        this._chain.push(responsibilityChainLink);

        return this;

    }

};

exports.ResponsibilityChainBuilder = ResponsibilityChainBuilder;
