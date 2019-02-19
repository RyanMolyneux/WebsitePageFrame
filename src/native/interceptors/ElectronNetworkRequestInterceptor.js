var NetworkRequestInterceptor = require("./NetworkRequestInterceptor.js").NetworkRequestInterceptor;
var networkRequester = require("electron-fetch").default;


function ElectronNetworkRequestInterceptor(protocol, scriptsToBeInjected) {

    NetworkRequestInterceptor.call(this, protocol, networkRequester);

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

ElectronNetworkRequestInterceptor.prototype.interceptProtocolRequest = function(request, callback) {

    var requestOptions = {
        headers: request.headers,
        method: request.method,
        referrer: request.referrer
    };
    var networkRequester = this.getNetworkRequester();

    if (false) {

    } else {

        networkRequester(request.url, requestOptions).then((response) => {

            var headersToBeRemoved = [ "x-frame-options", "content-encoding", "x-requested-with" ];
            var websitePageHtmlStream = response.body;
            var websitePageResponseHeaders = response.headers;

            websitePageHtml.push(websitePageHtml);

            for (var i = 0; i < this._scriptsToBeInjected.length; i++) {
                websitePageHtmlStream.push( this._scriptsToBeInjected[i].toHtmlScriptString() );
            }

            websitePageHtmlStream.push(null);

            for (var i = 0; i < headersToBeRemoved.length; i++) {
                if ( websitePageResponseHeaders.has(headersToBeRemoved[i]) ) {
                    websitePageResponseHeaders.delete(headersToBeRemoved);
                }
            }

            callback({
                statusCode: response.statusCode,
                headers: websitePageResponseHeaders,
                data: websitePageHtmlStream
            });

      }).catch(function(errorOccured) {
          throw new Error("Error has occured")
      });
    }


}

ElectronNetworkRequestInterceptor.prototype.complete = function(hasErrorOccured) {
    if (hasErrorOccured) {
        console.error(hasErrorOccured);
    }
}

exports.ElectronNetworkRequestInterceptor = ElectronNetworkRequestInterceptor;
