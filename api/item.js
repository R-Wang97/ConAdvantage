'use strict';

const db = require('./database.js');

module.exports = {
    get: function(httpRequest, httpResponse) {
        const id = httpRequest.params.id;

        db.query('SELECT * FROM items WHERE id = ?', id, function(err, rows) {
            if (err) {
                console.log(`Get items failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            httpResponse.setHeader('Content-Type', 'application/json');
            httpResponse.send(rows[0]);
        });
    },
    update: function(httpRequest, httpResponse) {
        const id = httpRequest.params.id;
        const data = JSON.parse(httpRequest.body);

        db.query('UPDATE items SET * WHERE id = ?', [data, id], function(err) {
            if (err) {
                console.log(`Update item failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            httpResponse.setHeader('Content-Type', 'application/json');
            httpResponse.send(data)
        });
    },
    delete: function(httpRequest, httpResponse) {
        const id = httpRequest.params.id;
        const data = JSON.parse(httpRequest.body);

        if (data.is_default) {
            httpResponse.send('Cannot delete default item.');
            return;
        }

        db.query('DELETE FROM items WHERE id = ?', id, function(err) {
            if (err) {
                console.log(`Delete item failed: ${err}`);
                httpResponse.send(err);
                return;
            }

            httpResponse.send('Delete item successful');
        });
    }
}