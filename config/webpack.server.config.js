const path = require("path");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common.config.js");

module.exports = webpackMerge(commonConfig, {
  target: "node",
  entry: path.join(__dirname, "../src/server.entry.js"),
  output: {
    filename: "server.entry.js",
    libraryTarget: "commonjs2"
  }
});