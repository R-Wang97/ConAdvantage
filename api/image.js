'use strict';

const fs = require('fs');

function getFileExtension(filePath) {
    return filePath.slice(filePath.lastIndexOf('.'))
}

module.exports = {
    storeImage = function(httpRequest, httpResponse) {
        const data = JSON.parse(httpRequest.body);
        const fileType = data.type; // Either 'floorplan' or 'item'
        const id = data.id;
        const newPath = `${__dirname}/uploads/${id}_${fileType}${getFileExtension(httpRequest.files.image.path)}`;

        fs.rename(httpRequest.files.image.path, newPath, function (err, data) {
            if (err) {
                console.log(`Rename file failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            httpResponse.send(newPath);
        });
    }
}