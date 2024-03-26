const mongoose = require('mongoose');

const multer = require('multer');

const ImgPath = '/upload/SliderImg';

const path = require('path');

const SliderSchema = mongoose.Schema({
    title: String,
    link: String,
    message: String,
    SliderImage: String
});

const stAdmin = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, path.join(__dirname, "..", ImgPath))
    },
    filename: function (req, file, cd) {
        cd(null, file.fieldname + "-" + Date.now())
    }
})
SliderSchema.statics.uploadImage = multer({ storage: stAdmin }).single('SliderImage');
SliderSchema.statics.ipath = ImgPath;

const slider = mongoose.model('slider', SliderSchema);

module.exports = slider