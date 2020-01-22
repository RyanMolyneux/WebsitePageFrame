function Map() {}

Map.prototype.get = function(key) {

    throw new Error("Map get, this is a abstract method being called which must be ovverridden before use.");

};

Map.prototype.set = function(key, value) {

    throw new Error("Map set, this is a abstract method being called which must be ovverridden before use.");

};

Map.prototype.remove = function(key) {

    throw new Error("Map remove, this is a abstract method being called which must be ovverridden before use.");

};

Map.prototype.has = function(key) {

    throw new Error("Map has, this is a abstract method being called which must be ovverridden before use.");

};

Map.prototype._prepareValidKey = function(key) {

    throw new Error("Map _prepareValidKey, this is a abstract method being called which must be ovverridden before use.")

};

exports.Map = Map;
