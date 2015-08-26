'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('user/module');

module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).exec(function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                User.findOne({
                    'email' :  email
                }, function(err, user) {
                    if (err) return done(err);

                    if (user) {
                        return done(null, false, {
                             message: 'That email is already taken.'
                        });
                    } else {
                        var newUser = new User({
                                name: {
                                    first: req.body.firstName,
                                    last: req.body.lastName
                                },
                                email: email,
                                password: password,
                                provider: 'local',
                                status: 'new-user'
                            });

                        newUser.save(function(err, user) {
                            if (err) return done(err);

                            return done(null, user);
                        });
                    }
                });
            });
        }
    ));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            User.findOne({
                'email' :  email
            }, function(err, user) {
                if (err) return done(err);

                if (!user) {
                    return done(null, false, {
                        message: {
                            status: 'error',
                            content: 'User is not found.'
                        }
                    });
                }

                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: {
                            status: 'error',
                            content: 'Oops! Wrong password.'
                        }
                    });
                }

                return done(null, user);
            });
        }
    ));
};