'use strict';

var node_env = process.env.NODE_ENV || 'development',
    config = require('./' + node_env);

module.exports = config;