var http = require("http");

beforeAll(function() {


    this.getMockNodeJSServer = function(port, responseHeaders) {

        if ( responseHeaders == null ) {

            responseHeaders = {
              "Content-Type": "text/html"
            }

        }

        var serverRequestResponseFunctionScope = {
            "responseHeaders": responseHeaders
        };

        var server =  http.createServer(function(request, response) {

            response.writeHeader(200, responseHeaders);
            response.write("<h1> Hello World !!!</h1>");
            response.end();

        }.bind(serverRequestResponseFunctionScope))

        server.listen(port);

        return server;

    };


});
