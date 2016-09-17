var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');

var config = {
    entry: {
        client: './client/root.jsx',
        admin: './adminComponents/AdminContainer.jsx'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loader: 'babel'
            }
        ]
    }
};

module.exports = config;