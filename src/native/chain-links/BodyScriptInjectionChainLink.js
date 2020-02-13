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
var Script = require("../scripts/Script.js").Script;
var JSDOM = require("jsdom").JSDOM;


function BodyScriptInjectionChainLink(scriptsToBeInjected) {

    ResponseModificationChainLink.call(this);

    this._scriptsToBeInjected = null;

    this.setScriptsToBeInjected(scriptsToBeInjected);

}

BodyScriptInjectionChainLink.prototype = Object.create(ResponseModificationChainLink.prototype);
BodyScriptInjectionChainLink.prototype.constructor = BodyScriptInjectionChainLink;


BodyScriptInjectionChainLink.prototype.preformTask = function(response, cache) {

    if ( response instanceof Response ) {

        var modifiedCopyOfResponseBody = new JSDOM(response.getBody());

        for (var i = 0; i < this._scriptsToBeInjected.length; i++) {

            modifiedCopyOfResponseBody.window.document.body.innerHTML = this._scriptsToBeInjected[i].toHtmlElementString() + modifiedCopyOfResponseBody.window.document.body.innerHTML;

        }

        response.setBody( modifiedCopyOfResponseBody.serialize() );

    } else {

        throw new TypeError("BodyScriptInjectionChainLink preformTask, response expected to be instanceof Response.");

    }


};

BodyScriptInjectionChainLink.prototype.getScriptsToBeInjected = function() {

    return this._scriptsToBeInjected;

};

BodyScriptInjectionChainLink.prototype.setScriptsToBeInjected = function(scripts) {

    if ( !(scripts instanceof Array) ) {

        throw new TypeError("BodyScriptInjectionChainLink setScriptsToBeInjected, parameter scripts expected to be instanceof Array.");

    } else if ( this._arrayDoesNotOnlyContainScripts(scripts) ) {

        throw new TypeError( "BodyScriptInjectionChainLink setScriptsToBeInjected, parameter scripts Array is expected to only contain "
                           + "instances of class Script or any of its descendants.");

    } else {

        this._scriptsToBeInjected = scripts;

    }

};

BodyScriptInjectionChainLink.prototype._arrayDoesNotOnlyContainScripts = function(scripts) {

    for (var i = 0; i < scripts.length; i++) {

        if ( !(scripts[i] instanceof Script) ) {

            return true;

        }

    }

    return false;

}

exports.BodyScriptInjectionChainLink = BodyScriptInjectionChainLink;
