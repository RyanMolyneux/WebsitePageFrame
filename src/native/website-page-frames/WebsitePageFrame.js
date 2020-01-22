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
 
var Interceptor = require("../interceptors/Interceptor.js").Interceptor;

function WebsitePageFrame(interceptors) {

    this._interceptors = null;


    this.setInterceptors(interceptors);

}

WebsitePageFrame.prototype.getInterceptors = function() {

    return this._interceptors;

}

WebsitePageFrame.prototype.setInterceptors = function(interceptors) {

    if ( !(interceptors instanceof Array) ) {

        throw new TypeError( "WebsitePageFrame setInterceptors, parameter interceptors expected to be instanceof Array.");

    } else if ( !( this._checkIfEmptyOrContainsOnlyInterceptors(interceptors) ) ) {

        throw new TypeError( "WebsitePageFrame setInterceptors, parameter interceptors Array expected to contain only "
                           + "instances of Interceptor or inheriting classes of Interceptor.");

    } else {

        this._interceptors = interceptors;

    }

}

WebsitePageFrame.prototype._checkIfEmptyOrContainsOnlyInterceptors = function(arrayToBeChecked) {

    var isEmptyOrContainsOnlyInterceptors = true;

    for (var i = 0; i < arrayToBeChecked.length; i++) {

        if ( !(arrayToBeChecked[i] instanceof Interceptor) ) {

            isEmptyOrContainsOnlyInterceptors = false;

            return isEmptyOrContainsOnlyInterceptors;

        }

    }

    return isEmptyOrContainsOnlyInterceptors;

};

WebsitePageFrame.prototype.setupProtocolInterceptors = function() {

    throw new Error("WebsitePageFrame setupProtocolInterceptors, this method is an abastract method which must be overridden.");

};

exports.WebsitePageFrame = WebsitePageFrame;
