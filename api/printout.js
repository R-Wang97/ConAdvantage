'use strict';
const path = require('path');
const db = require('./database.js');
const pdfmake = require('pdfmake');


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
        // TODO
        var image = 'tux.png';
        var blurb = `
        This blurb will be filled in by the landlord.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae massa dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed vel elit nec arcu rhoncus dictum vitae quis ipsum. Praesent non cursus erat. Etiam in tellus eget justo commodo venenatis. Quisque blandit, odio in dictum commodo, lacus arcu suscipit orci, a tempor est justo at justo. In mollis ultrices ex at faucibus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus nec finibus purus, vitae semper ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean rutrum vel arcu eget euismod. Nullam a mi quis nunc eleifend tempor. Morbi dignissim nec dolor vel ultrices.`;
        var url = 'http://example.com/idwillgohere';
        let definition = {
            pageSize: 'LETTER',
            content: [
                {
                    image: image,
                    fit: [300, 50],
                    alignment: 'right',
                    style: 'header'
                },
                {
                    text: blurb
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
