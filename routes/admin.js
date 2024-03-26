const Admin = require('../module/Admin')

const express = require('express');
const passport = require('passport')

const routs = express.Router();

const Admincrl = require("../controller/adminController");


routs.get("/", Admincrl.login);
routs.post("/checklogin", passport.authenticate('local', { failureRedirect: '/admin/' }), Admincrl.checklogin);
routs.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            req.flash("error", "something is worng");
            return res.redirect('back');
        }
        else {
            return res.redirect("/admin/")
        }
    })
});
routs.get("/profile", passport.checkeAuth, Admincrl.profile);
routs.get("/changepassword", Admincrl.changepassword);
routs.post("/changepass", Admincrl.changepass);
routs.get("/dashboard", passport.checkeAuth, Admincrl.dashboard)
routs.get("/add_admin", passport.checkeAuth, Admincrl.addadmin)
routs.get("/view_admin", passport.checkeAuth, Admincrl.viewadmin)
routs.post("/insertAdminData", Admin.uploadImage, Admincrl.insertAdminData);
routs.get("/deleteAdmin", Admincrl.deleteAdmin);
routs.get("/updateAdmin", passport.checkeAuth, Admincrl.updateAdmin);
routs.post("/editAdmin", Admin.uploadImage, Admincrl.editAdmin);


/// code for forgetpassword
routs.get("/forgetpass", Admincrl.forgetpass);
routs.post("/verifyEmail", Admincrl.verifyEmail);
routs.get("/otppage", Admincrl.otppage);
routs.post("/verifyotp", Admincrl.verifyotp);
routs.get("/resetpass", Admincrl.resetpass);
routs.post("/resetAdminPass", Admincrl.resetAdminPass);
/// end code for forgetpassword


routs.use("/slider", passport.checkeAuth, require("./slider"))
routs.use("/offer", passport.checkeAuth, require("./offer"))
routs.use("/posts", passport.checkeAuth, require("./post"))
routs.use("/photo", passport.checkeAuth, require("./photo"))
routs.use("/review", passport.checkeAuth, require("./review"))
routs.use("/category", passport.checkeAuth, require("./category"));

console.log("path is");

module.exports = routs;