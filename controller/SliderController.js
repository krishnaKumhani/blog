const { Admin } = require("mongodb");
const Slider = require("../module/Slider")



module.exports.addslider = async (req, res) => {
    return res.render("add_slider")
}

module.exports.insertsliderData = async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    try {
        if (req.file) {
            var img = "";
            img = Slider.ipath + "/" + req.file.filename
            req.body.SliderImage = img;

            const data = await Slider.create(req.body);
            if (data) {
                req.flash("success", "Slider data is Inserts");
                return res.redirect("back")
            }
            else {
                req.flash("error", "Slider data is not insert");
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

module.exports.viewslider = async (req, res) => {

    var search = "";

    if (req.query.search) {
        search = req.query.search
    }

    var page = 0;
    var per_page = 1;

    if (req.query.page) {
        page = req.query.page
    }

    let sliderData = await Slider.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
            { link: { $regex: search, $options: "i" } },
        ]
    })
        .skip(per_page * page)
        .limit(per_page)

    let totalrecord = await Slider.find({}).countDocuments();
    let totalpage = Math.ceil(totalrecord / per_page);
    return res.render("view_slider",
        {
            sliderData,
            search: search,
            totalpage: totalpage
        });
}