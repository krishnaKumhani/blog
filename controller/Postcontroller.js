const posts = require("../module/post");

const moment = require("moment")

module.exports.addpost = async (req, res) => {
    return res.render("add_post");
}

module.exports.insertpostData = async (req, res) => {
    try {
        if (req.file) {
            var img = "";
            img = posts.ipath + "/" + req.file.filename
            req.body.PostImage = img;
            req.body.username = req.user.name;
            req.body.date = moment().format('LLL');

            const data = await posts.create(req.body);
            if (data) {
                req.flash("success", "post data is Inserts");
                return res.redirect("back")
            }
            else {
                req.flash("error", "post data is not insert");
                return res.redirect("back")
            }
        }
    }
    catch (err) {
        console.log("Something is wrong");
        req.flash('error', "Data isn't insert this form");
        return res.redirect("back");
    }

}

module.exports.viewpost = async (req, res) => {
    var search = "";

    if (req.query.search) {
        search = req.query.search
    }

    let postData = await posts.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
            { link: { $regex: search, $options: "i" } },
        ]
    });
    return res.render("view_post",
        {
            postData,
            search: search
        });
}

