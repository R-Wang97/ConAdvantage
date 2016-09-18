'use strict';
const db = require('./database.js');

module.exports = {
    getHeatMap: function(httpRequest, httpResponse) {
        const token = httpRequest.headers['Authorization'];
        const rToken = !utils.checkToken(token)
        if (!rToken) {
            httpResponse.send('Invalid token');
            httpResponse.statusCode = 403;
            return;
        }

        const data = JSON.parse(httpRequest.body);
        const floorplanId = data.id;
        let reports = [];

        db.query('SELECT * FROM reports WHERE floorplan_id = ?', floorplanId, function(err, rows) {
            if (err) {
                console.log(`Get average deficiencies failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            reports = rows;
        });

        // Calculate heatmap somehow...
    },
    getAverage: function(httpRequest, httpResponse) {
        const token = httpRequest.headers['Authorization'];
        const rToken = !utils.checkToken(token)
        if (!rToken) {
            httpResponse.send('Invalid token');
            httpResponse.statusCode = 403;
            return;
        }

        const data = JSON.parse(httpRequest.body);
        const floorplanId = data.id;
        let reports = [];

        db.query('SELECT * FROM reports WHERE floorplan_id = ?', floorplanId, function(err, rows) {
            if (err) {
                console.log(`Get average deficiencies failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            reports = rows;
        });

        let deficiencyCount = 0.0;
        let totalCount = 0.0;
        reports.forEach(function (report) {
            let items = [];
            const itemIds = report.default_items.split(';').concat(report.custom_items.split(';'));

            itemIds.forEach(function (id) {
                db.query('SELECT * FROM items WHERE id = ?', id, function(err, rows) {
                    if (err) {
                        console.log(`Get average deficiencies failed: ${err}`);
                        httpResponse.send(err);
                        return;
                    }

                    items.push(rows[0]);
                });
            });

            items.forEach(function (item) {
                if (item.state !== 'good') {
                    count++;
                }
            });

            totalCount++;
        });

        const averageDeficiency = deficiencyCount / totalCount;

        httpResponse.send(averageDeficiency);
    }
}