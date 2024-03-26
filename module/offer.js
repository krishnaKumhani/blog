const mongoose = require('mongoose');


const offerSchema = mongoose.Schema({
    icon: String,
    title: String,
    message: String,
});



const offer = mongoose.model('offer', offerSchema);

module.exports = offer