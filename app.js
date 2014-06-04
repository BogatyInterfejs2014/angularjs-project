var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var database = require('./config/database'); 

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.use(favicon());
app.use(express.static(path.join(__dirname, 'app')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(require('less-middleware')(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname + "/public"));
//app.use(express.static(__dirname + "/bower_components"));
//app.use("/img", express.static(__dirname + "/public/imgages"));
//app.use("/css", express.static(__dirname + "/public/stylesheets"));
//app.use("/partials", express.static(__dirname + "/public/partials"));


mongoose.connect(database.url);

require('./app/routes.js')(app);


module.exports = app;
