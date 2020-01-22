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

var ResponseModificationChainLink = require("./ResponseModificationChainLink.js").ResponseModificationChainLink;
var HeaderMap = require("../maps/HeaderMap.js").HeaderMap;
var Response = require("../network-messages/Response.js").Response;

function RemoveXFrameOptionsChainLink() {

    ResponseModificationChainLink.call(this);

}

RemoveXFrameOptionsChainLink.prototype = Object.create(ResponseModificationChainLink.prototype);
RemoveXFrameOptionsChainLink.prototype.constructor = RemoveXFrameOptionsChainLink;

RemoveXFrameOptionsChainLink.prototype.preformTask = function(response, cache) {

    if ( response instanceof Response ) {

        response.getHeaderMap().remove("x-frame-options");

    } else {

        throw new TypeError("RemoveXFrameOptionsChainLink preformTask, response parameter expected to be instanceof Response.");

    }

};

exports.RemoveXFrameOptionsChainLink = RemoveXFrameOptionsChainLink;
