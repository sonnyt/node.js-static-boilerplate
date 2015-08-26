'use strict';

module.exports = {
    port: 5000,
    secrets: {
        session: 'sites-secret'
    },
    mongo: {
        options: {
            db: {
                safe: true
            }
        },
        uri: ''
    }
};