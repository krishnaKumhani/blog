const mongoose = require('mongoose');

const multer = require('multer');

const ImgPath = '/upload/photoImg';

const path = require('path');

const photoSchema = mongoose.Schema({
    title: String,
    message: String,
    photoImage: String
});

const stAdmin = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, path.join(__dirname, "..", ImgPath))
    },
    filename: function (req, file, cd) {
        cd(null, file.fieldname + "-" + Date.now())
    }
})
photoSchema.statics.uploadImage = multer({ storage: stAdmin }).single('photoImage');
photoSchema.statics.ipath = ImgPath;

const photo = mongoose.model('photo', photoSchema);

module.exports = photo