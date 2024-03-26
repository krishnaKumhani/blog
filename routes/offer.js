const express = require('express');

const routs = express.Router();

const offercon = require("../controller/offerController");

routs.get("/addoffer", offercon.addoffer);
routs.post("/insertofferostData", offercon.insertofferostData);
routs.get("/viewoffer", offercon.viewoffer);

console.log("path oo");

module.exports = routs;