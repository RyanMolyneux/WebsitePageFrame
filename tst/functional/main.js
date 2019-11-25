var ElectronWebsitePageFrame = require("../../src/native/website-page-frames/ElectronWebsitePageFrame.js").ElectronWebsitePageFrame;
const { app, session, protocol, BrowserWindow } = require("electron");
let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({ width: 800,
                                    height: 600,
                                    webPreferences: {
                                        nodeIntegration: true
                                    }
                                  });

    appWindow.loadFile(`${__dirname}/index.html`);



    var electronWebsitePageFrame = new ElectronWebsitePageFrame();

    electronWebsitePageFrame.setupProtocolInterceptors();


    appWindow.on("closed", () => {
        appWindow = null;
    });
}
app.on("ready", createWindow);
