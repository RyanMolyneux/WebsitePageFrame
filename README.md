# WebsitePageFrame

## Walkthrough

This library provides nested browsing context(iframe/webview) intermediary which intercepts navigation & resource requests in order to inject scripts for parent-child communication & removing specific restrictions not allowing browsing-contexts to function especially in the case of iframe.

Note: additional information on all classes of this library will be documented upon official release of version 2.0, but for now test out the library using the steps below and if you find yourself intrested take a look at the code, but keep in mind its currently in the state of prototype only here to give people a first look.


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

6). Use client-build npm command to generate webpack bundle for client side/renderer classes.

7.) Lastly Activate Node Integration.

note: a lot of changes are in the process of being made to library on the native
side mostly before official release so expect their to be some changes and remember
this is currently a prototype and as such it's current state is not too reliable and
these setup steps are not representative of the released version.

# MOST OF THE BELOW DOCUMENTATION IS OUT OF DATE SO DO NOT BOTHER READING AS OF LATEST COMMIT

## Table Of Contents
1. [Supported Frameworks](##Supported%20Frameworks).
2. [Getting Started](##Getting%20Started).

## Supported Frameworks
1. [Electron](https://electronjs.org/).

Yeah the list although quiete short at the moment could be extended out into others with some work if needs be either officially or by others that choose to build on top of the work that has been done here, the reason as to why more where not added to the list is that this release really focused around ensuring that this library was efficient, extensible and secure.

## Getting Started
This section makes the assumption that you already have a [electron application](https://electronjs.org/docs/tutorial/first-app) setup and ready to start adding this library to its package dependency list.
### Installation
First thing you wanna do add the library to your packages depdency list doing it like so.
```bash
npm install website-page-frame
```
once you have done this you may move onto the next step.
### Copy This Code To Electron Preload Script
The below code although simple the function name must be typed exactly as is shown, as it is used by libraries client side class WebsitePageFrameConnection currently as communication method between electrons renderer proccess and main to invoke a function which will clear the cache of all its current information.
```javascript
var ipcRenderer = require("electron").ipcRenderer;


window.ipcRendererClearCache = function() {

    ipcRenderer.sendSync("clear-cache");

};

<<<<<<< HEAD
```
Why was a cache needed atall ? well if you read the [Walkthrough](##Walkthrough) thoroughly you would have noticed It states that the process of identification & modification of the response is re-run from page to page as you navigate the **current website** and what is meant by that is that when you initially open a website in the nested browsing context from the url the **origin** of interest is extracted and stored in the cache to ensure that every subsequent request made by this nested browsing context can be verified ensuring that it only has access to what it is supposed to have access to, for instance lets say we opened in our nested browsing context "https://malicioussite.com#websitePageFrame" and it in turn attempted to open its own child nested browsing context to lets say facebook or twitter in order to take advantage of the restrictions this library removes well without the **Current Nested Browsing Context Origin** how could we infact tell that these restrictions should not be removed and thats just it as of planning this release their was no safe way found of allowing navigation in the nested browsing context without this, thats not to say that their isn't another way just that another was not found.

### Add Following to your Electron main.js File
```javascript
    var ElectronWebsitePageFrame = require("website-page-frame").ElectronWebsitePageFrame;

    ...

    var electronWebsitePageFrame = new ElectronWebsitePageFrame();

    electronWebsitePageFrame.setupProtocolInterceptors();
```
The above code is the default setup on the main proccess that needs to be done, keep in mind the interceptors that ElectronWebsitePageFrame class gives its instances by default here is just for **HTTPS**, **HTTP** has not been added to the defaults mainly as a detterent away from use of this protocol as it does not encrypt the data sent between server and client but if you really want it you can add it by instead adding the below code to your **Electron main.js** file.
```javascript
var ElectronWebsitePageFrame = require("website-page-frame").ElectronWebsitePageFrame;
var ElectronCacheFactory = require("website-page-frame").ElectronCacheFactory;
var WebsitePageFrameNavigationResponsePreparation = require("website-page-frame").WebsitePageFrameNavigationResponsePreparation;
var WebsitePageFrameResourceResponsePreparation = require("website-page-frame").WebsitePageFrameResourceResponsePreparation;
var ElectronNetworkRequestHandler = require("website-page-frame").ElectronNetworkRequestHandler;
var ElectronNetworkRequestInterceptor = require("website-page-frame").ElectronNetworkRequestInterceptor;
var ResponsibilityChainBuilder = require("website-page-frame").ResponsibilityChainBuilder;
var Protocol = require("website-page-frame").Protocol;

...

var cache = (new ElectronCacheFactory()).create();
var responsePreparationChainBuilder = new ResponsibilityChainBuilder();

responsePreparationChainBuilder.attachChainLink( new WebsitePageFrameNavigationResponsePreparation() );
responsePreparationChainBuilder.attachChainLink( new WebsitePageFrameResourceResponsePreparation() );

var electronNetworkRequestHandler = new ElectronNetworkRequestHandler( session.defaultSession,
                                                                       cache,
                                                                       responsePreparationChainBuilder );


var electronHttpRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("http"),
                                                                            electronNetworkRequestHandler );

var electronHttpsRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("https"),
                                                                             electronNetworkRequestHandler );

interceptors = [ electronHttpRequestInterceptor, electronHttpsRequestInterceptor ];


var electronWebsitePageFrame = new ElectronWebsitePageFrame(interceptors);

electronWebsitePageFrame.setupProtocolInterceptors();
```

Wowwwwwww why so much more ? the reason as to why this is not as plane and simple to setup as the prior in that it requires alot more classes to be imported and setup is because this is abstracted away from you for the default use if you simply want to use the library as is but when you feel you want to make modifications or add things on such as scripts to be injected into for instance the child nested browsing context page you will need access to all this and more.

After you have decided and went with one of the following setups your code in **Electron main.js** file should look something like what is below, although here I use the default setup.
```javascript
var ElectronWebsitePageFrame = require("website-page-frame").ElectronWebsitePageFrame;

const { app, BrowserWindow } = require("electron");
let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({ width: 800,
                                    height: 600,
                                    webPreferences: {
                                        preload: "yourPreloadScriptWithIpcRendererCacheClearCall.js"
                                    }
                                  });

    appWindow.loadFile(`${__dirname}/index.html`);

    var electronWebsitePageFrame = new ElectronWebsitePageFrame();

    electronWebsitePageFrame.setupProtocolInterceptors();


    appWindow.on("closed", () => {
        appWindow = null;
    });
}

app.on("ready", createWindow);
```
### Import Client Side to index.html libraries
```html
<!DOCTYPE html>
<html>
    <head>
        <title> My App Index Page </title>
    </head>
    <body>
        <h1> My First App </h1>
    </body>
    <script src="./node_modules/website-page-frame/dist/client-bundle.js"/>
</html>
```
In order to make use full use of the library the client side libraries must be imported through the **script html element** adding this will give you access to classes for setting up and communicating with your child nested browsing context.

### Test It Out
=======
#### Classes & Structure
- Message
- Action
>>>>>>> b367e49db26df609e0c4a78f83044bc29edf47c1
