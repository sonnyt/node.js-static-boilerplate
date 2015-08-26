'use strict';

var Controllers = {};

Controllers.homepage = function(req, res) {
    res.render('static/homepage.html');
};

module.exports = Controllers;