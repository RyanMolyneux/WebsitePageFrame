function Interceptor(protocol, contentTypeIntercepting, pathFragmentIdentifierIntercepting) {
    this._protocol = protocol;
    this._contentTypeIntercepting = contentTypeIntercepting
    this._pathFragmentIdentifierIntercepting = pathFragmentIdentifierIntercepting;
}

Interceptor.prototype.getProtocol = function() {
    return this._protocol;
};

Interceptor.prototype.setProtocol = function(protocol) {
    this._protocol = protocol;
};

Interceptor.prototype.getContentTypeIntercepting = function() {
    return this._contentTypeIntercepting;
};

Interceptor.prototype.setContentTypeIntercepting = function(contentTypeIntercepting) {
    this._contentTypeIntercepting = contentTypeIntercepting;
};

Interceptor.prototype.getPathFragmentIdentifierIntercepting =  function() {
    return this._pathFragmentIdentifierIntercepting;
};

Interceptor.prototype.setPathFragmentIdentifierIntercepting = function(pathFragmentIdentifierIntercepting) {
    this._pathFragmentIdentifierIntercepting = pathFragmentIdentifierIntercepting;
};


exports.Interceptor = Interceptor;
