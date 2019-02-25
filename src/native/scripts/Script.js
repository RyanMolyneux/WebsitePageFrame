function Script(scriptCode) {
    this._scriptCode = scriptCode;
}

Script.prototype.getScriptCode = function() {
    return this._scriptCode;
}

Script.prototype.toHtmlElementString = function() {
    return "<script>(" + this._scriptCode + ")()</script>";
}

exports.Script = Script;
