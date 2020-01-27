

# Website Page Frame

## Walkthrough

This [npm](https://www.npmjs.com/) library gives your code access to a internet browser(in app browser) of its own, an alternative to [WebView](https://developer.chrome.com/apps/tags/webview) and this as you can imagine has a limitless amount of use cases, easiest to think of would be testing of websites another one which is the reason this library was initially developed was to map UI based navigation routes through websites to compact them down for access outside of browsers themselves but apart from those two use cases their may be plenty more just waiting to be discovered.

How exactly does it work though ? well how it works is it alters certain restrictions on these nested browsing contexts ([iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in particular.) related to navigation of the internet and then sets up a connection from parent browsing context to child nested browsing contexts (iframe/webview) for communication, before the connection can be established though first the requests & their responses of interest to these nested browsing contexts must be identified, handled and modifications must be made to the response, always keeping in mind why the restrictions between these two contexts and on the child context itself were initially put in place and testing to ensure that the alterations made do not negate the security these restrictions provide, this process will be re-run from page to page as you navigate the current website that you have chosen, also just quick side note the reason for the particular open source license that was applied to this library is again due to ensuring security of the data that these browsing contexts may provide at any given time.

Lastly although this library is compatible with the use of webview element as your nested browsing context it was not designed to be when written, it was designed for use with iframes and as such a lot of the headers that restrict iframes from navigating and displaying internet content freely will not affect webviews and with that being said if you do choose to use webviews instead with this library don't be alarmed if you discover you can navigate across different origins this is simply just something webviews can do unlike iframes and keep in mind when you use iframes you will be restricted from directly navigating across different origins from the nested browsing context for security reasons.

## Table Of Contents

1. [Supported Frameworks](#Supported_Frameworks)
2. [Getting Started](#Getting_Started)
    - [Installation](#Getting_Started_Step1)
    - [Setting up required Electron Preload Script code](#Getting_Started_Step2)
    - [Adding required backend library code to  your Electron main.js file](#Getting_Started_Step3)
    - [Import client side library classes to your Electron index.html file](#Getting_Started_Step4)
    - [Test it out](#Getting_Started_Final_Step)
        - [Opening a website in your in app browser](#Getting_Started_Final_Step_Subsection1)
        - [How to navigate our in app browser between websites](#Getting_Started_Final_Step_Subsection2)
        - [Interacting through code with in app browser browsers page](#Getting_Started_Final_Step_Subsection3)
3. [Advanced Options](#Advanced_Options)
    - [Add custom task to modify in app browser navigation or resource response](#Advanced_Options_Subsection1)
    - [Add custom ResponsePreparationChainLink](#Advanced_Options_Subsection2)
    - [Other changes that could be made](#Advanced_Options_Subsection3)
4. [Library Classes](#Library_Classes)
    - [Client](#Library_Classes_Client)
        - [WebsitePageFrameMessageBuilder](#WebsitePageFrameMessageBuilder)
        - [WebsitePageFrameClient](#WebsitePageFrameClient)
        - [WebsitePageFramePingClient](#WebsitePageFramePingClient)
        - [WebsitePageFrameConnection](#WebsitePageFrameConnection)
        - [BrowserThread](#BrowserThread)
    - [General](#Library_Classes_General)
        - [Action](#Action)
        - [Builder](#Builder)
        - [ChainBuilder](#ChainBuilder)
        - [TaskChainBuilder](#TaskChainBuilder)
        - [ResponsibilityChainBuilder](#ResponsibilityChainBuilder)
        - [MessageBuilder](#MessageBuilder)
        - [ChainLink](#ChainLink)
        - [TaskChainLink](#TaskChainLink)
        - [ResponsibilityChainLink](#ResponsibilityChainLink)
        - [Client](#Client)
        - [Connection](#Connection)
        - [Map](#Map)
        - [Message](#Message)
        - [Thread](#Thread)
    - [Native](#Library_Classes_Native)
        - [AddFileSchemaToFrameAnscestorsChainLink](#AddFileSchemaToFrameAnscestorsChainLink)
        - [BodyScriptInjectionChainLink](#BodyScriptInjectionChainLink)
        - [RemoveXFrameOptionsChainLink](#RemoveXFrameOptionsChainLink)
        - [ResponseModificationChainLink](#ResponseModificationChainLink)
        - [ResponsePreparationChainLink](#ResponsePreparationChainLink)
        - [WebsitePageFrameNavigationResponsePreparation](#WebsitePageFrameNavigationResponsePreparation)
    - [WebsitePageFrameResourceResponsePreparation](#WebsitePageFrameResourceResponsePreparation)
        - [ElectronCacheFactory](#ElectronCacheFactory)
        - [Interceptor](#Interceptor)
        - [NetworkRequestInterceptor](#NetworkRequestInterceptor)
        - [ElectronNetworkRequestInterceptor](#ElectronNetworkRequestInterceptor)
        - [Cache](#Cache)
        - [HeaderMap](#HeaderMap)
        - [NetworkMessage](#NetworkMessage)
        - [Request](#Request)
        - [Response](#Response)
        - [NetworkRequestHandler](#NetworkRequestHandler)
        - [ElectronNetworkRequestHandler](#ElectronNetworkRequestHandler)
        - [Protocol](#Protocol)
        - [Script](#Script)
        - [WebsitePageFrameCrossOriginMessagingScript](#WebsitePageFrameCrossOriginMessagingScript)
        - [WebsitePageFrame](#WebsitePageFrame)
        - [ElectronWebsitePageFrame](#ElectronWebsitePageFrame)
5. [Open Source License](#Open_Source_License)


#### Supported Frameworks

 1. [Electron Version 6](https://github.com/electron/electron/tree/v6.1.7/docs).
 2. [Electron Version 7](https://github.com/electron/electron/blob/v7.1.10/docs/tutorial/about.md), will be looking into support for this revision, issue is "provisional headers" are only provided to interceptor among other issues that are keeping this library from support for this revision of electron.

The list although quiet short at the moment could be extended out into others with some work if needs be either officially or by others that choose to build on top of the work that has been done here, the reason as to why more where not added to the list is that this release really focused around ensuring that this library was efficient, extensible and secure.

## Getting Started

This section makes the assumption that you already have a [Electron application](https://electronjs.org/docs/tutorial/first-app) setup and are ready to start adding this library to its package dependency list.

### Installation

First thing you want to do is add the library to your packages dependency list doing it like so.
```
npm install website-page-frame
```
once you have done this you may move onto the next step.

### Setting up required Electron Preload Script code

The below code although simple the function name must be typed exactly as is shown, as it is used by the libraries client side class [WebsitePageFrameConnection](#WebsitePageFrameConnection) currently as communication method between electrons renderer process and main to invoke a function which will clear the cache of all its current information.
```javascript
// yourPreloadScriptWithIpcRendererCacheClearCall.js
var ipcRenderer = require("electron").ipcRenderer;


window.ipcRendererClearCache = function() {

    ipcRenderer.sendSync("clear-cache");

};
```
If you are interested as to why a cache was needed read the below answer to this question but if not simply move to the next step in the setup process.

So why is a cache needed ? well if you read the [Walk through](#Walk_through) thoroughly you would have noticed it states that the process of identification & modification of the response is re-run from page to page as you navigate the **current website** and what is meant by that is that when you initially open a website in the nested browsing context from the URL the **origin** of interest is extracted and stored in the cache to ensure that every subsequent request made by this nested browsing context can be verified ensuring that it only has access to what it is supposed to have access to, for instance lets say we opened in our nested browsing context "https://malicioussite.com#websitePageFrame" and it in turn attempted to open its own child nested browsing context to lets say Facebook or Twitter in order to take advantage of the restrictions this library removes well without the **Current Nested Browsing Context Origin** how could we in fact tell that these restrictions should not be removed and that's just it as of planning this release their was no safe way found of allowing navigation in the nested browsing context without this, that's not to say that their isn't another way just that another was not found.

### Adding required backend library code to your Electron main.js(or equivalent) file

**NOTE:** Before you get started with this step read on past **Option 1** (Options are given here as their may be support for **HTTP** for this revision in the future.) first to **Basic Resulting main.js file** to get an idea of where the code should be placed in your **Electron main.js** file.

#### Option 1 (HTTPS).

```javascript
// main.js(or equivalent) file.
    var ElectronWebsitePageFrame = require("website-page-frame").ElectronWebsitePageFrame;

    ...

    var electronWebsitePageFrame = new ElectronWebsitePageFrame();

    electronWebsitePageFrame.setupProtocolInterceptors();
```

### Basic Resulting main.js file

After you have decided and went with one of the following setups your code in **Electron main.js** file should look something like what is below, although here **Option 1** is used.

```javascript
// main.js(or equivalent) file.
var ElectronWebsitePageFrame = require("website-page-frame").ElectronWebsitePageFrame;

const { app, BrowserWindow } = require("electron");
let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({ width: 800,
                                    height: 600,
                                    webPreferences: {
                                        // LINUX OR MAC
                                        preload: `${__dirname}/yourPreloadScriptWithIpcRendererCacheClearCall.js`
                                        // WINDOWS
                                        preload: `${__dirname}\\yourPreloadScriptWithIpcRendererCacheClearCall.js`
                                    }
                                  });

    // LINUX OR MAC
    appWindow.loadFile(`${__dirname}/index.html`);

    // WINDOWS
    appWindow.loadFile(`${__dirname}\\index.html`);

    var electronWebsitePageFrame = new ElectronWebsitePageFrame();

    electronWebsitePageFrame.setupProtocolInterceptors();


    appWindow.on("closed", () => {
        appWindow = null;
    });
}

app.on("ready", createWindow);
```

Once you have something resembling this code in your main.js file move onto the next step.

### Import client side library to your Electron index.html(or equivalent) HTML file

This step is here to show you how the client side libraries classes should be imported into your apps renderer process in order to make use of them in the Electron GUI.

```
<!-- index.html(or equivalent) HTML file -->
<!DOCTYPE html>
<html>
    <head>
        <title> My App Index Page </title>
    </head>
    <body>
        <h1> My First App </h1>
        <iframe src="" id="yourNestedBrowsingContext" width="1000px" height="1000px" sanbox="allow-forms allows-scripts allows-same-origin"></iframe>

    <!-- LINUX OR MAC -->
    <script src="./node_modules/website-page-frame/dist/client-bundle.js"></script>
    <!-- WINDOWS -->
    <script src=".\node_modules\website-page-frame\dist\client-bundle.js"></script>

    </body>

</html>
```

**NOTE:** here I have applied sanbox restrictions on my iframe and it might seem dangerous that I have applied **allow-same-origin** and **allow-scripts** at the same time, but just know it is only dangerous if the parent pages **origin** where the same as the nested pages **origin** which in our case it wont because we load our content locally our parent page **origin** should be **file://** which will not match our nested browsing contexts as it will either always be **https://www.whatever-website.com**, for more information on how to use setup your iframe securely  or just more information about iframes in general visit https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-iframe-element.


Once you have added this you are pretty much done with the setup and can move onto the last step to test out the in app internet browsing capabilities of this library for yourself.

### Test it out

So this step will show you some of the basics to making use of this library, you should work your way down through each sub step.

#### Opening a website in your Nested Browsing Context

```
<!-- index.html(or equivalent) HTML file -->
<!DOCTYPE html>
<html>
    <head>
        <title> My App Index Page </title>
    </head>
    <body>
        <h1> My First App </h1>
        <iframe src="" id="yourNestedBrowsingContext" width="1000px" height="1000px" sanbox="allow-forms allows-scripts allows-same-origin"></iframe>

    <!-- LINUX OR MAC -->
    <script src="./node_modules/website-page-frame/dist/client-bundle.js"></script>
    <!-- WINDOWS -->
    <script src=".\node_modules\website-page-frame\dist\client-bundle.js"></script>
    <script>

    var childNestedBrowsingContext = document.getElementById("yourNestedBrowsingContext").contentWindow;

    var childNestedBrowsingContextInitialURL = "https://www.youtube.com";
    var maxConnectionEstablishmentRetries = 10;
    var websitePageFrameConnection = new websitePageFrame.WebsitePageFrameConnection(childNestedBrowsingContextInitialURL,
                                                                                     childNestedBrowsingContext,
                                                                                     maxConnectionEstablishmentRetries);
    var clientsParentToChildMessageResponseTimeoutMilliseconds = 10000;
    var websitePageFrameClient = new websitePageFrame.WebsitePageFrameClient(websitePageFrameConnection,
                                                                             clientsParentToChildMessageResponseTimeoutMilliseconds);

    websitePageFrameConnection.openNewConnection();


    </script>


    </body>

</html>
```

What has been added here is a script element below our library importing script element that we added earlier that demonstrates how to setup your in app browser making use of some of the features from client side classes [WebsitePageFrameClient](#WebsitePageFrameClient) and [WebsitePageFrameConnection](#WebsitePageFrameConnection), note the **childNestedBrowsingContextInitialURL** can be changed to whatever you wish, in this instance what will be displayed when the app runs and opens this website in the nested browsing context can be seen below.

![Image displaying a Electron app with WebsitePageFrame in app browser setup](https://lh3.googleusercontent.com/GXeaBSdytwP4yH0KMYj_sXicGZwcq9-LdQtPSVQz-Uz6LI5BF7QD-W5mpeEEuVSP5jIwgZV43fUmOg=w1920-h383)

Navigation between different pages on the same website the in app browser can do without any problems, keeping communication between parent and child open as well as page display restrictions removed but keep in mind that navigation away from the current website to another invoked by child nested browsing context will more than likely fail as it has not been design as of yet for smooth navigation from within the nested browsing context between websites.

Well how do we navigate our child nested browsing context to different websites then ? well how that is done is demonstrated in the next sub step of testing out this library so go on give it a read and try it out.

#### How to navigate our in app browser between websites

```
<!-- index.html(or equivalent) HTML file -->
<!DOCTYPE html>
<html>
    <head>
        <title> My App Index Page </title>
    </head>
    <body>
        <h1> My First App </h1>
        <iframe src="" id="yourNestedBrowsingContext" width="1000px" height="1000px" sanbox="allow-forms allows-scripts allows-same-origin"></iframe>

    <!-- LINUX OR MAC -->
    <script src="./node_modules/website-page-frame/dist/client-bundle.js"></script>
    <!-- WINDOWS -->
    <script src=".\node_modules\website-page-frame\dist\client-bundle.js"></script>

    <script>

            var childNestedBrowsingContext = document.getElementById("yourNestedBrowsingContext").contentWindow;
            var firstChildNestedBrowsingContextInitialURL = "https://www.google.com";
            var maxConnectionEstablishmentRetries = 10;
            var websitePageFrameConnection = new websitePageFrame.WebsitePageFrameConnection( firstChildNestedBrowsingContextInitialURL,
                                                                                              childNestedBrowsingContext,
                                                                                              maxConnectionEstablishmentRetries);
            var clientsParentToChildMessageResponseTimeoutMilliseconds = 10000;
            var websitePageFrameClient = new websitePageFrame.WebsitePageFrameClient( websitePageFrameConnection,
                                                                                      clientsParentToChildMessageResponseTimeoutMilliseconds);

            websitePageFrameConnection.openNewConnection();

            setTimeout(function() {

                var secondWebsitesUrlIWishToNavigateChildBrowsingContextTo = "https://www.twitter.com";

                websitePageFrameConnection.updateChildBrowsingContextCurrentLocationInformation( secondWebsitesUrlIWishToNavigateChildBrowsingContextTo );

                websitePageFrameConnection.openNewConnection();


            }, 4000);
     </script>  

    </body>
</html>
```
The three new lines of code we added are all that is needed in order to navigate your in app browser from one website to the next safely without, all we simple do here is take advantage of more features that the class [WebsitePageFrameConnection](#WebsitePageFrameConnection) has to offer.

#### Interacting through code with in app browsers page

The previous steps have had a look into how to get things setup aswell and opening your first website in your in app browser now this sub step adds additional code which demonstrates how you can interact as the title suggests with the in app browsers page in the code you write.

```
<!-- index.html(or equivalent) HTML file -->
<!DOCTYPE html>
<html>
    <head>
        <title> My App Index Page </title>
    </head>
    <body>
        <h1> My First App </h1>
        <iframe src="" id="yourNestedBrowsingContext" width="1000px" height="1000px" sanbox="allow-forms allows-scripts allows-same-origin"></iframe>

        <!-- LINUX OR MAC -->
        <script src="./node_modules/website-page-frame/dist/client-bundle.js"></script>

        <!-- WINDOWS -->
        <script src=".\node_modules\website-page-frame\dist\client-bundle.js"></script>

        <script>

        var childNestedBrowsingContext = document.getElementById("yourNestedBrowsingContext").contentWindow;
        var firstChildNestedBrowsingContextInitialURL = "https://www.google.com";
        var maxConnectionEstablishmentRetries = 10;
        var websitePageFrameConnection = new websitePageFrame.WebsitePageFrameConnection( firstChildNestedBrowsingContextInitialURL,
                                                                                              childNestedBrowsingContext,
                                                                                              maxConnectionEstablishmentRetries);
        var clientsParentToChildMessageResponseTimeoutMilliseconds = 10000;
        var websitePageFrameClient = new websitePageFrame.WebsitePageFrameClient( websitePageFrameConnection,
                                                                                      clientsParentToChildMessageResponseTimeoutMilliseconds);

        var messageBuilder = new websitePageFrame.WebsitePageFrameMessageBuilder();
        var actionParameter = "actionBeingCarriedOut";
        var actionArguement = "getPageTitle";
        var getPageTitle = new websitePageFrame.Action([actionParameter], [actionArguement], function() {

            console.log("The name of the function that has been invoked is: " + actionBeingCarriedOut);
            postMessageDataReturned.childNestedBrowsingContextsPageTitle = document.getElementsByTagName("title")[0].innerText;

        });

        messageBuilder.attachAction(getPageTitle);

        websitePageFrameConnection.openNewConnection();

        setTimeout(function() {

            websitePageFrameClient.sendMessage( messageBuilder.finishBuild() );

        }, 2000);

        window.waitForResponseBrowserThread = new websitePageFrame.BrowserThread(function() {

             if (websitePageFrameClient.getResponse() !== null) {

                 alert(websitePageFrameClient.getResponse().childNestedBrowsingContextsPageTitle);
                 waitForResponseBrowserThread.stop();

             }

        }, 1000);

        waitForResponseBrowserThread.start();

        </script>
    </body>
</html>
```

The code we add here introduces the use of three new client side classes  [BrowserThread](#BrowserThread), [MessageBuilder](#MessageBuilder) and [Action](#Action) in order to create a message in the parent browsing context, send it off to the child browsing context and log some information to the console from the child browsing context making use of argument passed along with the action to be invoked and wait until response is returned to retrieve and display the title of the child browsing context page that was added to the response object(which is postMessageDataReturned.) and sent to the parent browsing context.

These are the basics of what you can do with this library for more go have a read through [Advanced Options](#Advanced_Options) and if you want a better understanding of the classes used here and more go have a read through [Library Classes](#Library_Classes) which mostly organizes the classes out into categories of where they are intended to be used with the exception of [General](#General) which holds classes that could be used in either environment or be extended through sub classes for use in either environment.

## Advanced Options

The advanced options section is for those who wish to dig a little deeper into how exactly the in app browser works behind the scenes as well those who simply wish to add to or alter the existent behavior of this in app browser.

### Add custom task to modify in app browser navigation or resource response

This subsection here is going to walk through step by step how to add additional response modification tasks to be run each time a new in app browser navigation or resource(resource requests are those for assets such as styles sheets, images that are to be shown or style the HTML page that has already been received.) request is triggered and response for that requests has been received on the backend(outside of renderer process.).

#### 1. Extending ResponseModificationChainLink

So first thing we are going to do is create our class that will extend [ResponseModificationChainLink](#ResponseModificationChainLink) it is recommended to read up on this class by clicking the link before moving on to better understand how it is used, once this classes use is understood the code for the class that we are going to write should look something like what is below differing in size based on the amount of work that task will undertake, but generally each task should have 1 job as you can simply write more and group them together to do bigger jobs.

```javascript
// MyCustomResponseModificationChainLink.js
var ResponseModificationChainLink = require("website-page-frame").native.ResponseModificationChainLink
function MyCustomResponseModificationChainLink() {
    ResponseModificationChainLink.call(this);

    this._customHeaderToAddToResponse = "header_to_add";
    this._customHeaderValueToAdd = "header_value";
    this._customHeaderToRemoveFromResponse = "header_to_remove";

}
MyCustomResponseModificationChainLink.prototype = Object.create(MyCustomResponseModificationChainLink.prototype);
MyCustomResponseModificationChainLink.prototype.constructor = MyCustomResponseModificationChainLink;

MyCustomResponseModificationChainLink.prototype.preformTask = function(response) {

    response.getHeaderMap().set(this._customHeaderToAddToResponse, this._customHeaderValueToAdd);
    response.remove(this._customHeaderToRemoveFromResponse);

};

exports.MyCustomResponseModificationChainLink = MyCustomResponseModificationChainLink;
```

The above is somewhat what the classes code should look like (**ES5** class syntax is used here.) although again differing is naming & size based on the job that it is that your task should be carrying out, after you have completed this you may move onto the the next step.

#### 2. Adding newly created MyCustomResponseModificationChainLink to in app navigation and resource response modification chains

So for this step we are going to go back to our **main.js file** or equivalent electron app entry script that should look something like this based on what option you chose in the [Getting Started](#Getting_Started) section.

```javascript
// main.js(or equivalent) file.
var ElectronWebsitePageFrame = require("website-page-frame").native.ElectronWebsitePageFrame;

const { app, BrowserWindow } = require("electron");
let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({ width: 800,
                                    height: 600,
                                    webPreferences: {
                                        // LINUX OR MAC
                                        preload: `${__dirname}/yourPreloadScriptWithIpcRendererCacheClearCall.js`
                                        // WINDOWS
                                        preload: `${__dirname}\\yourPreloadScriptWithIpcRendererCacheClearCall.js`
                                    }
                                  });

    // LINUX OR MAC
    appWindow.loadFile(`${__dirname}/index.html`);

    // WINDOWS
    appWindow.loadFile(`${__dirname}\\index.html`);

    var electronWebsitePageFrame = new ElectronWebsitePageFrame();

    electronWebsitePageFrame.setupProtocolInterceptors();


    appWindow.on("closed", () => {
        appWindow = null;
    });
}

app.on("ready", createWindow);
```

And what we are going to do is import the necessary files to add on our newly created [ResponseModificationChainLink](#ResponseModificationChainLink) class descendant to the normal flow of the in app browser like so.

```javascript
// main.js(or equivalent) file.
var ElectronWebsitePageFrame = require("website-page-frame").native.ElectronWebsitePageFrame;
var ElectronCacheFactory = require("website-page-frame").native.ElectronCacheFactory;
var WebsitePageFrameNavigationResponsePreparation = require("website-page-frame").native.WebsitePageFrameNavigationResponsePreparation;
var WebsitePageFrameResourceResponsePreparation = require("website-page-frame").native.WebsitePageFrameResourceResponsePreparation;
var ElectronNetworkRequestHandler = require("website-page-frame").native.ElectronNetworkRequestHandler;
var ElectronNetworkRequestInterceptor = require("website-page-frame").native.ElectronNetworkRequestInterceptor;
var ResponsibilityChainBuilder = require("website-page-frame").general.ResponsibilityChainBuilder;
var Protocol = require("website-page-frame").native.Protocol;
var MyCustomResponseModificationChainLink = require("../wherever/class/is/directory/wise/MyCustomResponseModificationChainLink.js").MyCustomResponseModificationChainLink;

const { app, BrowserWindow } = require("electron");
let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({ width: 800,
                                    height: 600,
                                    webPreferences: {
                                        // LINUX OR MAC
                                        preload: `${__dirname}/yourPreloadScriptWithIpcRendererCacheClearCall.js`
                                        // WINDOWS
                                        preload: `${__dirname}\\yourPreloadScriptWithIpcRendererCacheClearCall.js`
                                    }
                                  });

    // LINUX OR MAC
    appWindow.loadFile(`${__dirname}/index.html`);

    // WINDOWS
    appWindow.loadFile(`${__dirname}\\index.html`);

    var cache = (new ElectronCacheFactory()).create();
    var responsePreparationChainBuilder = new ResponsibilityChainBuilder();

    var websitePageFrameNavigationResponsePreparation = new WebsitePageFrameNavigationResponsePreparation();
    var websitePageFrameResourceResponsePreparation = new WebsitePageFrameResourceResponsePreparation();

    websitePageFrameNavigationResponsePreparation.getTaskChain().push(new MyCustomResponseModificationChainLink());
    websitePageFrameResourceResponsePreparation.getTaskChain().push(new MyCustomResponseModificationChainLink());

    responsePreparationChainBuilder.attachChainLink( websitePageFrameNavigationResponsePreparation );
    responsePreparationChainBuilder.attachChainLink( websitePageFrameResourceResponsePreparation );

    var electronNetworkRequestHandler = new ElectronNetworkRequestHandler( session.defaultSession,
                                                                           cache,
                                                                           responsePreparationChainBuilder );


    var electronHttpsRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("https"),
                                                                                 electronNetworkRequestHandler );

    interceptors = [ electronHttpsRequestInterceptor ];


    var electronWebsitePageFrame = new ElectronWebsitePageFrame(interceptors);

    electronWebsitePageFrame.setupProtocolInterceptors();

    appWindow.on("closed", () => {
        appWindow = null;
    });
}

app.on("ready", createWindow);
```

This is again is somewhat what your code should now look like now in your **main.js file**, so now your all done from here the task that is to be preformed along side those already added to the task chain will be executed with each in app browser navigation or resource request, just a side note though what should generally be used and needs to be used to set the **taskChain** variable for any other [ResponsibilityChainLink](#ResponsibilityChainLink) is the [TaskChainBuilder](#TaskChainBuilder) it helps to keep the setup process neat and tidy for these classes but why is it not used here then ? well that is because these classes ( [WebsitePageFrameNavigationResponsePreparation](#WebsitePageFrameNavigationResponsePreparation) and [WebsitePageFrameResourceResponsePreparation](#WebsitePageFrameResourceResponsePreparation) ) already have there own preset filled **taskChain** variable and I do not want to mistakenly disrupt that as it these preset tasks are essential to the in app browser so here I modify **taskChain** variable directly so as not to unintentionally add or remove any of the preset tasks.

### Add custom ResponsePreparationChainLink

Before we get started here it is probably best if you go take a look at [ResponsePreparationChainLink](#ResponsePreparationChainLink) if you have not already to get a better understanding of its use.

So what we are going to do now is run through the steps to create your own  [ResponsePreparationChainLink](#ResponsePreparationChainLink) sub class to be used for whatever purpose you deem fit in our case all we are going to do is create one that will count all the incoming data that is not related to our in app browser both **HTTPS**, now one thing to keep note of is the [NetworkRequestHandlers](#NetworkRequestHandler) **responsePreparationChain** is searched through for a [ResponsePreparationChainLink](#ResponsePreparationChainLink) or descendant of that, from the start of the [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) to the end so if you put this or any other [ResponsePreparationChainLink](#ResponsePreparationChainLink) descendant at the very start of the [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) their is a high chance that it will interfere with the in app browsers key components [WebsitePageFrameNavigationResponsePreparation](#WebsitePageFrameNavigationResponsePreparation) & [WebsitePageFrameResourceResponsePreparation](#WebsitePageFrameResourceResponsePreparation) if they are not placed at the start of the array as the **responsePreparationChain** is only searched to find the [ResponsePreparationChainLink](#ResponsePreparationChainLink)  or descending classes incoming traffic that they are responsible for, once found they will run through some tasks and any [ResponsePreparationChainLink](#ResponsePreparationChainLink) or descending classes after the responsible one found in the **responsePreparationChain** will simply be skipped.

If you have followed and understand all of the above you should be ready to move on to the first step.

#### 1. Create your own ResponsePreparationChainLink subclass

So as I mentioned the class we are extending is [ResponsePreparationChainLink](#ResponsePreparationChainLink) and what your subclass should look like is something like what is shown below differing in length based on what you choose for its use to be.
```javascript
var TaskChainBuilder = require("website-page-frame").native.TaskChainBuilder;
var ResponsePreparationChainLink = require("website-page-frame").native.ResponsePreparationChainLink;
var IncrementCacheTrafficCounter = require("../where/directory/wise/is/IncrementCacheTrafficCounter.js").IncrementCacheTrafficCounter;
var taskChainBuilder = new TaskChainBuilder();


taskChainBuilder.attachChainLink(new IncrementCacheTrafficCounter());

function IncomingTrafficCounter() {

    ResponsePreparationChainLink.call(this, taskChainBuilder);

}

IncomingTrafficCounter.prototype = Object.create(ResponsePreparationChainLink.prototype);
IncomingTrafficCounter.prototype.constructor = IncomingTrafficCounter;

IncomingTrafficCounter.prototype.checkIfResponsible(request, response, cache) {
    return true;
};

exports.IncomingTrafficCounter = IncomingTrafficCounter;
```

Although this is simple enough to write their are a few things to keep note of **IncrementCacheTrafficCounter** [ResponseModificationChainLink](#ResponseModificationChainLink) is yet to be written by us and we will do this in the next step, also their is one method we simple override as a catch all of the **responsePreparationChain** of ours by ensuring that it always returns true each time the **HTTPS** traffic comes in that the in app browser is not responsible for this Responsibility Chain Link will be run executing all of its **taskChain** tasks which in our case is just the one which will increment the caches traffic counter each time this [ResponsePreparationChainLink](#ResponsePreparationChainLink) is found to be responsible for incoming traffic, now move on to the next step.

#### 2. Writing IncrementCacheTrafficCounter class

Here what we are going to do is create a subclass of [ResponseModificationChainLink](#ResponseModificationChainLink) that will on first time running create a key-value pair in the cache for key "IncomingTrafficCounter" and set it to 1 and each subsequent time this classes **preformTask** method is run it will increment the key "IncomingTrafficCounter" value by 1 each time, code for this class can be seen below.

```javascript
var ResponseModificationChainLink = require("website-page-frame").native.ResponseModificationChainLink;

function IncrementCacheTrafficCounter() {
    ResponseModificationChainLink.call(this)
}

IncrementCacheTrafficCounter.prototype = Object.create(ResponseModificationChainLink.prototype);
IncrementCacheTrafficCounter.prototype.constructor = IncrementCacheTrafficCounter;

IncrementCacheTrafficCounter.prototype.preformTask = function(response, cache) {

    if ( cache.has("IncomingTrafficCounter") ) {

        cache.set("IncomingTrafficCounter", cache.get("IncomingTrafficCounter") + 1 );

    } else {

        cache.set("IncomingTrafficCounter", 1);

    }
    console.log( "traffic counter is now: " + cache.get("IncomingTrafficCounter"));
};

exports.IncrementCacheTrafficCounter = IncrementCacheTrafficCounter;
```

Now that we have create **IncomingTrafficCounter** [ResponsePreparationChainLink](#ResponsePreparationChainLink) descendant and **IncrementCacheTrafficCounter** [ResponseModificationChainLink](#ResponseModificationChainLink) descendant it is now time we move onto the next and final step of adding them the setup of **main.js file** or equivelant from the [Getting Started](#Getting_Started) section.

#### 3. Adding IncomingTrafficCounter to electron "main.js file" setup or equivalent

The below code displays somewhat what your setup should look like in your electron **main.js file** or equivelant, again one thing to keep note of is the order of the [ResponsePreparationChainLinks](#ResponsePreparationChainLink) sub classes with the key in app browser classes coming first ensuring that **IncomingTrafficCounter is added to the end of the **responsePreparationChain** [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

```javascript
// main.js(or equivalent) file.
var ElectronWebsitePageFrame = require("website-page-frame").native.ElectronWebsitePageFrame;
var ElectronCacheFactory = require("website-page-frame").native.ElectronCacheFactory;
var WebsitePageFrameNavigationResponsePreparation = require("website-page-frame").native.WebsitePageFrameNavigationResponsePreparation;
var WebsitePageFrameResourceResponsePreparation = require("website-page-frame").native.WebsitePageFrameResourceResponsePreparation;
var ElectronNetworkRequestHandler = require("website-page-frame").native.ElectronNetworkRequestHandler;
var ElectronNetworkRequestInterceptor = require("website-page-frame").native.ElectronNetworkRequestInterceptor;
var ResponsibilityChainBuilder = require("website-page-frame").general.ResponsibilityChainBuilder;
var Protocol = require("website-page-frame").general.Protocol;
var IncomingTrafficCounter = require("../wherever/class/is/directory/wise/IncomingTrafficCounter.js").IncomingTrafficCounter;
const { app, BrowserWindow } = require("electron");

let appWindow;

function createWindow() {
    appWindow = new BrowserWindow({ width: 800,
                                    height: 600,
                                    webPreferences: {
                                        // LINUX OR MAC
                                        preload: `${__dirname}/yourPreloadScriptWithIpcRendererCacheClearCall.js`
                                        // WINDOWS
                                        preload: `${__dirname}\\yourPreloadScriptWithIpcRendererCacheClearCall.js`
                                    }
                                  });

    // LINUX OR MAC
    appWindow.loadFile(`${__dirname}/index.html`);

    // WINDOWS
    appWindow.loadFile(`${__dirname}\\index.html`);


    var cache = (new ElectronCacheFactory()).create();
    var responsePreparationChainBuilder = new ResponsibilityChainBuilder();

    responsePreparationChainBuilder.attachChainLink( new WebsitePageFrameNavigationResponsePreparation() );
    responsePreparationChainBuilder.attachChainLink( new WebsitePageFrameResourceResponsePreparation() );
    responsePreparationChainBuilder.attachChainLink( new IncomingTrafficCounter() );

    var electronNetworkRequestHandler = new ElectronNetworkRequestHandler( session.defaultSession,
                                                                           cache,
                                                                           responsePreparationChainBuilder );


    var electronHttpsRequestInterceptor = new ElectronNetworkRequestInterceptor( new Protocol("https"),
                                                                                electronNetworkRequestHandler );

    interceptors = [ electronHttpsRequestInterceptor ];


    var electronWebsitePageFrame = new ElectronWebsitePageFrame(interceptors);

    electronWebsitePageFrame.setupProtocolInterceptors();



    appWindow.on("closed", () => {
        appWindow = null;
    });
}

app.on("ready", createWindow);
```

and now if you run this and begin to make requests that are related to the in app browser the **responsePreparationChain** will trigger on its last element of the array and the current **IncomingTrafficCounter** will be logged to the console in your terminal or command prompt.

### Other changes that could be made

So this section stands as to point out that their is a lot of room for improvement in this library by listing out what its current limitations are will do just that and that list of current limitations can be seen below, if you feel you can address any of these limitations of this library or others note mentioned here go ahead but ensure to apply the same license when you fork the library.

1. [ElectronNetworkRequestHandler](#ElectronNetworkRequestHandler), this class although it preforms its responsibilities to handle all the ins and outs of sending requests out and ensuring      that responses are in an expected format for the users of the library to work with(e.g. modify) before returning to                                                                            [ElectronNetworkRequestInterceptor](#ElectronNetworkRequestInterceptor), it still currently holds alot of room for improvement, the first of which being response body conversion              currently it is only designed to convert the body of a html page to text, all others will be left as [ReadableStreams](https://nodejs.org/api/stream.html#stream_readable_streams)             making it difficult for users of this library to modify different types of incoming traffic's bodies, and their is more than likely plenty more improvements just waiting to be made here.

2. WebsitePageFrame, currently the components this library provides only support smooth navigation from page to page from the child nested browsing contexts requests directly, their is the      method of moving from website to website by clearing the cache each time of its **current origin** that is stored, so some new secure ways of moving from website to website smoothly from     the child nested browsing context directly would be usefull though.

3. Framework Support, currently the list of supported frameworks that this library can be used on is limited to just the one.

## Library Classes

### Client

---
####  WebsitePageFrameMessageBuilder

this class extends [MessageBuilder](#MessageBuilder) providing no additional member variables or methods, instead its use is during construction of an object of this type it gives predefined values to one of its existent member variables **_messageSignatureGenerator** for use to automatically generate a message signature when building messages to be sent by [WebsitePageFrameClient](#WebsitePageFrameClient) **sendMessage** method.

##### Member Variables
None.
##### Constructors
- **public** WebsitePageFrameMessageBuilder()
##### Methods
###### Inherited
- **protected** setMessageSignatureGenerator(messageSignatureGenerator): [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
- **public** attachAction(action: [Action](#Action)): [MessageBuilder](#MessageBuilder)
- **public** finishBuild(): [Message](#Message)

---

####  WebsitePageFrameClient

This class extends [Client](#Client).

##### Member Variables

- **private** previousMessageSignature: int | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)

###### Inherited

- **protected** clientConnection: [Connection](#Connection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)

##### Constructors

- **public** WebsitePageFrameClient()
- **public** WebsitePageFrameClient(websitePageFrameConnection: [WebsitePageFrameConnection](#WebsitePageFrameConnection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) )
- **public** WebsitePageFrameClient(websitePageFrameConnection: [WebsitePageFrameConnection](#WebsitePageFrameConnection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), responseExpectedByTimeoutMilliseconds: int | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) )

##### Methods

- **private** setupMessageResponseListener(): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** sendMessage(message: [Message](#Message)):  [void](https://en.wikipedia.org/wiki/Void_type)
- **public** sendMessagePreChecks(message: [Message](#Message)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **public** getPreviousMessageSentSignature(): int | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **private** setPreviousMessageSentSignature(previousMessageSentSignature: int | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)

###### Inherited

- **public** isConnectionReady(): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **public** getClientConnection(): [Connection](#Connection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **public** setClientConnection(clientConnection: [Connection](#Connection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getResponse(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **protected** setResponse(response: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getResponseExpectedByTimeoutMilliseconds(): int
- **public** setResponseExpectedByTimeoutMilliseconds(responseExpectedByTimeoutMilliseconds: int):  [void](https://en.wikipedia.org/wiki/Void_type)

---

#### WebsitePageFramePingClient

This class extends [WebsitePageFrameClient](#WebsitePageFrameClient).

##### Member Variables

###### Inherited

- **protected** clientConnection [Connection](#Connection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)

##### Constructors

- **public** WebsitePageFramePingClient()

##### Methods

- **public** sendMessagePreChecks(message: [Message](#Message)):  [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

###### Inherited

- **public** sendMessage(message: [Message](#Message)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getPreviousMessageSentSignature(): int | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **public** isConnectionReady():  [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **public** getClientConnection(): [Connection](#Connection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **public** setClientConnection(clientConnection: [Connection](#Connection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getResponse(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **protected** setResponse(response: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getResponseExpectedByTimeoutMilliseconds(): int
- **public** setResponseExpectedByTimeoutMilliseconds(responseExpectedByTimeoutMilliseconds: int): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  WebsitePageFrameConnection

This class extends [Connection](#Connection).

##### Member Variables

- **private** WEBSITE_URL_UNIQUE_FRAGMENT: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **private** childBrowsingContextCurrentOrigin: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **private** childBrowsingContextInitialURL: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **private** childBrowsingContext: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)

###### Inherited

- **protected** pingClient: [Client](#Client)
- **protected** [connectionRetryThread](#Thread)

##### Constructors

- **public** WebsitePageFrameConnection()
- **public** WebsitePageFrameConnection(childBrowsingContextOrigin:  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))
- **public** WebsitePageFrameConnection(childBrowsingContextOrigin:  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), childBrowsingContext: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))
- **public** WebsitePageFrameConnection(childBrowsingContextOrigin:  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), childBrowsingContext: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), maxConnectionRetries: int | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))

##### Methods

- **public** openNewConnection(): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** closeCurrentConnection(): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** updateChildBrowsingContextCurrentLocationInformation(childBrowsingContextIntialURL: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getWebsiteUrlUniqueFragment():  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **public** getBrowsingContextCurrentOrigin():  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **public** getChildBrowsingContextInitialURL():  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **public** getChildBrowsingContext(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **public** setChildBrowsingContext(childBrowsingContext: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)
- **protected** setPingClient(pingClient: [WebsitePageFramePingClient](#WebsitePageFramePingClient)): [void](https://en.wikipedia.org/wiki/Void_type)
- **protected** setConnectionRetryThread(connectionRetryThread: [BrowserThread](#BrowserThread)): [void](https://en.wikipedia.org/wiki/Void_type)

###### Inherited

- **public** getIsConnectionOpen(): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **protected** setIsConnectionOpen(isConnectionOpen: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)): [void](https://en.wikipedia.org/wiki/Void_type)
- **protected** getPingClient(): [Client](#Client)
- **public** getConnectionRetryThread(): [Thread](#Thread)
- **public** getCurrentConnectionRetriesLeft(): int
- **public** setCurrentConnectionRetriesLeft(currentConnectionRetriesLeft: int): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getMaxConnectionRetries(): int
- **public** setMaxConnectionRetries(maxConnectionRetries: int): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  BrowserThread
This class extends [Thread](#Thread).

##### Member Variables

- **private** codeExecutingIntervalId: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **private** codeIsToBeExecutedEveryXMilliseconds: int

###### Inherited
- **public** POSSIBLE_STATES: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **protected** codeToBeExecuted: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

##### Constructors
- **public** BrowserThread(codeToBeExecuted: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))
- **public** BrowserThread(codeToBeExecuted: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function), codeIsToBeExecutedEveryXMilliseconds: int | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))

##### Methods
- **public** start(): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** stop(): [void](https://en.wikipedia.org/wiki/Void_type)
- **protected** setCodeToBeExecuted(functionToBeExecuted: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)): [void](https://en.wikipedia.org/wiki/Void_type)
- **private** getCodeExecutingIntervalId(): [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **private** setCodeExecutingIntervalId(codeExecutingIntervalId: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getCodeIsToBeExecutedEveryXMilliseconds(): int
- **public** setCodeIsToBeExecutedEveryXMilliseconds(codeIsToBeExecutedEveryXMilliseconds: int): [void](https://en.wikipedia.org/wiki/Void_type)

###### Inherited

- **public**  getState(): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **protected** setState(state: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [void](https://en.wikipedia.org/wiki/Void_type)
- **protected** getCodeToBeExecuted(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
---

### General

---

####  Action

##### Member Variables

- **private** actionParameters: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **private** actionArguements: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **private** actionBody: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

##### Constructors

- **public** Action()
- **public** Action(actionParameters: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))
- **public** Action(actionParameters: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), actionArguements: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))
- **public** Action(actionParameters: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), actionArguements: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), actionBody: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))

##### Methods

- **public** getActionParameters(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public** setActionParameters(actionParameters: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public**  getActionArguements(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public**  setActionArguements(actionArguements: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getActionBody(): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **public** setActionBody(actionBody:  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)):[void](https://en.wikipedia.org/wiki/Void_type)
- **public** toJsonFormat(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **public** fromJsonFormat(actionObject: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  Builder

##### Member Variables

None.

##### Constructors

- **public** Builder()

##### Methods

- **public** **abstract** finishBuild(): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  ChainBuilder

This class extends [Builder](#Builder).

##### Member Variables

- **protected** chain: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

##### Constructors

- **public** ChainBuilder()

##### Methods

- **public** attachChainLink(chainLink: [ChainLink](#ChainLink)): [ChainBuilder](#ChainBuilder)
- **public** finishBuild(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

####  TaskChainBuilder

This class extends [ChainBuilder](#ChainBuilder).

#### Member Variables

None.

##### Constructors

- **public** TaskChainBuilder()

#### Methods

- **public** attachChainLink(taskChainLink: [TaskChainLink](#TaskChainLink)): [TaskChainBuilder](#TaskChainBuilder)

##### Inherited

- **public** finishBuild(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)


---

####  ResponsibilityChainBuilder

This class extends [ChainBuilder](#ChainBuilder).

##### Member Variables

None.

##### Constructors

- **public** ResponsibilityChainBuilder()

##### Methods

- **public** attachChainLink(responsibilityChainLink: [ResponsibilityChainLink](#ResponsibilityChainLink)): [ResponsibilityChainBuilder](#ResponsibilityChainBuilder)

##### Inherited

- **public** finishBuild(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

####  MessageBuilder

This class extends [Builder](#Builder).

##### Member Variables

- **private** messageBeingBuilt: [Message](#Message)
- **private** messageSignatureGenerator: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

##### Constructors

- **public** MessageBuilder(messageSignatureGenerator: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))

##### Methods

- **private** setMessageSignatureGenerator(messageSignatureGenerator: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** attachAction(action: [Action](#Action)): [MessageBuilder](#MessageBuilder)
- **public** finishBuild(): [Message](#Message)

---

####  ChainLink

##### Member Variables

None.

##### Constructors

- **public** ChainLink()

##### Methods

None.

---

####  TaskChainLink

This class extends [ChainLink](#ChainLink).

##### Member Varialbles

None.

##### Constructor

- **public** TaskChainLink()

##### Methods

- **public** **abstract** preformTask(): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  ResponsibilityChainLink

This class extends [ChainLink](#ChainLink).

##### Member Variables

- **private** taskChain: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

##### Constructor

- **public** ResponsibilityChainLink()
- **public** ResponsibilityChainLink(taskChainBuilder: [TaskChainBuilder](#TaskChainBuilder) |  [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))

##### Methods


- **public** getTaskChain(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public** setTaskChain(taskChainBuilder: [TaskChainBuilder](#TaskChainBuilder)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** **abstract** checkIfResponsible(): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **public** **abstract** handleResponsibility(): [void](https://en.wikipedia.org/wiki/Void_type)
---

####  Client

##### Member Variables

- **protected** clientConnection: [Connection](#Connection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **private** response:  [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **private** responseExpectedByTimeoutMilliseconds: int

##### Constructors

- **public** Client()
- **public** Client(clientConnection: [Connection](#Connection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))
- **public** Client(clientConnection: [Connection](#Connection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), responseExpectedByTimeoutMilliseconds: int | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))


##### Methods

- **public** **abstract** sendMessage(message: [Message](#Message)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** **abstract** sendMessagePreChecks(message: [Messsage](#Message)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **public** isConnectionReady(): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **public** getClientConnection(): [Connection](#Connection) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **public** setClientConnection(clientConnection: [Connection](#Connection) ): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getResponse(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **protected** setResponse(response: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getResponseExpectedByTimeoutMilliseconds(): int
- **public** setResponseExpectedByTimeoutMilliseconds(responseExpectedByTimeoutMilliseconds: int): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  Connection

##### Member Variables
- **protected** pingClient: [Client](#Client)
- **protected** connectionRetryThread: [Thread](#Thread)
- **public** currentConnectionRetriesLeft: int
- **public** maxConnectionRetries: int
- **public** isConnectionOpen: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

##### Constructors
- **public** Connection(pingClient: [Client](#Client), connectionRetryThread: [Thread](#Thread))
- **public** Connection(pingClient: [Client](#Client), connectionRetryThread: [Thread](#Thread), maxConnectionRetries: int | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))

##### Methods
- **public** **abstract** openNewConnection(): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** **abstract** closeCurrentConnection(): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getIsConnectionOpen():  [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **protected** setIsConnectionOpen(isConnectionOpen: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)): [void](https://en.wikipedia.org/wiki/Void_type)
- **protected** getPingClient(): [Client](#Client)
- **protected** setPingClient(pingClient: [Client](#Client)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getConnectionRetryThread(): [Thread](#Thread)
- **protected** setConnectionRetryThread(connectionRetryThread: [Thread](#Thread)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getCurrentConnectionRetriesLeft(): int
- **public** setCurrentConnectionRetriesLeft(currentConnectionRetriesLeft: int): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getMaxConnectionRetries(): int
- **public** setMaxConnectionRetries(maxConnectionRetries: int): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  Map

##### Member Variables

None.

##### Constructors

- **public** Map()

##### Methods
- **public** **abstract** get(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** **abstract** set(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), value: any): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** **abstract** remove(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** **abstract** has(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **protected** **abstract** prepareValidKey(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  Message

##### Member Variables

- **private** action: [Action](#Action)
- **private** messageSignature: int

##### Constructors

- **public** Message()
- **public** Message(action: [Action](#Action) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))
- **public** Message(action: [Action](#Action) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), messageSignature: int | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))

##### Methods

- **public** toJsonFormat(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **public** fromJsonFormat(jsonFormattedMessage: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getAction(): [Action](#Action)
- **public** setAction(action: [Action](#Action)):  [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getMessageSignature(): int
- **public** setMessageSignature(messageSignature: int)

---

####  Thread

##### Member Variables

- **public** POSSIBLE_STATES: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **private** state: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **protected** codeToBeExecuted: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

##### Constructors

- **public** Thread(codeToBeExecuted: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))

##### Methods

- **public** **abstract** start(): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** **abstract** stop(): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getState(): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **protected** setState(state: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [void](https://en.wikipedia.org/wiki/Void_type)
- **protected** getCodeToBeExecuted(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **protected** setCodeToBeExecuted(codeToBeExecuted: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)):  [void](https://en.wikipedia.org/wiki/Void_type)
---

### Native </h3>

---

####  AddFileSchemaToFrameAnscestorsChainLink

This class extends [ResponseModificationChainLink](#ResponseModificationChainLink).

##### Member Variables

None.
##### Constructors

- **public** AddFileSchemaToFrameAnscestorsChainLink()

##### Methods

- **public** preformTask(response: [Response](#Response), cache: [Cache](#Cache) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  BodyScriptInjectionChainLink

This class extends [ResponseModficationChainLink](#ResponseModficationChainLink).

##### Member Variables

- **private** scriptsToBeInjected: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

##### Constructors

- **public** BodyScriptInjectionChainLink(scriptsToBeInjected: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))

##### Methods
- **public** preformTask(response: [Response](#Response), cache: [Cache](#Cache) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getScriptsToBeInjected(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public** setScriptsToBeInjected(scriptsToBeInjected:  [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)): [void](https://en.wikipedia.org/wiki/Void_type)
- **private** arrayIsEmpyOrOnlyContainingScripts(scriptsToBeInjected: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

####  RemoveXFrameOptionsChainLink

This class extends [ResponseModficationChainLink](#ResponseModficationChainLink).

##### Member Variables

None.

##### Constructors

- **public** RemoveXFrameHeaderChainLink()

##### Methods

- **public** preformTask(response: [Response](#Response), cache: [Cache](#Cache) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  ResponseModificationChainLink

This class extends [TaskChainLink](#TaskChainLink).

##### Member Variables

None.

##### Constructors

- **public** ResponseModificationChainLink()

##### Methods

- **public** preformTask(response: [Response](#Response), cache: [Cache](#Cache) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  ResponsePreparationChainLink

This class extends [ResponsibilityChainLink](#ResponsibilityChainLink)

##### Member Variables

None.

##### Constructors

- **public** ResponsePreparationChainLink(taskChainBuilder: [TaskChainBuilder](#TaskChainBuilder) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))

##### Methods

- **public** **abstract** checkIfResponsible(request: [Request](#Request), response: [Response](#Response), cache: [Cache](#Cache)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **public** handleResponsibility(response: [Response](#Response), cache: [Cache](#Cache)): [void](https://en.wikipedia.org/wiki/Void_type)
###### Inherited
- **public** getTaskChain(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public** setTaskChain(taskChainBuilder: [TaskChainBuilder](#TaskChainBuilder)): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  WebsitePageFrameNavigationResponsePreparation

This class extends [ResponseModificationChainLink](#ResponseModificationChainLink).

##### Member Variables

- **private** WEBSITE_URL_UNIQUE_FRAGMENT: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **private** SEC_FETCH_MODE: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

##### Constructors

- **public** WebsitePageFrameNavigationResponsePreparation()

##### Methods

- **public** checkIfResponsible(request: [Request](#Request), response: [Response](#Response), cache: [Cache](#Cache)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
###### Inherited
- **public** handleResponsibility(response: [Response](#Response), cache: [Cache](#Cache)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getTaskChain(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public** setTaskChain(taskChainBuilder: [TaskChainBuilder](#TaskChainBuilder)): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  WebsitePageFrameResourceResponsePreparation

This class extends [ResponsePreparationChainLink](#ResponsePreparationChainLink).

##### Member Variables

None.

##### Constructors

- **public** WebsitePageFrameResourceResponsePreparation()

##### Methods

- **public** checkIfResposible(request: [Request](#Request), response: [Response](#Response), cache: [Cache](#Cache)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

###### Inherited
- **public** handleResponsibility(response: [Response](#Response), cache: [Cache](#Cache)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getTaskChain(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public** setTaskChain(taskChainBuilder: [TaskChainBuilder](#TaskChainBuilder)): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  ElectronCacheFactory

##### Member Variables

- **private** cache: [Cache](#Cache)

##### Constructors

- **public** ElectronCacheFactory()

##### Methods

- **public** create(): [Cache](#Cache)
- **private** setupIPCClearCache(): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  Interceptor

##### Member Variables

- **private** protocol: [Protocol](#Protocol)

##### Constructors

- **public** Interceptor(protocol: [Protocol](#Protocol))

##### Methods

- **public** getProtocol(): [Protocol](#Protocol)
- **public** setProtocol(protocol: [Protocol](#Protocol)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** **abstract** interceptProtocolRequest(): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  NetworkRequestInterceptor

This class extends [Interceptor](#Interceptor).

##### Member Variables

- **private** networkRequestHandler: [NetworkRequestHandler](#NetworkRequestHandler)

##### Constructors

- **public** NetworkRequestInterceptor(protocol: [Protocol](#Protocol), networkRequestHandler: [NetworkRequestHandler](#NetworkRequestHandler))

##### Methods

- **public** getNextworkRequestHandler(): [NetworkRequestHandler](#NetworkRequestHandler)
- **public** setNetworkRequestHandler(networkRequestHandler: [NetworkRequestHandler](#NetworkRequestHandler)): [void](https://en.wikipedia.org/wiki/Void_type)

###### Inherited

- **public** getProtocol(): [Protocol](#Protocol)
- **public** setProtocol(protocol: [Protocol](#Protocol)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** **abstract** interceptProtocolRequest(): [void](https://en.wikipedia.org/wiki/Void_type)
---

####  ElectronNetworkRequestInterceptor

This class extends [NetworkRequestInterceptor](#NetworkRequestInterceptor).

##### Member Variables

None.

##### Constructors

- **public** ElectronNetworkRequestHandler(protocol: [Protocol](#Protocol), networkRequestHandler: [NetworkRequestHandler](#NetworkRequestHandler))

##### Methods


- **public** interceptProtocolRequest(request: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), callback: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)):
- **public** completion(hasErrorOccured: [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)): [void](https://en.wikipedia.org/wiki/Void_type)

###### Inherited

- **public** getProtocol(): [Protocol](#Protocol)
- **public** setProtocol(protocol: [Protocol](#Protocol)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getNextworkRequestHandler(): [NetworkRequestHandler](#NetworkRequestHandler)
- **public** setNetworkRequestHandler(networkRequestHandler: [NetworkRequestHandler](#NetworkRequestHandler)): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  Cache

This class extends [Map](#Map).

##### Member Variables

None.

##### Constructors

- **public** Cache()

##### Methods

- **public** get(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **public** set(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), value: any):  [void](https://en.wikipedia.org/wiki/Void_type)
- **public** remove(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** has(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **public** clear(): [void](https://en.wikipedia.org/wiki/Void_type)
###### Inherited
- **protected** prepareValidKey(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

####  HeaderMap

This class extends [Map](#Map).

##### Member Variables

- **public** headers: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

##### Constructors

- **public** HeaderMap()

##### Methods

- **public** append(header: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), headerValue: any): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** get(header: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **public** set(header: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), headerValue: any):  [void](https://en.wikipedia.org/wiki/Void_type)
- **public** remove(header: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** has(header: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **public** toObject(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **public** fromObject(headersObject [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)): [void](https://en.wikipedia.org/wiki/Void_type)

###### Inherited

- **protected** prepareValidKey(key: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

####  NetworkMessage

##### Member Variables

- **private** headerMap: [HeaderMap](#HeaderMap)
- **private** body: any

##### Constructors

- **public** NetworkMessage(headerMap [HeaderMap](#HeaderMap))
- **public** NetworkMessage(headerMap [HeaderMap](#HeaderMap), body: any)

##### Methods

- **public** getHeaderMap(): [HeaderMap](#HeaderMap)
- **public** setHeaderMap(headerMap: [HeaderMap](#HeaderMap)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getBody(): any
- **public** setBody(body: any): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  Request

This class extends [NetworkMessage](#NetworkMessage).

##### Member Variables

- **private** url: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **private** method: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

##### Constructors

- **public** Request(url: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), method: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), headerMap: [HeaderMap](#HeaderMap))
- **public** Request(url: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), method: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), headerMap: [HeaderMap](#HeaderMap), body: any)

##### Methods

- **public** getUrl(): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **public** setUrl(url: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getMethod(): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **public** setMethod(method: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)):  [void](https://en.wikipedia.org/wiki/Void_type)

###### Inherited

- **public** getHeaderMap(): [HeaderMap](#HeaderMap)
- **public** setHeaderMap(headerMap: [HeaderMap](#HeaderMap)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getBody(): any
- **public** setBody(body: any): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  Response

This class extends [NetworkMessage](#NetworkMessage).

##### Member Variables

- **private** statusCode: int

##### Constructors

- **public** Response(headerMap: [HeaderMap](#HeaderMap), body: any, statusCode: int)

##### Methods

- **public** getStatusCode(): int
- **public** setStatusCode(statusCode: int): [void](https://en.wikipedia.org/wiki/Void_type)

###### Inherited

- **public** getHeaderMap(): [HeaderMap](#HeaderMap)
- **public** setHeaderMap(headerMap: [HeaderMap](#HeaderMap)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getBody(): any
- **public** setBody(body: any): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  NetworkRequestHandler

##### Member Variables

- **private** networkRequester: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **private** cache [Cache](#Cache)
- **private** responsePreparationChain: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

##### Constructors

- **public** NetworkRequestHandler(networkRequester: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
- **public**  NetworkRequestHandler(networkRequester: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), cache: [Cache](#Cache) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))
- **public** NetworkRequestHandler(networkRequester: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), cache: [Cache](#Cache) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), responsibilityChainBuilder: [ResponsibilityChainBuilder](#ResposibilityChainBuilder) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))

##### Methods

- **public** **abstract** handleNetworkRequest(request: [Request](#Request)): [Response](#Response)
- **protected** findResponsePreparationChainLink(request: [Request](#Request), response: [Response](####Response)): [ResponsePreparatioChainLink](#ResponsePreparatioChainLink) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **public** getNetworkRequester(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **protected** setNetworkRequester(networkRequester: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getCache(): [Cache](#Cache)
- **public** setCache(cache: [Cache](#Cache)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getResponsePreparationChain(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public** setResponsePrepatationChain(responsibilityChainBuilder: [ResponsibilityChainBuilder](#ResposibilityChainBuilder)) [void](https://en.wikipedia.org/wiki/Void_type)

---

####  ElectronNetworkRequestHandler

This class extends [NetworkRequestHandler](#NetworkRequestHandler).

##### Member Variables

- **private** browserSession: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

##### Constructors

- **public** ElectronNetworkRequestHandler(browserSession: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))
- **public** ElectronNetworkRequestHandler(browserSession: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), cache: [Cache](#Cache) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))
- **public** ElectronNetworkRequestHandler(browserSession: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), cache: [Cache](#Cache) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), responsibilityChainBuilder: [ResponsibilityChainBuilder](#ResponsibilityChainBuilder) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))


##### Methods

- **public** handleNetworkRequest(request: [Request](#Request)): [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- **private** addSiteCookiesToRequestHeaderMap(request: [Request](#Request)): [void](https://en.wikipedia.org/wiki/Void_type)
- **private** extractNetworkRequesterResponseHeadersToHeaderMap(responseHeaders: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) ): [HeaderMap](####HeaderMap)
- **public** getBrowserSession(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **public** setBrowserSession(browserSession: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)): [void](https://en.wikipedia.org/wiki/Void_type)

###### Inherited

- **protected** findResponsePreparationChainLink(request: [Request](#Request), response: [Response](####Response)): [ResponsePreparationChainLink](#ResponsePreparationChainLink) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- **public** getNetworkRequester(): [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- **protected** setNetworkRequester(networkRequester: [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getCache(): [Cache](#Cache)
- **public** setCache(cache: [Cache](#Cache)): [void](https://en.wikipedia.org/wiki/Void_type)
- **public** getResponsePreparationChain(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public** setResponsePrepatationChain(responsibilityChainBuilder: [ResponsibilityChainBuilder](#ResposibilityChainBuilder)) [void](https://en.wikipedia.org/wiki/Void_type)

---

####  Protocol

##### Member Variables

- **private** scheme:  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

##### Constructors

- **public** Protocol(scheme:  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))

##### Methods

- **public** getScheme():  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
- **public** setScheme(scheme:  [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  Script

##### Member Variables

- **private** scriptCode: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

##### Constructors

- **public** Script(scriptCode: [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))

##### Methods

- **public** getScriptCode(): [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
- **public** toHtmlElementString(): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

####  WebsitePageFrameCrossOriginMessagingScript

This class extends [Script](#Script).

##### Member Variables

None.

##### Constructors

- **public** WebsitePageFrameCrossOriginMessagingScript()

##### Methods
###### Inherited
- **public** getScriptCode(): [Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
- **public** toHtmlElementString(): [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

####  WebsitePageFrame

##### Member Variables

- **private** interceptors: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

##### Constructors


- **public** WebsitePageFrame(interceptors: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))

##### Methods

- **public** getInterceptors(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public** setInterceptors(interceptors: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)): [void](https://en.wikipedia.org/wiki/Void_type)
- **protected** checkIfEmptyOrContainsOnlyInterceptors(interceptors: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
- **public** **abstract** setupProtocolInterceptors(): [void](https://en.wikipedia.org/wiki/Void_type)

---

####  ElectronWebsitePageFrame

This class extends [WebsitePageFrame](#WebsitePageFrame).

##### Member Variables

None.

##### Constructors

- **public** ElectronWebsitePageFrame()
- **public** ElectronWebsitePageFrame(interceptors: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) | [null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))

##### Methods

- **public**  setupProtocolInterceptors(browserSession:  [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)): [void](https://en.wikipedia.org/wiki/Void_type)

###### Inherited

- **public** getInterceptors(): [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- **public** setInterceptors(interceptors: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)): [void](https://en.wikipedia.org/wiki/Void_type)
- **protected** checkIfEmptyOrContainsOnlyInterceptors(interceptors: [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)): [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---


## Open Source License

```javascript
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
```
