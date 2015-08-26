'use strict';

module.exports = {
    port: 3000,
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