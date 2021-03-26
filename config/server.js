const express = require("express");
const consign = require("consign");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Inclui arquivos necessarios
consign()
    .include("./app/routes")
    .then("config/dbConn.js")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;
