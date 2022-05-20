const express = require("express");
const path = require("path");

const app = express();

// paths
const staticPath = path.join(__dirname,"../public");

// middlewares
app.use(express.static(staticPath));

module.exports = app;