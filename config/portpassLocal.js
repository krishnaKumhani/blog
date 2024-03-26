const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const Admin = require("../module/Admin");

passport.use(new localStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    let checkemail = await Admin.findOne({ email: email });
    if (checkemail) {
        if (checkemail.password == password) {
            return done(null, checkemail);
        }
        else {
            return done(null, false);
        }
    }
    else {
        return done(null, false);
    }
}))

passport.serializeUser(async (user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let checkedata = await Admin.findById(id);
    if (checkedata) {
        return done(null, checkedata);
    }
    else {
        return done(null, false);
    }
});

passport.setAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user
    } next();
}

passport.checkeAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.redirect("/admin/")
    }
}

module.exports = passport