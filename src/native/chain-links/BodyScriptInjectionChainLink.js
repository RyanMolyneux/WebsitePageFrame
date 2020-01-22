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

    } else if ( this._arrayIsEmpyOrOnlyContainingScripts(scripts) === false ) {

        throw new TypeError( "BodyScriptInjectionChainLink setScriptsToBeInjected, parameter scripts Array is expected to only contain "
                           + "instances of class Script or any of its descendants.");

    } else {

        this._scriptsToBeInjected = scripts;

    }

};

BodyScriptInjectionChainLink.prototype._arrayIsEmpyOrOnlyContainingScripts = function(scripts) {

    for (var i = 0; i < scripts.length; i++) {

        if ( !(scripts[i] instanceof Script) ) {

            return false;

        }

    }

    return true;

}

exports.BodyScriptInjectionChainLink = BodyScriptInjectionChainLink;
