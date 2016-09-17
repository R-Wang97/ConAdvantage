'use strict';

const imageHeaders = [
    {
        length: 8,
        headers: [
            'ffd8ffe0', // JPG
            '89504e47' // PNG
        ]
    }
]
const fs = require('fs');

function isNotImage(hex) {
    for (let i = 0; i < imageHeaders.length; i++) {
        if (imageHeaders[i].headers.indexOf(hex.slice(0, imageHeaders[i].length)) !== -1) {
            return false;
        }
    }
    return true;
}

function getFileExtension(filePath) {
    return filePath.slice(filePath.lastIndexOf('.'))
}

module.exports = {
    // Form must contain encType="multipart/form-data"
    // Must have <input type="file" name="image" />
    // Call this function in any function that might take a file
    storeImage: function(httpRequest, httpResponse) {
        const data = JSON.parse(httpRequest.body);
        const fileType = data.type; // Either 'floorplan' or 'item'
        const id = data.id;
        const newPath = `${__dirname}/uploads/${id}_${fileType}${getFileExtension(httpRequest.files.image.path)}`;

        fs.readFile(httpRequest.files.image.path, 'hex', function(err, data) {
            if (err) {
                console.log(`Failed to read file: ${err}`);
                httpResponse.send(err);
                return {
                    err: err,
                    path: null
                };
            }

            if (isNotImage(data)) {
                let error = new Error('File is not an image');
                error.http_code = 415;
                console.log(`${error}`);
                httpResponse.send(error);
                return {
                    err: error,
                    path: null
                };
            }
        });

        fs.rename(httpRequest.files.image.path, newPath, function (err, data) {
            if (err) {
                console.log(`Rename file failed: ${err}`);
                httpResponse.send(err);
                return {
                    err: err,
                    path: null
                };
            }

            return {
                err: null,
                path: newPath
            };
        });
    }
}
