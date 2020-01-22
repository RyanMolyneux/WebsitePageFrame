const ipcRenderer = require("electron").ipcRenderer;


window.ipcRendererClearCache = function() {

    ipcRenderer.sendSync("clear-cache");

};
