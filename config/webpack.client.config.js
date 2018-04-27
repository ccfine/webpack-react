const path = require("path")
const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const NameAllModulesPlugin = require("name-all-modules-plugin")
const commonConfig = require("./webpack.common.config.js")

const isDev = process.env.NODE_ENV === "development"

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
})

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
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
} else {
  config.entry = {
    index: path.join(__dirname, "../src/index.js"),
    vendor: [ "react", "react-dom", "react-router-dom", "redux", "react-redux", "react-thunk", "axios" ]
  }
  config.output.filename = "[name].[chunkhash].js"
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    new webpack.NamedModulesPlugin(),
    new NameAllModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join("_")
    })
  )
}

module.exports = config
