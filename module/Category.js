const mongoose = require('mongoose');


const SliderSchema = mongoose.Schema({
    Category_Name: String,
    status: Boolean,
    date: String
});


const slider = mongoose.model('slider', SliderSchema);

module.exports = slider