var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//models required for mongoose
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
//scraping tools
var request = require("request");
var cheerio = require("cheerio");
var logger = require("morgan");
//set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//Lets initialize Express
var app = express ();

//we use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));

//Make public a static dir
app.use(express.static(process.cwd() +"/public"));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
//config DB w/ Mongoose
//WE NEED TO GENERATE THE CONNECTION FOR HEROKU WITH CLI
mongoose.connect("mongodb://localhost/mongo-scraper");
var db = mongoose.connection;

//show errors
db.on("error", function(err){
	console.log("Mongoose Error: ", err);
});
db.once("open", function(){
	console.log("Mongoose connection a success!");
});


var router = require('./routes.js');
app.use('/', router);
 
var PORT = process.env.PORT || 3000
app.listen(PORT, function(){
	console.log("Listening at Port " + PORT)
});