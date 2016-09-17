'use strict';
const db = require('./database.js');
const utils = require('./utils.js');

module.exports = {
    generate: function(httpRequest, httpResponse) {
        const floorPlanId = httpRequest.params.floorplan_id;

        const token = httpRequest.headers['Authorization'];
        const rToken = !utils.checkToken(token)
        if (!rToken) {
            httpResponse.send('Invalid token');
            httpResponse.statusCode = 403;
            return;
        }

        db.query('SELECT * FROM floorplans WHERE id = ?', floorPlanId, function(err, rows) {
            if (err) {
                console.log(`Create new report failed: ${err}`);
                httpResponse.send(err);
                return;
            } else if (rows.length == 0) {
                console.log(`No floorplan found for id ${floorPlanId}`);
                httpResponse.send(`No floorplan found for id ${floorPlanId}`);
                return;
            } else if (rows[0].username != rToken.username) {
                httpResponse.send('Invalid token');
                httpResponse.statusCode = 403;
                return;
            }
        });

        // Somehow load default items as JSON
        const defaultItems = '';

        const newReport = {
            id: utils.newId(),
            floorplan_id: floorPlanId,
            default_items: defaultItems,
            custom_items: '',
            submitted: 0
        };

        db.query('INSERT INTO reports SET ?', newReport, function(err) {
            if (err) {
                console.log(`Create report failed: ${err}`);
                httpResponse.send(err);
                return;
            }
        });

        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(newReport);
    },
    list: function(httpRequest, httpResponse) {
        const reports = [];

        db.query('SELECT * FROM reports', function(err, rows) {
            if (err) {
                console.log(`List reports failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            rows.forEach(function(row) {
                reports.push(row);
            });
        });
        
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(reports);
    },
    get: function(httpRequest, httpResponse) {
        const id = httpRequest.params.id;

        db.query('SELECT * FROM reports WHERE id = ?', id, function(err, rows) {
            if (err) {
                console.log(`Get report failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            httpResponse.setHeader('Content-Type', 'application/json');
            httpResponse.send(rows[0]);
        });
    },
    delete: function(httpRequest, httpResponse) {
        const id = httpRequest.params.id;

        db.query('DELETE * FROM reports WHERE id = ?', id, function(err) {
            if (err) {
                console.log(`Delete report failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            httpResponse.send('Delete report successful')
        });       
    }
}