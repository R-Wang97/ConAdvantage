const express = require('express');
const fs = require('fs');

const app = express();
const configFile = 'config/config.json';
const config = JSON.parse(
    fs.readFileSync(configFile)
);

app.use('/', express.static(`${__dirname}/public`));

const port = config.ServerPort;
const server = app.listen(port); // eslint-ignore no-unused-vars
console.log(`Listening on port ${port}`);
