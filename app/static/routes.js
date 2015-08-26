'use strict';

var express = require('express');
var controller = require('static/controllers');

var router = express.Router();

router.get('/', controller.homepage);

module.exports = router;