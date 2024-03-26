const express = require('express');

const routs = express.Router();

const usercon = require("../controller/userController")

routs.get("/", usercon.home);
routs.get("/blogSingle/:id", usercon.blogSingle)

console.log("path on");

module.exports = routs;