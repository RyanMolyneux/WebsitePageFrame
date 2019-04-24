var NetworkRequestInterceptor = require("./NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var PassThrough = require('stream').PassThrough;
var JSDOM = require("jsdom").JSDOM;
var networkRequester = require("electron-fetch").default;


function ElectronNetworkRequestInterceptor(protocol, pathFragmentIdentifierIntercepting, scriptsToBeInjected) {

    NetworkRequestInterceptor.call(this, protocol, "text/html", pathFragmentIdentifierIntercepting, networkRequester);

    this._scriptsToBeInjected = scriptsToBeInjected;

}

ElectronNetworkRequestInterceptor.prototype = Object.create(NetworkRequestInterceptor.prototype);
ElectronNetworkRequestInterceptor.prototype.constructor = ElectronNetworkRequestInterceptor;

ElectronNetworkRequestInterceptor.prototype.getScriptsToBeInjected = function() {
    return this._scriptsToBeInjected;
}

ElectronNetworkRequestInterceptor.prototype.setScriptsToBeInjected = function(scriptsToBeInjected) {
    this._scriptsToBeInjected = scriptsToBeInjected;
}


ElectronNetworkRequestInterceptor.prototype._prepareResponseHeaders = function(responseHeadersUnprepared, headersToBeRemoved = []) {

    var responseHeadersPrepared = {};

    var unpreparedHeaderItrerator = responseHeadersUnprepared.keys();

    for (var currentHeader = "default-123"; currentHeader != null; currentHeader = unpreparedHeaderItrerator.next().value ) {

        if (  headersToBeRemoved.includes(currentHeader) != true && currentHeader != "default-123") {

            responseHeadersPrepared[currentHeader.toLowerCase()] =  responseHeadersUnprepared.get(currentHeader);
        }
    }


    return responseHeadersPrepared;

}

ElectronNetworkRequestInterceptor.prototype._injectScriptsToWebsiteHtmlPage = function(websiteHtmlPage) {

    var websitePageDom = new JSDOM(websiteHtmlPage);

    for (var i = 0; i < this._scriptsToBeInjected.length; i++) {
        websitePageDom.window.document.body.innerHTML = this._scriptsToBeInjected[i].toHtmlElementString() + websitePageDom.window.document.body.innerHTML;
    }

    return websitePageDom.serialize();

}

ElectronNetworkRequestInterceptor.prototype.defaultRequestHandler = function(request, callback) {

    request.then(function(response) {

        var websiteResponseHeaders = this._prepareResponseHeaders(response.headers, [ "x-frame-options", "content-encoding", "transfer-encoding"]);

        callback({
             "statusCode": response.statusCode,
             "headers": websiteResponseHeaders,
             "data": response.body
        });

    }.bind(this));
}

ElectronNetworkRequestInterceptor.prototype.particularRequestHandler = function(request, callback) {

    var websiteResponse;

    request.then(function (response) {

        websiteResponse = response;
        return response.text();

    }).then(function(websiteRequestHtml) {

        var websitePageHtmlStream = new PassThrough();
        var websiteResponseHeaders;

        websiteResponseHeaders = this._prepareResponseHeaders(websiteResponse.headers, [ "x-frame-options", "Access-Control-Allow-Origin", "content-encoding", "transfer-encoding"]);

        if ( websiteResponse.headers.get("content-type").includes(this.getContentTypeIntercepting()) === true) {
            websiteRequestHtml = this._injectScriptsToWebsiteHtmlPage(websiteRequestHtml);
        }

        websitePageHtmlStream.push(websiteRequestHtml);

        websitePageHtmlStream.push(null);

        callback({
            statusCode: websiteResponse.status,
            url: websiteResponse.url,
            headers: websiteResponseHeaders,
            data: websitePageHtmlStream,
        });

    }.bind(this)).catch(function(errorOccured) {
        throw new Error(errorOccured);
    })
}

ElectronNetworkRequestInterceptor.prototype.interceptProtocolRequest = function(request, callback) {

    var requestOptions = {
        headers: request.headers,
        method: request.method,
        referrer: request.referrer,
        body: null,
        redirect: 'follow',
        useElectronNet: true
    };

    var networkRequester = this.getNetworkRequester();
    var websiteRequestPromise = networkRequester(request.url, requestOptions);


    if ( request.url.includes(this.getPathFragmentIdentifierIntercepting()) != true) {
        this.defaultRequestHandler(websiteRequestPromise, callback);
    } else {
        this.particularRequestHandler(websiteRequestPromise, callback);
    }
}

ElectronNetworkRequestInterceptor.prototype.complete = function(hasErrorOccured) {
    if (hasErrorOccured) {
        console.error(hasErrorOccured);
    }
}

exports.ElectronNetworkRequestInterceptor = ElectronNetworkRequestInterceptor;
