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

var ResponsePreparationChainLink = require("./ResponsePreparationChainLink.js").ResponsePreparationChainLink;
var TaskChainBuilder = require("../../general/builders/TaskChainBuilder.js").TaskChainBuilder;
var RemoveXFrameOptionsChainLink = require("./RemoveXFrameOptionsChainLink.js").RemoveXFrameOptionsChainLink;
var AddFileSchemaToFrameAnscestorsChainLink = require("./AddFileSchemaToFrameAnscestorsChainLink.js").AddFileSchemaToFrameAnscestorsChainLink;
var BodyScriptInjectionChainLink = require("./BodyScriptInjectionChainLink.js").BodyScriptInjectionChainLink;
var WebsitePageFrameCrossOriginMessagingScript = require("../scripts/WebsitePageFrameCrossOriginMessagingScript.js").WebsitePageFrameCrossOriginMessagingScript;

function WebsitePageFrameNavigationResponsePreparation() {

    ResponsePreparationChainLink.call(this);

    this._WEBSITE_URL_UNIQUE_FRAGMENT = "#websitePageFrame";
    this._SEC_FETCH_MODE = "nested-navigate";

    var taskChainBuilder = new TaskChainBuilder();

    taskChainBuilder.attachChainLink( new RemoveXFrameOptionsChainLink());
    taskChainBuilder.attachChainLink( new AddFileSchemaToFrameAnscestorsChainLink());
    taskChainBuilder.attachChainLink( new BodyScriptInjectionChainLink( [ new WebsitePageFrameCrossOriginMessagingScript() ] ) );

    this.setTaskChain(taskChainBuilder);
}

WebsitePageFrameNavigationResponsePreparation.prototype = Object.create(ResponsePreparationChainLink.prototype);
WebsitePageFrameNavigationResponsePreparation.prototype.constructor = WebsitePageFrameNavigationResponsePreparation;

WebsitePageFrameNavigationResponsePreparation.prototype.checkIfResponsible = function(request, response, cache) {

    var isResponsible = false;
    var contentType = response.getHeaderMap().get("content-type");

    if ( (response.getStatusCode() === 200 || response.getStatusCode() === 404)
      && contentType != undefined
      && contentType.includes("text/html")) {

        var requestUrlSplit = request.getUrl().split("/", 3);
        var requestBaseUrl = requestUrlSplit[0] + "//" + requestUrlSplit[2];
        var websitePageFrameCurrentOrigin = cache.get("website-page-frame-origin");
        var requestSecFetchMode = request.getHeaderMap().get("Sec-Fetch-Mode");

        if ( request.getUrl().includes(this._WEBSITE_URL_UNIQUE_FRAGMENT)
          && websitePageFrameCurrentOrigin === undefined ) {

            cache.set("website-page-frame-origin", requestBaseUrl.replace("#websitePageFrame", "") );
            isResponsible = true;

        } else if ( requestBaseUrl === websitePageFrameCurrentOrigin
                && requestSecFetchMode === this._SEC_FETCH_MODE ) {

            isResponsible = true;

        }

    }

    return isResponsible;

};

exports.WebsitePageFrameNavigationResponsePreparation = WebsitePageFrameNavigationResponsePreparation;
