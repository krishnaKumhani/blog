const review = require("../module/review");

module.exports.addreview = async (req, res) => {
    return res.render("add_review");
}

module.exports.inserreviewData = async (req, res) => {
    try {
        console.log(req.body);
        const data = await review.create(req.body);
        if (data) {
            req.flash("success", "review data is Inserts");
            return res.redirect("back")
        }
        else {
            req.flash("error", "review data is not insert");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log("Something is wrong");
        req.flash('error', "Data isn't insert this form");
        return res.redirect("back");
    }
}

module.exports.viewreview = async (req, res) => {
    var search = "";

    if (req.query.search) {
        search = req.query.search
    }

    let reviewData = await review.find({
        $or: [
            { name: { $regex: search, $options: "i" } },
        ]
    });
    return res.render("view_review",
        {
            reviewData,
            search: search
        });
}