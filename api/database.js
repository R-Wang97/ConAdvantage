const mysql = require('mysql')

const fs = require('fs');
const configFile = 'config/config.json';
const config = JSON.parse(
    fs.readFileSync(configFile)
);

const connection = mysql.createConnection({
    host: config.Database.Host,
    user: config.Database.Username,
    password: config.Database.Password,
    database: config.Database.Database
});

connection.connect(function(err){
    if(err) {
        console.log(`Error connecting to database: ${err}`);
    } else {
        console.log(`Database connected successfully at ${config.Database.Host}`);
    }
});

function createTables() {
    connection.query('CREATE TABLE IF NOT EXISTS floorplans (id VARCHAR(64), name VARCHAR(64), image_path VARCHAR(256))', function(err) {
        if(err) {
            console.log(`Create database floorplans error: ${err}`);
        } else {
            console.log('Table floorplans created successfully');
        }
    });

    connection.query('CREATE TABLE IF NOT EXISTS items (id VARCHAR(64), floorplan_id VARCHAR(64), report_id VARCHAR(64), is_default BIT, name VARCHAR(64), description VARCHAR(512), image_path VARCHAR(256), severity INT, fixable BIT)', function(err) {
        if(err) {
            console.log(`Create database items error: ${err}`);
        } else {
            console.log('Table items created successfully');
        }
    });

    connection.query('CREATE TABLE IF NOT EXISTS reports (id VARCHAR(64), floorplan_id VARCHAR(64), default_items VARCHAR(2048), custom_items VARCHAR(2048))', function(err) {
        if(err) {
            console.log(`Create database reports error: ${err}`);
        } else {
            console.log('Table reports created successfully');
        }
    });

    connection.query('CREATE TABLE IF NOT EXISTS users (username VARCHAR(64), password VARCHAR(64), salt VARCHAR(64), iterations INT)', function(err) {
        if(err) {
            console.log(`Create database users error: ${err}`);
        } else {
            console.log('Table users created successfully');
        }
    });
}

createTables();

module.exports = {
    conn: connection,
    newId: function() {
        // TODO
        return Array(config.IdLength + 1).join("A");
    }
}