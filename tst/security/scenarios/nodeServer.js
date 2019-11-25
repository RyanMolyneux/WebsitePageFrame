var http = require("http");
var fs = require("fs");
var url = require("url");
var log4js = require("log4js");
var nodeServerDirectory = process.argv[2];

process.chdir(nodeServerDirectory)

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

http.createServer(function (request, response) {

    var serverHTMLFilePath = url.parse(request.url).pathname.substr(1);
    var responseHeaders = { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*"};


    fs.readFile(serverHTMLFilePath, function (errorOccured, htmlPage) {


        if (errorOccured) {

            response.writeHead(404, responseHeaders);
            response.write("<h1> Page Not Found ! </h1>");
            serverLogger.error("404 response for page: " + serverHTMLFilePath);

        } else {

            response.writeHeader(200, responseHeaders);
            response.write(htmlPage.toString());
            serverLogger.info("200 response for page: " + serverHTMLFilePath);

        }

        response.end();

    });

}).listen(8080);

console.log("NODEJS server successfully started on localhost port 8080...");
