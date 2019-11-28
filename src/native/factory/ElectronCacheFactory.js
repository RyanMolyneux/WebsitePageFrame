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


var Cache = require("../caches/Cache.js").Cache;
var ipcMain = require("electron").ipcMain;

function ElectronCacheFactory() {

    this._cache = new Cache();

}

ElectronCacheFactory.prototype.create = function() {

    var currentCache = this._cache;

    this._setupIpcClearCache();

    this._cache = new Cache();

    return currentCache;
};

ElectronCacheFactory.prototype._setupIpcClearCache = function() {

    ipcMain.on("clear-cache", function(event, arg) {

        this.clear();
        event.returnValue = true;

    }.bind(this._cache));

};

exports.ElectronCacheFactory = ElectronCacheFactory;
