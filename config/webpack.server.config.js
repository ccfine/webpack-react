const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "node",
  entry: path.join(__dirname, "../src/server.entry.js"),
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/public",
    filename: "server.entry.js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        include: path.join(__dirname, "../src")
      }
    ]
  }
};