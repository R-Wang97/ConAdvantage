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
    storeImage: function(path, type, id) {
        const data = JSON.parse(httpRequest.body);
        const fileType = data.type; // Either 'floorplan', 'item' or 'logo'
        const newPath = `${__dirname}/uploads/${id}_${type}`;

        fs.readFile(path, 'hex', function(err, data) {
            if (err) {
                console.log(`Failed to read file: ${err}`);
                return {
                    err: err,
                    path: null
                };
            }

            if (isNotImage(data)) {
                let error = new Error('File is not an image');
                error.http_code = 415;
                console.log(`${error}`);
                return {
                    err: error,
                    path: null
                };
            }
        });

        fs.rename(path, newPath, function (err, data) {
            if (err) {
                console.log(`Rename file failed: ${err}`);
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
