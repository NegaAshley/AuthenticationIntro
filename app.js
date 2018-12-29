var express                     = require("express"),
        app                     = express(),
        mongoose                = require("mongoose"),
        passport                = require("passport"),
        bodyParser              = require("body-parser"),
        LocalStrategy           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose"),
        user                    = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");
app.set("view engine", "ejs");
app.use(passport.initalize());
app.use(passport.session());

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

app.listen(process.env.PORT, process.env.IP);