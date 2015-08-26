'use strict';

var express = require('express');
var controller = require('user/controllers/auth');
var passport = require('passport');

var router = express.Router();

// User Sign up
router.get('/signup', controller.signup);
router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/user/signup'
    })
);

// Login
router.get('/login', controller.login);
router.post('/login', passport.authenticate('local-login'), function(req, res) {
    res.redirect(req.session.returnTo || '/');
});

// Logout
router.get('/logout', controller.logout);

module.exports = router;