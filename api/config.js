'use strict';
const fs = require('fs');

const configFile = 'config/config.json';
const config = JSON.parse(
    fs.readFileSync(configFile)
);

module.exports = config;