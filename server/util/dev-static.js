const axios = require("axios");
const webpack = require("webpack");
const path = require("path");
const MemoryFs = require("memory-fs");
const proxy = require("http-proxy-middleware");
const ReactSSR = require("react-dom/server");
const serverConfig = require("../../config/webpack.server.config.js");

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:3000/public/index.html")
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
};

const Module = module.constructor;
const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle;
serverCompiler.watch({}, (err, states) => {
  if (err) throw err
  states = states.toJson();
  states.errors.forEach(err => console.error(err));
  states.warnings.forEach(warn => console.warn(warn));

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  );
  const bundle = mfs.readFileSync(bundlePath, "utf-8");
  const m = new Module();
  m._compile(bundle, "server.entry.js");
  serverBundle = m.exports.default;
});

module.exports = app => {
  app.use("/public", proxy({
    target: "http://localhost:3000"
  }));
  app.get("*", (req, res) => {
    getTemplate().then(template => {
      const content = ReactSSR.renderToStrin(serverBundle);
      res.send(template.replace("<!-- app -->", content));
    })
  });
}