const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.common.config.js");

const isDev = process.env.NODE_ENV === "development";

const config = webpackMerge(commonConfig, {
  entry: {
    index: path.join(__dirname, "../src/index.js")
  },
  output: {
    filename: "[name].[hash].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../src/index.html")
    })
  ]
});

if (isDev) {
  config.entry = {
    index: [
      "react-hot-loader/patch",
      path.join(__dirname, "../src/index.js")
    ]
  }
  config.devServer = {
    host: "localhost",
    port: "3000",
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: "/public",
    historyApiFallback: {
      index: "/public/index.html"
    },
    inline: true,
    open: true
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;