'use strict';
const config = require('./config.js');
const db = require('./database.js');
const crypto = require('crypto');
const RANDOM_BYTES=32

module.exports = {
    newToken: function(username) {
        return {
            username: username,
            token: crypto.randomBytes(RANDOM_BYTES).toString('base64url').slice(0, config.TokenLength)
        }
    },
    newId: function() {
        return crypto.randomBytes(RANDOM_BYTES).toString('base64url').slice(0, config.IdLength);
    },
    checkToken: function(token) {
        db.query('SELECT * FROM tokens WHERE id = ?', token, function(err, rows) {
            if (err) {
                return null;
            }

            return rows[0];
        });
    }
}
