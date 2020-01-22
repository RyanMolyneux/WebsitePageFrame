/*
 *    This library provides an alternative in app browser to webview by removing specific restrictions placed upon iframe and more.
 *    Copyright (C) 2019  Ryan Molyneux
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
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
