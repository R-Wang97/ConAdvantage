'use strict';
const db = require('./database.js');

module.exports = {
    get: function(httpRequest, httpResponse) {
        const id = httpRequest.params.id;

        db.conn.query('SELECT * FROM reports WHERE id = ?', id, function(err, rows) {
            if (err) {
                console.log(`Get report failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            httpResponse.setHeader('Content-Type', 'application/json');
            httpResponse.send(rows[0]);
        });
    },
    update: function(httpRequest, httpResponse) {
        const report = JSON.parse(httpRequest.body);

        db.conn.query('UPDATE reports SET * WHERE id = ?', [report, report.id], function(err) {
            if (err) {
                console.log(`Update report failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            httpResponse.send('Update successful');
        });
    },
    submit: function(httpRequest, httpResponse) {
        const report = JSON.parse(httpRequest.body);
        report.submitted = 1;

        db.conn.query('UPDATE reports SET * WHERE id = ?', [report, report.id], function(err) {
            if (err) {
                console.log(`Update report failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            httpResponse.send('Update successful');
        });
    }
}