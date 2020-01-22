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
