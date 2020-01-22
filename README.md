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
