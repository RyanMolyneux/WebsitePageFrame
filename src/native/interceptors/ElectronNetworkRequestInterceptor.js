var NetworkRequestInterceptor = require("./NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var ElectronNetworkRequestHandler = require("../network-request-handlers/ElectronNetworkRequestHandler.js").ElectronNetworkRequestHandler;
var Request = require("../network-messages/Request.js").Request;
var PassThrough = require('stream').PassThrough;

function ElectronNetworkRequestInterceptor(protocol, electronNetworkRequestHandler) {

    NetworkRequestInterceptor.call(this, protocol, electronNetworkRequestHandler);

}

ElectronNetworkRequestInterceptor.prototype = Object.create(NetworkRequestInterceptor.prototype);
ElectronNetworkRequestInterceptor.prototype.constructor = ElectronNetworkRequestInterceptor;

ElectronNetworkRequestInterceptor.prototype.interceptProtocolRequest = function(request, callback) {

    request = new Request(request.url, request.method, request.headers, "");

    this.getNetworkRequestHandler().handleNetworkRequest(request)
                                   .then(function(response) {

                                      var responseBodyStream = new PassThrough();

                                      responseBodyStream.push(response.getBody());
                                      responseBodyStream.push(null);

                                      callback({
                                          headers: response.getHeaders(),
                                          data: responseBodyStream,
                                          statusCode: response.getStatusCode()
                                      });
                                   });

};

ElectronNetworkRequestInterceptor.prototype.complete = function(hasErrorOccured) {
    if (hasErrorOccured) {
        console.error(hasErrorOccured);
    }
};

exports.ElectronNetworkRequestInterceptor = ElectronNetworkRequestInterceptor;
