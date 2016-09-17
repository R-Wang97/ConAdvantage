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

        // Calculate and return total number of deficiencies
    }
}