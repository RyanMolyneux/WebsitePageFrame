/*
 *    This library provides an alternative in app browser to webview by removing specific restrictions placed upon iframe and more.
 *    Copyright (C) 2019  Ryan Molyneux
 *
 *    This program is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
