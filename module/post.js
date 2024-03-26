const mongoose = require('mongoose');

const multer = require('multer');

const ImgPath = '/upload/post';

const path = require('path');

const postSchema = mongoose.Schema({
    title: String,
    category: String,
    message: String,
    PostImage: String,
    username: String,
    date: String
});

const stAdmin = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, path.join(__dirname, "..", ImgPath))
    },
    filename: function (req, file, cd) {
        cd(null, file.fieldname + "-" + Date.now())
    }
})
postSchema.statics.uploadImage = multer({ storage: stAdmin }).single('PostImage');
postSchema.statics.ipath = ImgPath;

const post = mongoose.model('post', postSchema);

module.exports = post