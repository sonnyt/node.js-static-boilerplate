'use strict';

var Controllers = {};

Controllers.signup = function(req, res) {
    res.render('app/user/signup.html');
};

Controllers.login = function(req, res) {
    res.render('app/user/login.html');
};

Controllers.logout = function(req, res) {
    req.logout();
    res.redirect('/');

    delete res.locals.user;
};

module.exports = Controllers;