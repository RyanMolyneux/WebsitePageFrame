var Map = require("../../general/maps/Map.js").Map;

function HeaderMap() {

    Map.call(this);

    this._headers = {};

}

HeaderMap.prototype = Object.create(Map.prototype);
HeaderMap.prototype.constructor = HeaderMap;

HeaderMap.prototype.append = function(header, value) {

    header = this._prepareValidKey(header);

    if ( this.has(header) ) {

        this._headers[header].push(value);

    } else {

        this.set(header, value);

    }

};

HeaderMap.prototype.has = function(header) {

    header = this._prepareValidKey(header);

    return ( this._headers[header] !== undefined && this._headers[header] instanceof Array );

};

HeaderMap.prototype.set = function(header, value) {

    header = this._prepareValidKey(header);

    if (value instanceof Array) {

        this._headers[header] = value;

    } else {


        this._headers[header] = [ value ];


    }
};


HeaderMap.prototype.get = function(header) {

    header = this._prepareValidKey(header);

    return ( this.has(header) && (this._headers[header].length === 1)? this._headers[header][0] : this._headers[header] );

};

HeaderMap.prototype.remove = function(header) {

    header = this._prepareValidKey(header);

    delete this._headers[header];

};

HeaderMap.prototype._prepareValidKey = function(header) {

    if ( typeof(header) !== "string" ) {

        throw new TypeError("HeaderMap _prepareValidKey, header given expected to be typeof string but found " + (typeof(header)) + ".");

    } else {

        return header.toLowerCase();

    }

};

HeaderMap.prototype.toObject = function() {

    return this._headers;

};

HeaderMap.prototype.fromObject = function(headers) {

    if ( !(headers instanceof Object) ) {

        throw new TypeError("HeaderMap fromObject, this method expected parameter headers to contain instance of type Object.");

    } else {

        this._headers = {};

        headersObjectKeys = Object.keys(headers);

        for (var i = 0; i < headersObjectKeys.length; i++) {

            this.append(headersObjectKeys[i], headers[ headersObjectKeys[i] ]);

        }
        
    }

};

exports.HeaderMap = HeaderMap;
