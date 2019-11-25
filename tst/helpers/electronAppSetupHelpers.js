var spectron = require("spectron");
var Application = require("spectron").Application;
var electronPath = require("electron");
var path = require("path");

beforeAll(function() {

    this.setupMockSpectronApp = function (directory) {

          return new Application({
             path: electronPath,
             args: [ path.join(directory, "main.js") ],
             env: {
                 ELECTRON_ENABLE_LOGGING: true,
                 ELECTRON_ENABLE_STACK_DUMPING: true,
                 NODE_ENV: "development"
             },
             chromeDriverLogPath: path.join(directory, "chromedriverlog.log"),
             webdriverLogPath: path.join(directory, "webdriverlogs"),
             waitTimeout: 20000,
          });


    };


});
