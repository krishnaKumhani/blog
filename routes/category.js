const express = require('express');

const routs = express.Router();

const categorycon = require("../controller/categoryCOntroller");

routs.get("/addcategory", categorycon.addcategory);



console.log("path category");

module.exports = routs;