'use strict';
const db = require('./database.js');
const img = require('./image.js');

module.exports = {
    add: function(httpRequest, httpResponse) {
        let data = JSON.parse(httpRequest.body);

        if (httpRequest.files) {
            const result = img.storeImage(httpRequest, httpResponse);

            if (result.err) {
                console.log(`Create new floorplan failed: ${result.err}`);
                httpResponse.send(result.err);
                return;
            }

            data.image_path = result.newPath;
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