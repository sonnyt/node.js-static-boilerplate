'use strict';

require('app-module-path').addPath(__dirname + '/app');

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var nunjucks = require('nunjucks');
var cookieParser = require('cookie-parser');
var config = require('./config');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(config.mongo.uri, config.mongo.options);

var env = nunjucks.configure(app.get('views'), {
    autoescape: true,
    express: app,
    watch: true
});

require('user/passport/local')();
require('filters')(env);
require('routes')(app);

app.listen(config.port, function() {
    console.log('Server listening on port ' + config.port);
});