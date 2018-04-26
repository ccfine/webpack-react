const express = require("express");
const fs = require("fs");
const path = require("path");
const ReactSSR = require("react-dom/server");
const serverEntry = require("../dist/server.entry.js").default;

const app = express();

app.use("/public", express.static(path.join(__dirname, "../dist")))

const templateHTML = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf8")

app.get("*", (req, res) => {
  const appString = ReactSSR.renderToString(serverEntry);
  res.send(templateHTML.replace("<!-- app -->", appString));
});

app.listen(9000, () => {
  console.log("server is run on 9000");
});