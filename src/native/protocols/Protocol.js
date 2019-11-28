/*
 *    This library provides a way to allow browser based programs to have cross parent to child window communication through code.
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


function Protocol(scheme) {
    this._scheme = scheme;
}

Protocol.prototype.getScheme = function() {
    return this._scheme;
}

Protocol.prototype.setScheme = function(scheme) {

    if ( typeof(scheme) !== "string") {

        throw new TypeError( "Protocol setScheme, expected scheme to be typeof string but found"
                           + (typeof(scheme)) + ".");

    } else {

        this._scheme = scheme;

    }

}

exports.Protocol = Protocol;
