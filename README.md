# ReelWebsitePageFrame

## TODO
- review bug causing some sites not to load all their resources.
- package for distribution using webpack.

## Overview
In page Iframe/webview intermediary that is used to intercept incoming page requests &amp; inject personal scripts into them & allow for cross parent - child iframe interaction no matter what the site.

## Main Libaries
- client
- native
- general

### Client
this library is full of scripts that are to be run in the browser itself, currently the only existing piece of functionality needed here at the moment is the "WebsitePageFrameClient" class which is used to prepare the iframe, allow for parent(page)-child(iframe) communication & much more, it is essentially a neat wrapper for any communication or needed interaction that your program may have with the iframe html element.


#### Classes & Structure
- WebsitePageFrameClient

### Native
this library contains code that will run natively on the device with the use of node.js, purpose of this library is to provide the code that allows for intercepting of specific iframe http/https requests in order to inject scripts of the programs choice using the Script class as parent class to inherit from is the best option but another is simply to create Script class object & initialize that objects "scriptCode" private variable with the code that you want injected into each and every iframe your program on the browser/application side opens.

Interceptors are what is used to intercept the specific requests of the iframe making sure that it is not just any iframes request that the scripts are injected into but only those that have the specific "particularContentFragmentIdentifier" which when your using "ElectronWebsitePageFrame" will be "#websitePageFrame" which is currently the only framework that this library officially supports for use of the WebsitePageFrame native injection code, you may change this "particularContentFragmentIdentifier" but you must make sure the iframe src which you want this to intercept requests for reflects this change, for example if I set "particularContentFragmentIdentifier" equal to "#MyIframe" when I set the src for my iframe it must end with e.g "https://www.somewebsite.com#MyIframe".

#### Classes & Structure
- WebsitePageFrame
    - ElectronWebsitePageFrame
- Protocol
- Interceptor
    - NetworkRequestInterceptor
    - ElectronNetworkRequestInterceptor
- Script
    - IframeMessageHandlerScript

### General
this library contains code that can run either client or native side based on the requirement, currently what it contains are the classes which make up the cross page communication support code "Message" contains an "Action" object which when sent to the child(iframe) will be re-constructed from the action object & executed performing various actions that would not normally be allowed by the browser which the native device website page script injection.

#### Classes & Structure
- Message
- Action

