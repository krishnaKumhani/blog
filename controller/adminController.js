const Admin = require("../module/Admin");

const path = require('path');

const fs = require('fs');
const nodemailer = require("nodemailer");


module.exports.login = async (req, res) => {
    return res.render("login")
}

module.exports.checklogin = async (req, res) => {
    try {
        req.flash('success', "Login success");
        return res.redirect("/admin/dashboard")
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.profile = async (req, res) => {
    console.log("profile");
    return res.render("profile")
}

module.exports.changepassword = async (req, res) => {
    try {
        return res.render("changepassword")
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.changepass = async (req, res) => {
    try {
        if (req.body.cpass == req.user.password) {
            console.log(req.user.password);
            console.log(req.body.cpass);
            if (req.body.cpass != req.body.npass) {
                console.log(req.body.npass)
                if (req.body.npass == req.body.copass) {
                    console.log(req.body.copass);
                    let checkepass = await Admin.findByIdAndUpdate(req.user.id,
                        {
                            password: req.body.npass
                        });
                    if (checkepass) {
                        req.flash('success', "Password change success :)")
                        return res.redirect("/admin/logout");
                    }
                    else {
                        return res.redirect('back');
                    }
                }
                else {
                    req.flash("error", "New password and Confirm password are not same :(");
                    return res.redirect('back');
                }
            }
            else {
                req.flash("error", "Current password and New password are same :(");
                return res.redirect('back');
            }
        }
        else {
            req.flash("error", "Current password and DB password are not same :(");
            return res.redirect('back');
        }
    }
    catch (err) {
        req.flash("error", "some thing is worng :(");
        return res.redirect('back')
    }
}

module.exports.dashboard = (req, res) => {
    console.log("Dashboard");
    return res.render("dashboard")
}
module.exports.addadmin = (req, res) => {
    console.log("Add_Admin");
    return res.render("add_admin")
}

module.exports.viewadmin = async (req, res) => {
    console.log("View_Admin");

    try {
        console.log("Image and date view");

        var search = "";

        if (req.query.search) {
            search = req.query.search
        }

        var page = 0;
        var per_page = 2;
        if (req.query.page) {
            page = req.query.page;
        }

        const viewdata = await Admin.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ]
        })
            .skip(per_page * page)
            .limit(per_page);

        let total = await Admin.find({}).countDocuments();
        let totalpage = Math.ceil(total / per_page);
        return res.render("view_admin",
            {
                AdminData: viewdata,
                search: search,
                totalpage: totalpage,
                currentpage: page
            });

    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

// inserData
module.exports.insertAdminData = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        console.log("Data and Image connect");
        if (req.file) {
            var img = ''
            img = Admin.ipath + "/" + req.file.filename;
            req.body.image = img;
            req.body.name = req.body.fname + "" + req.body.lname;

            const deleted = await Admin.create(req.body);
            req.flash('success', "Data is insert this form");
            return res.redirect("/admin/add_admin")
        }
        else {
            console.log("Data and Image not connect");
            req.flash('success', "Data isn't insert this form");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        req.flash('error', "Data isn't insert this form");
        return res.redirect('back');
    }
}

// deletedata
module.exports.deleteAdmin = async (req, res) => {
    console.log(req.query.id);
    try {
        console.log("Image and Data Delete");
        let single = await Admin.findById(req.query.id);
        if (single) {
            var imagepath = path.join(__dirname, "..", single.image);
            console.log(imagepath);
            try {
                return fs.unlinkSync(imagepath);
            }
            catch (err) {
                console.log("Not Delete")
            }
            let deleteAdmin = await Admin.findByIdAndDelete(req.query.id);
            if (deleteAdmin) {
                console.log("Delete Your data");
                req.flash('success', "Data is Delete this form");
                return res.redirect('back');
            }
            else {
                console.log("Your Data Not Delete");
                req.flash('success', "Data isn't Delete this form");
                return res.redirect('back')
            }
        }
        else {
            console.log("Image and Data not Delete");
            req.flash('success', "Data isn't Delete this form");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.updateAdmin = async (req, res) => {
    try {
        let single = await Admin.findById(req.query.id);
        if (single) {
            return res.render('update_Admin', {
                singleAdmin: single
            })
        }
        else {
            console.log("Data is Not Upadte");
            req.flash('success', "Data is update this form");
            return res.redirect('back')
        }
    }
    catch (err) {
        console.log(err);
        req.flash('success', "Data isn't update this form");
        return res.redirect('back');
    }
}

module.exports.editAdmin = async (req, res) => {
    try {
        console.log(req.body.editAd);
        console.log(req.file);
        if (req.file) {
            let single = await Admin.findById(req.body.editAd);
            if (single) {
                var imgPath = path.join(__dirname, "..", single.image);
                console.log(imgPath);
                try {
                    await fs.unlinkSync(imgPath);
                }
                catch (err) {
                    console.log(err);
                }
                img = Admin.ipath + "/" + req.file.filename;
                req.body.name = req.body.fname + " " + req.body.lname;
                req.body.image = img;
                let updateA = await Admin.findByIdAndUpdate(req.body.editAd, req.body);
                if (updateA) {
                    console.log("Update is right");
                    return res.redirect("/admin/view_admin");
                }
                else {
                    console.log("Update is Not Right");
                    return res.redirect('back')
                }
            }
        }
        else {
            let single = await Admin.findById(req.body.editAd)
            if (single) {
                req.body.image = single.image;
            }
            req.body.name = req.body.fname + " " + req.body.lname;
            let update = await Admin.findByIdAndUpdate(req.body.editAd, req.body);
            if (update) {
                return res.redirect("/admin/view_admin");
            }
            else {
                return res.redirect('back');
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

/// code for forgetpassword
module.exports.forgetpass = async (req, res) => {
    return res.render("forgetpass")
}

module.exports.verifyEmail = async (req, res) => {
    try {
        let checkemail = await Admin.findOne({ email: req.body.email });
        if (checkemail) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: "kirtipatal1026@gmail.com",
                    pass: "aqigprfnijbvanwz",
                },
            });

            var OTP = Math.round(Math.random() * 100000);
            res.cookie('otp', OTP);
            res.cookie('email', req.body.email);
            var msg = `<b>Hello your Login Gmail OTP : ${OTP}</b>`

            const info = await transporter.sendMail({
                from: "kirtipatal1026@gmail.com", // sender address
                to: req.body.email, // list of receivers
                subject: "forget password  ✔", // Subject line
                text: "Hello world?", // plain text body
                html: msg, // html body
            });
            // console.log("Message sent: %s", info.messageId);
            return res.redirect("/admin/otppage")
        }
        else {
            console.log("Not Email");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}
module.exports.otppage = async (req, res) => {
    try {
        return res.render("otppage")
    }
    catch (err) {
        console.log("something worng");
        return res.redirect('back');
    }
}
module.exports.verifyotp = async (req, res) => {
    try {
        console.log(req.body);
        let otp = req.cookies.otp;
        if (otp == req.body.otp) {
            return res.redirect("/admin/resetpass")
        }
        else {
            console.log("Not Otp");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("something worng");
        return res.redirect('back');
    }
};

module.exports.resetpass = async (req, res) => {
    try {
        return res.render("resetpass")
    }
    catch (err) {
        console.log("something worng");
        return res.redirect('back');
    }
}

module.exports.resetAdminPass = async (req, res) => {
    try {
        if (req.body.npass == req.body.copass) {
            let checkemail = await Admin.findOne({ email: req.cookies.email });
            console.log(req.body)
            if (checkemail) {
                let change = await Admin.findByIdAndUpdate(checkemail.id, {
                    password: req.body.npass
                });
                res.clearCookie('otp')
                res.clearCookie('email')
                return res.redirect("/admin/")
            }
            else {
                console.log("Not Email");
                return res.redirect('back');
            }
        }
        else {
            console.log("not same password");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("something worng");
        return res.redirect('back');
    }
}
/// end code for forgetpassword
