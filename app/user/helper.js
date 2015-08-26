'use strict';

var Helper = {};

Helper.isLoggedIn = function(req, res, next) {
    req.session.returnTo = null;

    if (req.isAuthenticated()) {
        return next();
    }

    if (req.originalUrl) {
        req.session.returnTo = req.originalUrl;
    }

    res.redirect('/user/login');
};

Helper.isAdmin = function(req, res, next) {
    if (req.user.role === 'admin') {
        return next();
    }

    var error = new Error('User is not an admin.');
        error.status = 404;

    return next(error);
};

Helper.isActive = function(req, res, next) {
    if (req.user.status === 'active') {
        return next();
    }

    var error = new Error('User is not active.');
        error.status = 404;

    return next(error);
};

module.exports = Helper;