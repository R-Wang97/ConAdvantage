'use strict';
const config = require('./config.js');

module.exports = {
    newToken: function(username) {
        return {
            username: username,
            token: Math.random().toString(36).slice(2, 2 + config.TokenLength)
        }
    }
}