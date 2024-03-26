const express = require('express');

const port = 8011;

const app = express();

const path = require("path");

const passport = require('passport');
const passportlocal = require('passport-local');
const session = require('express-session');

// messageing
const customFlash = require('connect-flash');
// File
const FlashMsg = require("./config/connectFlash");

app.use(customFlash());

const db = require("./config/mongoose");

const pass = require('./config/portpassLocal');

const cp = require('cookie-parser')


app.use(express.urlencoded());
app.use(cp());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'user_assets')));

app.use(session({
    name: "Admin-panal",
    secret: "Admin",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 36000
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuth)
app.use(FlashMsg.setflash);



app.use("/", require("./routes"))

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("server is running on port : ", port)
}) 