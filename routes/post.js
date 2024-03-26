const express = require('express');

const routs = express.Router();

const post = require("../module/post")

const postcon = require("../controller/Postcontroller");

routs.get("/addpost", postcon.addpost);

routs.post("/insertpostData", post.uploadImage, postcon.insertpostData);

routs.get("/viewpost", postcon.viewpost);


console.log("path ohh");

module.exports = routs;