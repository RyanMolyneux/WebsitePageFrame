/**
 * NOTE: reference to window is necessary otherwise if using var/let/const
 * these are not accessible from our scripts that we execute.
 */
window.WebsitePageFrameClient = require("../../../src/client/website-page-frame-clients/WebsitePageFrameClient.js").WebsitePageFrameClient;
window.Action = require("../../../src/general/actions/Action.js").Action;
window.Message = require("../../../src/general/messages/Message.js").Message;
