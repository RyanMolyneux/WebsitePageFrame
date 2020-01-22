var NetworkRequestInterceptor = require("./NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var ElectronNetworkRequestHandler = require("../network-request-handlers/ElectronNetworkRequestHandler.js").ElectronNetworkRequestHandler;
var HeaderMap = require("../maps/HeaderMap.js").HeaderMap;
var Request = require("../network-messages/Request.js").Request;
var PassThrough = require('stream').PassThrough;

function ElectronNetworkRequestInterceptor(protocol, electronNetworkRequestHandler) {

    NetworkRequestInterceptor.call(this, protocol, electronNetworkRequestHandler);

}

ElectronNetworkRequestInterceptor.prototype = Object.create(NetworkRequestInterceptor.prototype);
ElectronNetworkRequestInterceptor.prototype.constructor = ElectronNetworkRequestInterceptor;

ElectronNetworkRequestInterceptor.prototype.interceptProtocolRequest = function(request, callback) {

    var requestHeaderMap = new HeaderMap();

    requestHeaderMap.fromObject(request.headers);

    request = new Request(request.url, request.method, requestHeaderMap, (request.uploadData)? request.uploadData[0].bytes: null );

    this.getNetworkRequestHandler().handleNetworkRequest(request)
                                   .then(function(response) {

                                      response.getHeaderMap().remove("content-encoding");

                                      callback({
                                          headers: response.getHeaderMap().toObject(),
                                          data: response.getBody(),
                                          statusCode: response.getStatusCode()
                                      });
                                   }).catch(this.complete);

};

ElectronNetworkRequestInterceptor.prototype.complete = function(errorHasOccured) {

    if (errorHasOccured) {

        console.error(errorHasOccured);
    }

};

exports.ElectronNetworkRequestInterceptor = ElectronNetworkRequestInterceptor;
