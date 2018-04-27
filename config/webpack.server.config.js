const path = require("path")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const baseConfig = require("./webpack.base.config.js")

module.exports = webpackMerge(baseConfig, {
  target: "node",
  entry: path.join(__dirname, "../src/server.entry.js"),
  output: {
    filename: "server.entry.js",
    libraryTarget: "commonjs2"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_BASE": "http://127.0.0.1:3000"
    })
  ]
})
