# WebsitePageFrame

## Walkthrough

This library provides a currently nested browsing context(iframe/webview) intermediary which intercepts navigation & resource requests in order to inject scripts for parent-child communication & removing specific restrictions not allowing browsing-contexts to function especially in the case of iframe, apart from the communication aspect though their this library allows you to customize to the interceptors to your liking for example you may additional Task's to the ResponsibilityChainLinks of the NetworkRequestHandler that are already existent or event create your own ResponsibilityChainLinks.

Note: additional information on what these are and how to use them will be provided upon official release of version 2.0, but for now test out the library using the steps below and if you find yourself intrested take a look at the code, but keep in mind its currently in the state of prototype only here to give people a first look.


In page browsing context intermediary that is used to intercept incoming page requests &amp; inject personal scripts into them & allow for cross parent-child browsing context communication.

## Wanna Test The Library Prototype Out

### Steps

1.) Download The repository.
  
2.) Add the npm package as local dependency in your electron (electron is currently the only supported framework) App or Library.


3.) In your electron main.js file add the below lines of code
```

    var ElectronWebsitePageFrame = require("website-page-frame").ElectronWebsitePageFrame;

    ...

    var electronWebsitePageFrame = new ElectronWebsitePageFrame();

    electronWebsitePageFrame.setupProtocolInterceptors();

```
the above steps up the http/https request interceptors on your electron defaultSession
the to intercept iframe/webview navigation and resource requests ensuring that the 
cross origin pages can be displayed aswell communication parent-child capabilities are in place.
```
var ElectronWebsitePageFrame = require("website-page-frame").ElectronWebsitePageFrame;

const { app, BrowserWindow } = require("electron");
let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({ width: 800,
                                    height: 600,
                                    webPreferences: {
                                        nodeIntegration: true
                                    }
                                  });

    appWindow.loadFile(`${__dirname}/index.html`);



    var electronWebsitePageFrame = new ElectronWebsitePageFrame([]);

    electronWebsitePageFrame.setupProtocolInterceptors();


    appWindow.on("closed", () => {
        appWindow = null;
    });
}

app.on("ready", createWindow);

```
4.) Add one of the following nested browsing contexts to your electron App or Library.

   ```
   <iframe src=""></iframe>
   ```
   
   or 
   
   ```
   <webview src=""></webview>
   ```
   
   if you are depending on whichever you use check the following reading material before
   moving on, as this library provides benefits but you still must understand how to securely 
   setup these page elements.
   
   4.1) iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe, 
        webview: https://electronjs.org/docs/api/webview-tag


5.) As for this step I suggest you take a look into tst/functional folder to understand
    how the setup and use of renderer/client-side libraries should go as it will help you
    better understand the capabilities and limitations of this library.

6.) Lastly Activate Node Integration.

note: a lot of changes are in the process of being made to library on the native
side mostly before official release so expect their to be some changes and remember
this is currently a prototype and as such it's current state is not too reliable and
these setup steps are not representative of the released version.

# MOST OF THE BELOW DOCUMENTATION IS OUT OF DATE SO DO NOT BOTHER READING AS OF LATEST COMMIT

## Main Libraries
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
