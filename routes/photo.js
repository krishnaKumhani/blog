const express = require('express');

const routs = express.Router();

const photocon = require("../controller/photoController");

const photo = require("../module/photo")

routs.get("/addphotos", photocon.addphotos);
routs.post("/insertphotoData", photo.uploadImage, photocon.insertphotoData);
routs.get("/viewphotos", photocon.viewphotos)

console.log("path fffff");

module.exports = routs;