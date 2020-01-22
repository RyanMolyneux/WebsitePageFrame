# Website Page Frame
___
## Walkthrough

This npm library gives your code access to a internet browser of its own and this as you can imagine has a limitless amount of use cases, easiest to think of would be testing of websites another one which is the reason this library was initially developed was to map UI based navigation routes through websites to compact them down for access outside of browsers themselves but apart from those two use cases their may be plenty more just waiting to be discovered.

How exactly does it work though ? well how it essentially works is it removes certain restrictions on these nested browsing contexts related to navigation of the internet and then sets up a connection from parent browsing context to child nested browsing contexts(iframe/webview) for communication, before that connection can be established though first the requests & their responses of interest to these particular nested browsing contexts must be identified, handled and modifications must be made to the response, always keeping in mind why the restrictions between these two contexts and on the child context itself were initially put in place and testing to ensure that the alterations made do not negate the security these restrictions provide, this process will be re-run from page to page as you navigate the current website that you have chosen, also just quick side note the reason for the particular open source license that was applied to this library is again due to ensuring security of the data that these browsing contexts may provide at any given time.

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
