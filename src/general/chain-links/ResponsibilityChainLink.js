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

var ChainLink = require("./ChainLink.js").ChainLink;
var TaskChainBuilder = require("../builders/TaskChainBuilder.js").TaskChainBuilder;

function ResponsibilityChainLink(taskChainBuilder) {

    ChainLink.call(this);

    this._taskChain = null;

    if ( taskChainBuilder == null ) {

      taskChainBuilder = new TaskChainBuilder();

    }

    this.setTaskChain(taskChainBuilder);

}

ResponsibilityChainLink.prototype = Object.create( ChainLink.prototype);
ResponsibilityChainLink.prototype.constructor = ResponsibilityChainLink;

ResponsibilityChainLink.prototype.getTaskChain = function() {

    return this._taskChain;

};

ResponsibilityChainLink.prototype.setTaskChain = function(taskChainBuilder) {

    if ( !(taskChainBuilder instanceof TaskChainBuilder) ) {

        throw new TypeError("ResponsibilityChainLink setTaskChain, expected parameter taskChainBuilder to be instanceof TaskChainBuilder.");

    } else {

        this._taskChain = taskChainBuilder.finishBuild();

    }

};

ResponsibilityChainLink.prototype.checkIfResponsible = function() {

    throw new Error("ResponsibilityChainLink checkIfResponsible, this method is an abstract method and must be overridden.");

};

ResponsibilityChainLink.prototype.handleResponsibility = function() {

    throw new Error("ResponsibilityChainLink handleResponsibility, this method is a abatract method and must be overridden.");

};

exports.ResponsibilityChainLink = ResponsibilityChainLink;
