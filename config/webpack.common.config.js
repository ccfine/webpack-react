const path = require("path");

module.exports = {
  output: {
    path: path.join(__dirname, "../dist"),
    publicPath: "/public/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        include: path.join(__dirname, "../src")
      }
    ]
  }
};
