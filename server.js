var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
var history = require("connect-history-api-fallback");

var app = express();
app.use(history());
app.use(serveStatic(path.join(__dirname, "dist")));

var port = process.env.PORT || 8080;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`ADMIN rodando na porta ${port}`));
