var url = require("url");
var http = require("http");
var fs = require("fs");
var log4js = require("log4js");
var testServerDirectory = process.argv[2];

process.chdir(testServerDirectory);

log4js.configure({
    appenders: {
        serverLog: {
            type: "file",
            filename: "server.log"
        },
    },
    categories: {
        default: {
            appenders: ["serverLog"],
            level: "info"
        }
    }
});
var serverLogger = log4js.getLogger("serverLog");

var config = new (function() {

    this.loadConfig = function() {
        var data = fs.readFileSync("config.json");
        Object.assign(this, JSON.parse(data) );
    }
});

config.loadConfig();


http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;

    fs.readFile(pathname.substr(1), function(errorOcurred, data) {
        
        if(errorOcurred) {
            serverLogger.error(errorOcurred);
            response.writeHead(404, config.defaultResponseHeaders);

        } else {

            response.writeHead(200, config.defaultResponseHeaders);

            response.write(data.toString());
        }
        response.end();
    });

}).listen(config.serverPort);

serverLogger.info("Server successfully started on port 8080...");
