const photo = require("../module/photo")

module.exports.addphotos = async (req, res) => {
    return res.render("add_photo")
}

module.exports.insertphotoData = async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    try {
        if (req.file) {
            var img = "";
            img = photo.ipath + "/" + req.file.filename
            req.body.photoImage = img;

            const data = await photo.create(req.body);
            if (data) {
                req.flash("success", "photo data is Inserts");
                return res.redirect("back")
            }
            else {
                req.flash("error", "photo data is not insert");
                return res.redirect("back")
            }
        }
    }
    catch (err) {
        console.log("something is wrong");
        req.flash('error', "Data isn't insert this form");
        return res.redirect("back");
    }
}

module.exports.viewphotos = async (req, res) => {

    var search = "";

    if (req.query.search) {
        search = req.query.search
    }

    let photoData = await photo.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
        ]
    });
    return res.render("view_photo",
        {
            photoData,
            search: search
        });
}