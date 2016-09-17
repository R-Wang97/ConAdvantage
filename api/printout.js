'use strict';
const path = require('path');
const db = require('./database.js');
const pdfmake = require('pdfmake');
const config = require('./config.js');


function resolvePath(relFontPath) {
    return path.resolve(__dirname, relFontPath)
}

const fonts = {
    Roboto: {
        normal: resolvePath('../fonts/Roboto-Regular.ttf'),
        bold: resolvePath('../fonts/Roboto-Medium.ttf'),
        italics: resolvePath('../fonts/Roboto-Italic.ttf'),
        bolditalics: resolvePath('../fonts/Roboto-Italic.ttf')
    }
};

const printer = new pdfmake(fonts);

module.exports = {
    produce: function(httpRequest, httpResponse) {
        let data = JSON.parse(httpRequest.body);
        const token = data.token;
        const id = httpRequest.params.id;

        let username = '';

        db.query('SELECT * FROM tokens WHERE token = ?', token, function(err, rows) {
            if (err) {
                console.log(`Invalid token: ${err}`);
                httpResponse.statusCode = 403;
                httpResponse.send(err);
                return;
            } else {
                username = rows[0].username;
            }
        });

        let row = {};
        db.query('SELECT * FROM users WHERE username = ?', [username], function(err, rows) {
            if (err) {
                console.log(`Database error: ${err}`);
                httpResponse.statusCode = 500;
                httpResponse.send(err);
                return;
            } else {
                row.image = rows[0].logo_path;
                row.blurb = rows[0].report_blurb;
            }
        });
        let url = `http://${config.BaseUrl}/${id}`;
        let definition = {
            pageSize: 'LETTER',
            content: [
                {
                    image: row.image,
                    fit: [300, 50],
                    alignment: 'right',
                    style: 'header'
                },
                {
                    text: row.blurb
                },
                { text: '\n' },
                {
                    stack: [
                        { qr: url },
                        { text: url }
                    ],
                    alignment: 'center'
                }
            ]
        };
        let pdf = printer.createPdfKitDocument(definition);
        pdf.pipe(httpResponse);
        pdf.end();
    },
    reportAll: function(httpRequest, httpResponse) {
        // TODO
    },
    report: function(httpRequest, httpResponse) {
        // TODO
    }
}
