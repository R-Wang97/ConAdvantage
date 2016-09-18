'use strict';
const db = require('./database.js');
const utils = require('./utils.js');
const it = require('./item.js');
const fs = require('fs');

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

        let floorplan = null;
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

            floorplan = rows[0];
        });

        // Somehow load default items as JSON
        const defaultItems = '';

        const defaultFile = `list/${floorplan.name}.json`;
        const defaults = JSON.parse(
            fs.readFileSync(defaultFile)
        );

        if (defaults.name != floorplan.name) {
            console.log(`Floorplan names do not match: ${floorPlanId}`);
            httpResponse.send(`Floorplan names do not match: ${floorPlanId}`);
            return;
        }

        const reportId = utils.newId();
        defaults.items.forEach(function (item) {
            item.id = utils.newId();
            item.image_path = '';
            item.floorplan_id = floorPlanId;
            item.report_id = reportId;
            item.description = '';
            it.addItem(item);

            defaultItems.concat(item.id + ';');
        });

        const newReport = {
            id: reportId,
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

        const token = httpRequest.headers['Authorization'];
        const rToken = !utils.checkToken(token)
        if (!rToken) {
            httpResponse.send('Invalid token');
            httpResponse.statusCode = 403;
            return;
        }

        db.query('SELECT * FROM reports', function(err, rows) {
            if (err) {
                console.log(`List reports failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            rows.forEach(function(row) {
                reports.push(row);

                if (row.username != rToken.username) {
                    httpResponse.send('Invalid token');
                    httpResponse.statusCode = 403;
                    return;
                }
            });
        });
        
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(reports);
    },
    get: function(httpRequest, httpResponse) {
        const id = httpRequest.params.id;

        const token = httpRequest.headers['Authorization'];
        const rToken = !utils.checkToken(token)
        if (!rToken) {
            httpResponse.send('Invalid token');
            httpResponse.statusCode = 403;
            return;
        }

        db.query('SELECT * FROM reports WHERE id = ?', id, function(err, rows) {
            if (err) {
                console.log(`Get report failed: ${err}`);
                httpResponse.send(err);
                return;
            } else if (rows[0].username != rToken.username) {
                httpResponse.send('Invalid token');
                httpResponse.statusCode = 403;
                return;
            }

            httpResponse.setHeader('Content-Type', 'application/json');
            httpResponse.send(rows[0]);
        });
    },
    delete: function(httpRequest, httpResponse) {
        const id = httpRequest.params.id;

        const token = httpRequest.headers['Authorization'];
        const rToken = !utils.checkToken(token)
        if (!rToken) {
            httpResponse.send('Invalid token');
            httpResponse.statusCode = 403;
            return;
        }

        db.query('DELETE * FROM reports WHERE id = ?', id, function(err) {
            if (err) {
                console.log(`Delete report failed: ${err}`);
                httpResponse.send(err);
                return;
            } else if (rows[0].username != rToken.username) {
                httpResponse.send('Invalid token');
                httpResponse.statusCode = 403;
                return;
            }

            httpResponse.send('Delete report successful')
        });       
    }
}