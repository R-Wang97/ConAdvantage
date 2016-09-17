const db = require('./database.js');
const crypto = require('crypto');

const SALT_LENGTH = 256;
const KEY_LENGTH = 256;
const ITERATIONS = 32768;

module.exports = {

    User: class {
        constructor(username, salt, iterationCount, hash) {
            this.username = username;
            this.salt = salt;
            this.iterationCount = iterationCount;
            this.hash = hash;
        }

        checkPassword(password) {
            return crypto.pbkdf2Sync(password, this.salt, this.iterationCount, KEY_LENGTH, 'sha256') == this.hash;
        }
    },

    create: function(httpRequest, httpResponse) {
        // TODO

        //how to create a new user (approximately)
        //newUser(username, password) {
        //    this.username = username;
        //    this.salt = crypto.randomBytes(SALT_LENGTH);
        //    this.iterationCount = ITERATIONS;
        //    this.hash = crypto.pbkdf2Sync(password, this.salt, this.iterationCount, KEY_LENGTH, 'sha256');
        //}
    },
    login: function(httpRequest, httpResponse) {
        // TODO
    },
    logout: function(httpRequest, httpResponse) {
        // TODO
    },
    delete: function(httpRequest, httpResponse) {
        // TODO
    }
}
