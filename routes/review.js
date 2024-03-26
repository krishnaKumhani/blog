const express = require('express');

const routs = express.Router();

const reviewcon = require("../controller/reviewController");

const review = require("../module/review")

routs.get("/addreview", reviewcon.addreview);

routs.post("/inserreviewData", reviewcon.inserreviewData)

routs.get("/viewreview", reviewcon.viewreview)
console.log("path");

module.exports = routs;