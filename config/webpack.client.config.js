const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const config = {
  entry: {
    index: path.join(__dirname, "../src/index.js")
  },
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/public/",
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        include: path.join(__dirname, "../src")
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "../src/index.html")
    })
  ]
};

if (isDev) {
  config.entry = {
    index: [
      "react-hot-loader/patch",
      path.join(__dirname, "../src/index.js")
    ]
  }
  config.devServer = {
    host: "0.0.0.0",
    port: "8080",
    contentBase: path.join(__dirname, "../dist"),
    hot: true,
    overlay: {
      errors: true
    },
    publicPath: "/public",
    historyApiFallback: {
      index: "/public/index.html"
    }
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;