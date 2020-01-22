var Cache = require("../maps/Cache.js").Cache;
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
