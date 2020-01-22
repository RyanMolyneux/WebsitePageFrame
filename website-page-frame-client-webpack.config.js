var path = require("path");

module.exports = {

    mode: "production",
    target: "electron-renderer",
    entry: path.join(__dirname, "index-client.js"),
    output: {
        filename: "client-bundle.js",
        publicPath: path.resolve(__dirname, "dist/"),
        libraryTarget: "var",
        library: "websitePageFrame"
    }

};
