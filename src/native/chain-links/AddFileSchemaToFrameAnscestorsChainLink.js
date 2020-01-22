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
var Response = require("../network-messages/Response.js").Response;

function AddFileSchemaToFrameAnscestorsChainLink() {

    ResponseModificationChainLink.call(this);

}

AddFileSchemaToFrameAnscestorsChainLink.prototype = Object.create(ResponseModificationChainLink.prototype);
AddFileSchemaToFrameAnscestorsChainLink.prototype.constructor = AddFileSchemaToFrameAnscestorsChainLink;

AddFileSchemaToFrameAnscestorsChainLink.prototype.preformTask = function(response, cache) {

    if ( response instanceof Response ) {

        var contentSecurityPolicy = response.getHeaderMap().get("content-security-policy");

        if ( contentSecurityPolicy !== undefined && contentSecurityPolicy.includes("frame-ancestors") ) {


                var contentSecurityPolicySplit = contentSecurityPolicy.split("frame-ancestors");


                response.getHeaderMap().set("content-security-policy", contentSecurityPolicySplit[0]
                                                                    + "frame-ancestors file://* "
                                                                    + contentSecurityPolicySplit[1] );

        }

    } else {

        throw new TypeError("AddFileSchemaToFrameAnscestorsChainLink preformTask, parameter response expected to be instanceof Response.");

    }


};

exports.AddFileSchemaToFrameAnscestorsChainLink = AddFileSchemaToFrameAnscestorsChainLink;
