var express = require("express");
var app = express();
var mongoose = require("mongoose");
var user = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", function(req, res){
    res.render("secret");
});

app.listen(process.env.PORT, process.env.IP);