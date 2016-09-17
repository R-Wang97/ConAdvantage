'use strict';
module.exports = {
    newToken: function(username) {
        return {
            username: username,
            token: Array(config.TokenLength + 1).join("B")
        }
    }
}