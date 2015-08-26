'use strict';

var Controllers = {};

Controllers.homepage = function(req, res) {
    res.render('app/homepage/index.html');
};

module.exports = Controllers;