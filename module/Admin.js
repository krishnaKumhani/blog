const mongoose = require('mongoose');

const multer = require('multer');

const ImgPath = '/upload/AdminImg';

const path = require('path');

const AdminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    hobby: Array,
    city: String,
    message: String,
    image: String
});

const stAdmin = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, path.join(__dirname, "..", ImgPath))
    },
    filename: function (req, file, cd) {
        cd(null, file.fieldname + "-" + Date.now())
    }
})
AdminSchema.statics.uploadImage = multer({ storage: stAdmin }).single('image');
AdminSchema.statics.ipath = ImgPath;

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin