var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    user                    = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");

app.use(require("express-session")({
    secret: "Meepo is the best and cutest cat in the world",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// =======
// ROUTES
// =======

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

// Auth Routes

//Show sign up form
app.get("/register", function(req, res){
    res.render("register");
});

//Handle user signup
app.post("/register", function(req, res){
    res.send("Register post route");
});

app.listen(process.env.PORT, process.env.IP);