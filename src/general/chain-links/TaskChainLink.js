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


var ChainLink = require("./ChainLink.js").ChainLink;

function TaskChainLink() {

    ChainLink.call(this);

}

TaskChainLink.prototype = Object.create(TaskChainLink.prototype);
TaskChainLink.prototype.constructor = TaskChainLink;

TaskChainLink.prototype.preformTask = function() {

    throw new Error( "TaskChainLink preformTask, this is an abstract method and as such cannot be called, it "
                   + "should be supplied implemntation through TaskChainLinks subclasses.");

};

exports.TaskChainLink = TaskChainLink;
