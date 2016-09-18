'use strict';
const db = require('./database.js');
const img = require('./image.js');
const utils = require('./utils.js');

module.exports = {
    add: function(httpRequest, httpResponse) {
        let data = JSON.parse(httpRequest.body);

        const token = httpRequest.headers['Authorization'];
        const rToken = !utils.checkToken(token)
        if (!rToken) {
            httpResponse.send('Invalid token');
            httpResponse.statusCode = 403;
            return;
        }

        data.id = utils.newId();
        data.username = rToken.username;

        if (httpRequest.files) {
            const result = img.storeImage(httpRequest.files.image.path, 'floorplan', data.id);

            if (result.err) {
                console.log(`Create new floorplan failed: ${result.err}`);
                httpResponse.send(result.err);
                return;
            }

            data.image_path = result.path;
        }

        db.query('INSERT INTO floorplans SET ?', data, function(err) {
            if (err) {
                console.log(`Create new floorplan failed: ${err}`);
                httpResponse.send(err);
                return;
            }
        });

        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(data);
    },
    addFromObject: function(floorplan) {
        db.query('INSERT INTO floorplans SET ?', floorplan, function(err) {
            if (err) {
                console.log(`Create new floorplan from object failed: ${err}`);
                return;
            }
        });
    },
    delete: function(httpRequest, httpResponse) {
        let data = JSON.parse(httpRequest.body);

        const token = httpRequest.headers['Authorization'];
        const rToken = !utils.checkToken(token)
        if (!rToken) {
            httpResponse.send('Invalid token');
            httpResponse.statusCode = 403;
            return;
        }

        db.query('DELETE * FROM floorplans WHERE ?', data.id, function(err) {
            if (err) {
                console.log(`Delete floorplan failed: ${err}`);
                httpResponse.send(err);
                return;
            }
        });

        httpResponse.send('Delete floorplan successful');
    },
    list: function(httpRequest, httpResponse) {
        const floorplans = [];

        const token = httpRequest.headers['Authorization'];
        const rToken = !utils.checkToken(token)
        if (!rToken) {
            httpResponse.send('Invalid token');
            httpResponse.statusCode = 403;
            return;
        }

        db.query('SELECT * FROM floorplans', function(err, rows) {
            if (err) {
                console.log(`List floorplan failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            rows.forEach(function(row) {
                floorplans.push(row);
            });
        });

        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(floorplans);
    },
    show: function(httpRequest, httpResponse) {
        const id = httpRequest.params.id;

        const token = httpRequest.headers['Authorization'];
        const rToken = !utils.checkToken(token)
        if (!rToken) {
            httpResponse.send('Invalid token');
            httpResponse.statusCode = 403;
            return;
        }

        db.query('SELECT * FROM floorplans WHERE id = ?', id, function(err, rows) {
            if (err) {
                console.log(`Get floorplan failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            httpResponse.setHeader('Content-Type', 'application/json');
            httpResponse.send(rows[0]);
        });
    }
}
