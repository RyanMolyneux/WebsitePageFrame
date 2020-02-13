var websitePageFrame=function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/home/ryan/Documents/workspace/codeWs/packages/WebsitePageFrame/dist",n(n.s=17)}([function(e,t){t.ChainLink=function(){}},function(e,t,n){function o(e,t){this._clientConnection=null,this._response=null,this._responseExpectedByTimeoutMilliseconds=null,null==e&&(e=null),null==t&&(t=1e3),this.setClientConnection(e),this.setResponseExpectedByTimeoutMilliseconds(t)}o.prototype.sendMessage=function(e){if(this.sendMessagePreChecks())throw new Error("Client sendMessage, templated method sendMessage is here as a placeholder to be replaced/overridden by subclasses and as such should not be called directly.")},o.prototype.sendMessagePreChecks=function(e){throw new Error("Client sendMessagePreChecks, templated method sendMessagePreChecks is here as a placedholder to be replaced/overridden by subclasses and as such should not be called directly.")},o.prototype.isConnectionReady=function(){if(this._clientConnection instanceof i)return this._clientConnection.getIsConnectionOpen();throw new Error("Client isConnectionReady, clientConnection must first be initialized for this method to provide you any valuable information.")},o.prototype.getClientConnection=function(){return this._clientConnection},o.prototype.setClientConnection=function(e){if(!(e instanceof i||null===e))throw new TypeError("Client setClientConnection, parameter clientConnection expected to be instanceof Connection or null.");this._clientConnection=e},o.prototype.getResponse=function(){return this._response},o.prototype._setResponse=function(e){if(!(e instanceof Object||null===e))throw new TypeError("Client _setResponse, parameter response expected to be instanceof Object or null.");this._response=e},o.prototype.getResponseExpectedByTimeoutMilliseconds=function(){return this._responseExpectedByTimeoutMilliseconds},o.prototype.setResponseExpectedByTimeoutMilliseconds=function(e){if("number"!=typeof e)throw new TypeError("Client setResponseExpectedByTimeoutMilliseconds, parameter responseExpectedByTimeoutMilliseconds expected to be typeof number but found "+typeof e+".");if(e%1!=0)throw new TypeError("Client setResponseExpectedByTimeoutMilliseconds, parameter responseExpectedByTimeoutMilliseconds expected to be integer but found "+e+".");this._responseExpectedByTimeoutMilliseconds=e},t.Client=o;var i=n(2).Connection},function(e,t,n){var o=n(3).Thread;function i(e,t,n){this._pingClient=null,this._connectionRetryThread=null,this._currentConnectionRetriesLeft=null,this._maxConnectionRetries=null,this._isConnectionOpen=!1,null==n&&(n=1),this._setPingClient(e),this._setConnectionRetryThread(t),this.setCurrentConnectionRetriesLeft(n),this.setMaxConnectionRetries(n)}i.prototype.openNewConnection=function(){throw new Error("Connection openNewConnection, abstract method openNewConnection stands as placeholder to be replaced/overridden in subclasses and as such should not be called without first being overridden.")},i.prototype.closeCurrentConnection=function(){throw new Error("Connection closeCurrentConnection, abstract method closeCurrentConnection stands as a placeholder to be repalaced/overridden in subclasses and as such should not be called without first being overridden.")},i.prototype.getIsConnectionOpen=function(){return this._isConnectionOpen},i.prototype._setIsConnectionOpen=function(e){if("boolean"!=typeof e)throw new TypeError("Connection _setIsConnectionOpen, expected parameter isConnectionOpen to be typeof boolean but found "+typeof e+".");this._isConnectionOpen=e},i.prototype._getPingClient=function(){return this._pingClient},i.prototype._setPingClient=function(e){if(!(e instanceof r))throw new TypeError("Connection _setPingClient, expected parameter pingClient to be instanceof Connection.");this._pingClient=e},i.prototype.getConnectionRetryThread=function(){return this._connectionRetryThread},i.prototype._setConnectionRetryThread=function(e){if(!(e instanceof o))throw new TypeError("Connection _setConnectionRetryThread, expected parameter connectionRetryThread to be instanceof Thread.");this._connectionRetryThread=e},i.prototype.getCurrentConnectionRetriesLeft=function(){return this._currentConnectionRetriesLeft},i.prototype.setCurrentConnectionRetriesLeft=function(e){if("number"!=typeof e)throw new TypeError("Connection setCurrentConnectionRetriesLeft, expected parameter currentConnectionRetriesLeft to be typeof number but found "+typeof e+".");if(e%1!=0)throw new TypeError("Connection setCurrentConnectionRetriesLeft, expected parameter to be integer but found "+e+".");this._currentConnectionRetriesLeft=e},i.prototype.getMaxConnectionRetries=function(){return this._maxConnectionRetries},i.prototype.setMaxConnectionRetries=function(e){if("number"!=typeof e)throw new TypeError("Connection setMaxConnectionRetries, expected parameter maxConnectionRetries to be typeof number but found "+typeof e+".");if(e%1!=0)throw new TypeError("Connection setMaxConnectionRetries, expected parameter maxConnectionRetries to be integer but found "+e+".");this._maxConnectionRetries=e},t.Connection=i;var r=n(1).Client},function(e,t){function n(e){this.POSSIBLE_STATES=Object.freeze({IS_RUNNING:"IS_RUNNING",STOPPED:"STOPPED"}),this._state=null,this._codeToBeExecuted=null,this._setState(this.POSSIBLE_STATES.STOPPED),this._setCodeToBeExecuted(e)}n.prototype.start=function(){throw new Error("Thread start, this method stands as a template from the base class Thread it must be replaced/overridden before it is able to be used.")},n.prototype.stop=function(){throw new Error("Thread stop, this method stands as a template from the base class Thread it must be replaced/overridden before it is able to be used.")},n.prototype.getState=function(){return this._state},n.prototype._setState=function(e){if(null==this.POSSIBLE_STATES[e])throw Error("Thread _setState, this method expects the parameter state to contain a constant from POSSIBLE_STATES object.");this._state=e},n.prototype._getCodeToBeExecuted=function(){return this._codeToBeExecuted},n.prototype._setCodeToBeExecuted=function(e){if(!(e instanceof Object))throw new TypeError("Thread _setCodeToBeExecuted, expected parameter codeToBeExecuted to be instanceof Object.");this._codeToBeExecuted=e},t.Thread=n},function(e,t,n){var o=n(8).Action;function i(e,t){this._action=null,this._messageSignature=null,null==e&&(e=new o),null==t&&(t=0),this.setAction(e),this.setMessageSignature(t)}i.prototype.toJsonFormat=function(){return{action:this.getAction().toJsonFormat(),messageSignature:this.getMessageSignature()}},i.prototype.fromJsonFormat=function(e){var t=new o;t.fromJsonFormat(e.action),this.setAction(t),this.setMessageSignature(e.messageSignature)},i.prototype.getAction=function(){return this._action},i.prototype.setAction=function(e){if(!(e instanceof o))throw new TypeError("Message setAction, expected parameter to be instance of Action.");this._action=e},i.prototype.getMessageSignature=function(){return this._messageSignature},i.prototype.setMessageSignature=function(e){if("number"!=typeof e)throw new TypeError("Message _setMessageSignature, expected parameter messageSignature to be typeof 'number' but found "+typeof e);if(e%1!=0)throw new TypeError("Message _setMessageSignature, exepected parameter messageSignature to be integer but found float.");this._messageSignature=e},t.Message=i},function(e,t){function n(){}n.prototype.finishBuild=function(){throw new Error("Builder finishBuild, this method of base class stands as a abstract method not to be called but to be replaced/overidden.")},t.Builder=n},function(e,t,n){var o=n(5).Builder,i=n(0).ChainLink;function r(){o.call(this),this._chain=[]}r.prototype=Object.create(o.prototype),r.prototype.constructor=r,r.prototype.attachChainLink=function(e){if(e instanceof i)return this._chain.push(e),this;throw new TypeError("ChainBuilder attachChainLink, parameter chainLink expected to be instanceof ChainLink")},r.prototype.finishBuild=function(){var e=this._chain;return this._chain=[],e},t.ChainBuilder=r},function(e,t,n){var o=n(1).Client,i=n(4).Message;function r(e,t){o.call(this,e,t),this._previousMessageSignature=null;try{this._setupMessageResponseListener()}catch(e){console.log(e)}}r.prototype=Object.create(o.prototype),r.prototype.constructor=r,r.prototype._setupMessageResponseListener=function(){window.addEventListener("message",function(e){e.origin===this.getClientConnection().getChildBrowsingContextCurrentOrigin()&&e.data.messageSignature===this.getPreviousMessageSignature()&&(this._setResponse(e.data),this._setPreviousMessageSignature(null))}.bind(this))},r.prototype.sendMessage=function(e){if(!this.sendMessagePreChecks(e))throw new Error("WebsitePageFrameClient sendMessage, sendMessagePreChecks returned false meaning that message was not able to be sent.");this._setResponse(null),this._setPreviousMessageSignature(e.getMessageSignature()),this.getClientConnection().getChildBrowsingContext().postMessage(e.toJsonFormat(),this.getClientConnection().getChildBrowsingContextCurrentOrigin()),setTimeout(function(e){if(null===this.getResponse()&&e===this.getPreviousMessageSignature())throw this._setPreviousMessageSignature(null),new Error("WebsitePageFrameClient.sendMessage, response expected within "+this.getResponseExpectedByTimeoutMilliseconds()+" milliseconds was not returned.")}.bind(this,this.getPreviousMessageSignature()),this.getResponseExpectedByTimeoutMilliseconds())},r.prototype.sendMessagePreChecks=function(e){return e instanceof i&&null===this._previousMessageSignature&&this.isConnectionReady()},r.prototype.setClientConnection=function(e){if(!(e instanceof s||null===e))throw new TypeError("WebsitePageFrameClient setClientConnection, parameter websitePageFrameClientConnection expected to be instanceof WebsitePageFrameConnection.");this._clientConnection=e},r.prototype.getPreviousMessageSignature=function(){return this._previousMessageSignature},r.prototype._setPreviousMessageSignature=function(e){if("number"!=typeof e&&null!==e)throw new TypeError("WebsitePageFrameClient _setPreviousMessageSignature, parameter previousMessageSignature expected to be typeof number or null but found "+typeof e+".");if(e%1!=0)throw new TypeError("WebsitePageFrameClient _setPreviousMessageSignature, parameter previousMessageSignature to be integer but found "+e);this._previousMessageSignature=e},t.WebsitePageFrameClient=r;var s=n(9).WebsitePageFrameConnection},function(e,t){function n(e,t,n){this._actionParameters=null,this._actionArguements=null,this._actionBody=null,null==e&&(e=[]),null==t&&(t=[]),null==n&&(n=function(){}),this.setActionParameters(e),this.setActionArguements(t),this.setActionBody(n)}n.prototype.getActionParameters=function(){return this._actionParameters},n.prototype.setActionParameters=function(e){this._actionParameters=e},n.prototype.getActionArguements=function(){return this._actionArguements},n.prototype.setActionArguements=function(e){this._actionArguements=e},n.prototype.getActionBody=function(){return this._actionBody},n.prototype.setActionBody=function(e){if(!(e instanceof Function))throw new Error("Action.setActionBody method parameter actionBody must an instance of type Function");this._actionBody="("+e+")()"},n.prototype.toJsonFormat=function(){return{actionParameters:this.getActionParameters(),actionArguements:this.getActionArguements(),actionBody:this.getActionBody()}},n.prototype.fromJsonFormat=function(e){this.setActionParameters(e.actionParameters),this.setActionArguements(e.actionArguements);this.setActionBody((function(){}))},t.Action=n},function(e,t,n){var o=n(2).Connection,i=n(10).BrowserThread,r=n(11).WebsitePageFrameMessageBuilder,s=function(){if(0===this.getCurrentConnectionRetriesLeft())throw this.getConnectionRetryThread().stop(),this.setCurrentConnectionRetriesLeft(this.getMaxConnectionRetries()),new Error("WebsitePageFrameConnection openNewConnection, currentConnectionRetriesLeft is 0 unable to successfully open connection.");var e=new r;this._getPingClient().sendMessage(e.finishBuild()),setTimeout(function(){null!==this._getPingClient().getResponse()?(this._setIsConnectionOpen(!0),this.setCurrentConnectionRetriesLeft(this.getMaxConnectionRetries())):(this.getIsConnectionOpen()&&this._setIsConnectionOpen(!1),this.setCurrentConnectionRetriesLeft(this.getCurrentConnectionRetriesLeft()-1))}.bind(this),800)};function a(e,t,n){o.call(this,new c,new i(s.bind(this),900),n),this._WEBSITE_URL_UNIQUE_FRAGEMENT="websitePageFrame",this._childBrowsingContextCurrentOrigin="",this._childBrowsingContextInitialURL="",this._childBrowsingContext=null,null!=e&&this.updateChildBrowsingContextCurrentLocationInformation(e),null==t&&(t=null),this.setChildBrowsingContext(t),this._getPingClient().setClientConnection(this)}a.prototype=Object.create(o.prototype),a.prototype.constructor=a,a.prototype.openNewConnection=function(){if(0===this._childBrowsingContextInitialURL.trim().length)throw new Error("WebsitePageFrameConnection openNewConnection, expected childBrowsingContextInitialURL to not be empty, opening a connection to url empty is of no use and wasteful.");(this.getIsConnectionOpen()||this.getConnectionRetryThread().getState()===this.getConnectionRetryThread().POSSIBLE_STATES.IS_RUNNING)&&this.closeCurrentConnection(),this.getChildBrowsingContext().location.replace(this._childBrowsingContextInitialURL+"#"+this._WEBSITE_URL_UNIQUE_FRAGEMENT),this.getConnectionRetryThread().start()},a.prototype.closeCurrentConnection=function(){this.getConnectionRetryThread().getState()===this.getConnectionRetryThread().POSSIBLE_STATES.IS_RUNNING&&this.getConnectionRetryThread().stop(),this.getIsConnectionOpen()&&this._setIsConnectionOpen(!1),this.getChildBrowsingContext().location.replace(""),ipcRendererClearCache()},a.prototype.updateChildBrowsingContextCurrentLocationInformation=function(e){if("string"!=typeof e)throw new TypeError("WebsitePageFrameConnection updateChildBrowsingContextCurrentLocationInformation, expected parameter childBrowsingContextInitialURL to be typeof string but found "+typeof e+".");var t=e.split("/",3)[0]+"//"+e.split("/",3)[2];this._childBrowsingContextInitialURL=e,this._childBrowsingContextCurrentOrigin=t},a.prototype._setPingClient=function(e){if(!(e instanceof c))throw new TypeError("WebsitePageFrameConnection _setPingClient, parameter pingClient expected to be instanceof WebsitePageFrameClient.");this._pingClient=e},a.prototype._setConnectionRetryThread=function(e){if(!(e instanceof i))throw new TypeError("WebsitePageFrameConnection _setConnectionRetryThread, parameter expected to be instanceof BrowserThread.");this._connectionRetryThread=e},a.prototype.getWebsiteUrlUniqueFragment=function(){return this._WEBSITE_URL_UNIQUE_FRAGEMENT},a.prototype.getChildBrowsingContextCurrentOrigin=function(){return this._childBrowsingContextCurrentOrigin},a.prototype.getChildBrowsingContextInitialURL=function(){return this._childBrowsingContextInitialURL},a.prototype.getChildBrowsingContext=function(){return this._childBrowsingContext},a.prototype.setChildBrowsingContext=function(e){if("object"!=typeof e&&null!==e)throw new TypeError("WebsitePageFrameConnection setChildBrowsingContext, expected parameter childBrowsingContext to be typeof object or null.");this._childBrowsingContext=e},t.WebsitePageFrameConnection=a;var c=n(13).WebsitePageFramePingClient},function(e,t,n){var o=n(3).Thread;function i(e,t){o.call(this,e),this._codeExecutingIntervalId=null,this._codeIsToBeExecutedEveryXMilliseconds=null,null==t&&(t=1e3),this.setCodeIsToBeExecutedEveryXMilliseconds(t)}i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.start=function(){if(this.getState()!==this.POSSIBLE_STATES.STOPPED||null!==this._getCodeExecutingIntervalId())throw new Error("BrowserThread start, thread is already in a running state.");this._setCodeExecutingIntervalId(setInterval(this._getCodeToBeExecuted(),this.getCodeIsToBeExecutedEveryXMilliseconds())),this._setState(this.POSSIBLE_STATES.IS_RUNNING)},i.prototype.stop=function(){if(this.getState()!==this.POSSIBLE_STATES.IS_RUNNING)throw new Error("BrowserThread stop, thread is already in a stopped state.");clearInterval(this._getCodeExecutingIntervalId()),this._setCodeExecutingIntervalId(null),this._setState(this.POSSIBLE_STATES.STOPPED)},i.prototype._setCodeToBeExecuted=function(e){if(!(e instanceof Function))throw new TypeError("BrowserThread _setCodeToBeExecuted, parameter codeToBeExecuted expected to be instanceof Function.");this._codeToBeExecuted=e},i.prototype._getCodeExecutingIntervalId=function(){return this._codeExecutingIntervalId},i.prototype._setCodeExecutingIntervalId=function(e){if("number"!=typeof e&&null!==e)throw new TypeError("BrowserThread _setCodeExecutingIntervalId, parameter codeExecutingIntervalId expected to be typeof number or null but found "+typeof e+".");this._codeExecutingIntervalId=e},i.prototype.getCodeIsToBeExecutedEveryXMilliseconds=function(){return this._codeIsToBeExecutedEveryXMilliseconds},i.prototype.setCodeIsToBeExecutedEveryXMilliseconds=function(e){if("number"!=typeof e)throw new TypeError("BrowserThread _setCodeIsToBeExecutedEveryXMilliseconds, expected parameter codeIsToBeExecutedEveryXMilliseconds to be typeof number but found "+typeof e+".");if(e%1!=0)throw new TypeError("BrowserThread _setCodeIsToBeExecutedEveryXMilliseconds, expected parameter codeIsToBeExecutedEveryXMilliseconds to be  a integer but found "+e+".");this._codeIsToBeExecutedEveryXMilliseconds=e},t.BrowserThread=i},function(e,t,n){var o=n(12).MessageBuilder;function i(){o.call(this,(function(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}))}i.prototype=Object.create(o.prototype),i.prototype.constructor=i,t.WebsitePageFrameMessageBuilder=i},function(e,t,n){var o=n(5).Builder,i=n(4).Message;function r(e){o.call(this),this._messageSignatureGenerator=null,this._setMessageSignatureGenerator(e),this._messageBeingBuilt=new i(null,this._messageSignatureGenerator())}r.prototype=Object.create(o),r.prototype.constructor=r,r.prototype._setMessageSignatureGenerator=function(e){if(!(e instanceof Function))throw new TypeError("MessageBuilder _setMessageSignatureGenerator, expected parameter messageSignatureGenerator to be instanceof Function.");this._messageSignatureGenerator=e},r.prototype.attachAction=function(e){return this._messageBeingBuilt.setAction(e),this},r.prototype.finishBuild=function(){var e=this._messageBeingBuilt;return this._messageBeingBuilt=new i(null,this._messageSignatureGenerator()),e},t.MessageBuilder=r},function(e,t,n){var o=n(7).WebsitePageFrameClient;function i(){o.call(this)}i.prototype=Object.create(o.prototype),i.prototype.constructor=i,i.prototype.sendMessagePreChecks=function(e){return!0},t.WebsitePageFramePingClient=i},function(e,t,n){var o=n(0).ChainLink,i=n(15).TaskChainBuilder;function r(e){o.call(this),this._taskChain=null,null==e&&(e=new i),this.setTaskChain(e)}r.prototype=Object.create(o.prototype),r.prototype.constructor=r,r.prototype.getTaskChain=function(){return this._taskChain},r.prototype.setTaskChain=function(e){if(!(e instanceof i))throw new TypeError("ResponsibilityChainLink setTaskChain, expected parameter taskChainBuilder to be instanceof TaskChainBuilder.");this._taskChain=e.finishBuild()},r.prototype.checkIfResponsible=function(){throw new Error("ResponsibilityChainLink checkIfResponsible, this method is an abstract method and must be overridden.")},r.prototype.handleResponsibility=function(){throw new Error("ResponsibilityChainLink handleResponsibility, this method is a abatract method and must be overridden.")},t.ResponsibilityChainLink=r},function(e,t,n){var o=n(16).TaskChainLink,i=n(6).ChainBuilder;function r(){i.call(this)}r.prototype=Object.create(i.prototype),r.prototype.constructor=r,r.prototype.attachChainLink=function(e){if(e instanceof o)return this._chain.push(e),this;throw new TypeError("TaskChainBuilder attachChainLink, expected parameter taskChainLink to be instanceof TaskChainLink.")},t.TaskChainBuilder=r},function(e,t,n){var o=n(0).ChainLink;function i(){o.call(this)}i.prototype=Object.create(i.prototype),i.prototype.constructor=i,i.prototype.preformTask=function(){throw new Error("TaskChainLink preformTask, this is an abstract method and as such cannot be called, it should be supplied implemntation through TaskChainLinks subclasses.")},t.TaskChainLink=i},function(e,t,n){var o=n(7).WebsitePageFrameClient,i=n(13).WebsitePageFramePingClient,r=n(1).Client,s=n(9).WebsitePageFrameConnection,a=n(2).Connection,c=n(11).WebsitePageFrameMessageBuilder,u=n(12).MessageBuilder,p=n(18).ResponsibilityChainBuilder,h=n(15).TaskChainBuilder,l=n(6).ChainBuilder,d=n(5).Builder,g=n(10).BrowserThread,f=n(3).Thread,C=n(4).Message,y=n(8).Action,b=n(19).Map,m=n(14).ResponsibilityChainLink,w=n(16).TaskChainLink,_=n(0).ChainLink;t.WebsitePageFrameClient=o,t.WebsitePageFramePingClient=i,t.Client=r,t.WebsitePageFrameConnection=s,t.Connection=a,t.WebsitePageFrameMessageBuilder=c,t.MessageBuilder=u,t.ResponsibilityChainBuilder=p,t.TaskChainBuilder=h,t.ChainBuilder=l,t.Builder=d,t.BrowserThread=g,t.Thread=f,t.Message=C,t.Action=y,t.Map=b,t.ResponsibilityChainLink=m,t.TaskChainLink=w,t.ChainLink=_},function(e,t,n){var o=n(6).ChainBuilder,i=n(14).ResponsibilityChainLink;function r(){o.call(this)}r.prototype=Object.create(o.prototype),r.prototype.constructor=r,r.prototype.attachChainLink=function(e){if(e instanceof i)return this._chain.push(e),this;throw new TypeError("ResponsibilityChainBuilder attachChainLink, expected parameter responsibilityChainLink to be instanceof  ResponsibilityChainLink.")},t.ResponsibilityChainBuilder=r},function(e,t){function n(){}n.prototype.get=function(e){throw new Error("Map get, this is a abstract method being called which must be ovverridden before use.")},n.prototype.set=function(e,t){throw new Error("Map set, this is a abstract method being called which must be ovverridden before use.")},n.prototype.remove=function(e){throw new Error("Map remove, this is a abstract method being called which must be ovverridden before use.")},n.prototype.has=function(e){throw new Error("Map has, this is a abstract method being called which must be ovverridden before use.")},n.prototype._prepareValidKey=function(e){throw new Error("Map _prepareValidKey, this is a abstract method being called which must be ovverridden before use.")},t.Map=n}]);