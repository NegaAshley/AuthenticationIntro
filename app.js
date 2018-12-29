var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");

app.use(require("express-session")({
    secret: "Meepo is the best and cutest cat in the world",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =======
// ROUTES
// =======

app.get("/", function(req, res){
    res.render("home");
});

//Add isLoggedIn middleware to see if user is logged in,
//which redirects user to login page
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// Auth Routes

//Show sign up form
app.get("/register", function(req, res){
    res.render("register");
});

//Handle user signup
app.post("/register", function(req, res){
    //Hashes password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log("Error creating user!");
            console.log(err);
            return res.render("register");
        }else{
            //Logs user in, takes care of session, runs serialize user method
            //using local strategy
            passport.authenticate("local")(req, res, function(){
               res.redirect("/secret"); 
            });
        }
    });
});

//Login Routes

//Show login form
app.get("/login", function(req, res){
    res.render("login");
});

//Handle user login
//Add Passport middleware to run before final route callback
//This authenticates credentials in request
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}),
function(req, res){
    
});

//Logout Routes

//Show logout form
app.get("/logout", function(req, res){
    //Logs user out - Passport destroys user data in session
    req.logout();
    res.redirect("/");
});

//Uses Passport isAuthenticated to see if user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP);