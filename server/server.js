const express = require("express");
const fs = require("fs");
const path = require("path");
const favicon = require("serve-favicon");
const ReactSSR = require("react-dom/server");

const app = express();
// app.use(favicon(path.join(__dirname, "favicon.ico")))

const isDev = process.env.NODE_ENV === "development";
if (!isDev) {
  const serverEntry = require("../dist/server.entry.js").default;
  app.use("/public", express.static(path.join(__dirname, "../dist")));
  const templateHTML = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf8");
  app.get("*", (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry);
    res.send(templateHTML.replace("<!-- app -->", appString));
  });
} else {
  const devStatic = require("./util/dev-static.js");
  devStatic(app);
}

const host = process.env.HOST || "0.0.0.0"
const port = process.env.PORT || 9000
app.listen(port, host, () => {
  console.log("server is run on 9000");
});
