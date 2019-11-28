/*
 *    This library provides a way to allow browser based programs to have cross parent to child window communication through code.
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
var Response = require("../network-messages/Response.js").Response;

function RemoveXFrameOptionsChainLink() {

    ResponseModificationChainLink.call(this);

}

RemoveXFrameOptionsChainLink.prototype = Object.create(ResponseModificationChainLink.prototype);
RemoveXFrameOptionsChainLink.prototype.constructor = RemoveXFrameOptionsChainLink;

RemoveXFrameOptionsChainLink.prototype.preformTask = function(response) {

    if ( response instanceof Response ) {

        var modifiedCopyOfResponseHeaders = {};
        var responseHeadersObjectKeys = Object.keys(response.getHeaders());

        for (var i = 0; i < responseHeadersObjectKeys.length; i++) {

            if ( responseHeadersObjectKeys[i] !== "x-frame-options" && responseHeadersObjectKeys[i] !== "content-encoding") {

                modifiedCopyOfResponseHeaders[ responseHeadersObjectKeys[i] ] = response.getHeaders()[ responseHeadersObjectKeys[i] ];

            }

        }

        return new Response(modifiedCopyOfResponseHeaders, response.getBody(), response.getStatusCode());

    } else {

        throw new TypeError("RemoveXFrameOptionsChainLink preformTask, response parameter expected to be instanceof Response.");

    }

};

exports.RemoveXFrameOptionsChainLink = RemoveXFrameOptionsChainLink;
