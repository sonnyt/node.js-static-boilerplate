'use strict';

var path = require('path');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.locals.user = req.user;
        res.locals.path = req.path;

        next();
    });

    /**
     * Routes
     */
    app.use('/', require('static/routes'));
    app.use('/user', require('user/routes/auth'));

    /**
     * Error Handlers
     */

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');

        err.status = 404;

        next(err);
    });

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);

        var template = (err.status === 404) ? 404 : 500;
        var error = {};

        if (app.get('env') === 'development') {
            error = err;
        }

        res.render('error/' + template + '.html', {
            message: err.message,
            error: error
        });
    });
};