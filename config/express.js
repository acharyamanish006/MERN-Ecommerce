const express = require("express");
const app = express();
const json_converter = express.json();

module.exports = { app, json_converter };
