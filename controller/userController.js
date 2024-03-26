const Slider = require("../module/Slider");

const post = require("../module/post");

const offer = require("../module/offer");

const photo = require("../module/photo");

const review = require("../module/review")


module.exports.home = async (req, res) => {
    let sliderData = await Slider.find();
    let postData = await post.find();
    let offerData = await offer.find();
    let photoData = await photo.find();
    let reviewData = await review.find();
    return res.render("userViews/home"
        , {
            sliderData,
            postData,
            offerData,
            photoData,
            reviewData
        })
}
module.exports.blogSingle = async (req, res) => {
    let blogdata = await post.findById(req.params.id);
    return res.render("userViews/blogSingle",
        {
            blogData: blogdata
        })
}