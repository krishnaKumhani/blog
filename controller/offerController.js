const offer = require("../module/offer");


module.exports.addoffer = async (req, res) => {
    return res.render("addoffer")
}

module.exports.insertofferostData = async (req, res) => {
    try {
        console.log(req.body);
        const data = await offer.create(req.body);
        if (data) {
            req.flash("success", "offer data is Inserts");
            return res.redirect("back")
        }
        else {
            req.flash("error", "offer data is not insert");
            return res.redirect("back")
        }
    }
    catch (err) {
        console.log("Something is wrong");
        req.flash('error', "Data isn't insert this form");
        return res.redirect("back");
    }
}

module.exports.viewoffer = async (req, res) => {

    var search = "";

    if (req.query.search) {
        search = req.query.search
    }

    let offerData = await offer.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
        ]
    });
    return res.render("view_offer",
        {
            offerData,
            search: search
        });
}