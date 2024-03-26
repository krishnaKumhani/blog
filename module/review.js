const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
    icon: String,
    name: String,
    city: String,
    contr: String,
    message: String,
});



const review = mongoose.model('review', reviewSchema);

module.exports = review