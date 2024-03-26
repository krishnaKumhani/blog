const express = require('express');

const Slider = require("../module/Slider")

const routs = express.Router();

const slidercon = require("../controller/SliderController");

routs.get("/addslider", slidercon.addslider);

routs.post("/insertsliderData", Slider.uploadImage, slidercon.insertsliderData)

routs.get("/viewslider", slidercon.viewslider);
console.log("path on is");

module.exports = routs;