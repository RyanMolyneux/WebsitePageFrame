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

var ResponsibilityChainLink = require("../../general/chain-links/ResponsibilityChainLink.js").ResponsibilityChainLink;

function ResponsePreparationChainLink(taskChainBuilder) {

    ResponsibilityChainLink.call(this, taskChainBuilder);

}

ResponsePreparationChainLink.prototype = Object.create(ResponsibilityChainLink.prototype);
ResponsePreparationChainLink.prototype.constructor = ResponsePreparationChainLink;

ResponsePreparationChainLink.prototype.checkIfResponsible = function(request, response, cache) {

    throw new Error("ResponsePreparationChainLink checkIfResponsible, this is a abstract method which should be overridden before being used.");

};

ResponsePreparationChainLink.prototype.handleResponsibility = function(response, cache) {

    for (var i = 0; i < this.getTaskChain().length; i++) {

        this.getTaskChain()[i].preformTask(response, cache);

    }

};

exports.ResponsePreparationChainLink = ResponsePreparationChainLink;
