var Builder = require("./Builder.js").Builder;
var ChainLink = require("../chain-links/ChainLink.js").ChainLink;

function ChainBuilder() {

    Builder.call(this);

    this._chain = [];

}

ChainBuilder.prototype = Object.create( Builder.prototype );
ChainBuilder.prototype.constructor = ChainBuilder;

ChainBuilder.prototype.attachChainLink = function(chainLink) {

    if ( !( chainLink instanceof ChainLink ) ) {

        throw new TypeError("ChainBuilder attachChainLink, parameter chainLink expected to be instanceof ChainLink");

    } else {

        this._chain.push(chainLink);

        return this;

    }

};

ChainBuilder.prototype.finishBuild = function() {

    var chainBuilt = this._chain;

    this._chain = [];

    return chainBuilt;

}

exports.ChainBuilder = ChainBuilder;
