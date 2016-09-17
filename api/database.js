'use strict';

const mysql = require('mysql')
const config = require('./config.js');
const crypto = require('crypto');
const RANDOM_BYTES=64

const connection = mysql.createConnection({
    host: config.Database.Host,
    user: config.Database.Username,
    password: config.Database.Password,
    database: config.Database.Database
});

connection.connect(function(err){
    if (err) {
        console.log(`Error connecting to database: ${err}`);
    } else {
        console.log(`Database connected successfully at ${config.Database.Host}`);
    }
});

function createTables() {
    connection.query('CREATE TABLE IF NOT EXISTS floorplans (id VARCHAR(64), username VARCHAR(64), name VARCHAR(64), image_path VARCHAR(256))', function(err) {
        if (err) {
            console.log(`Create table floorplans error: ${err}`);
        } else {
            console.log('Table floorplans created successfully');
        }
    });

    connection.query('CREATE TABLE IF NOT EXISTS items (id VARCHAR(64), floorplan_id VARCHAR(64), report_id VARCHAR(64), is_default BIT, state VARCHAR(16), name VARCHAR(64), description VARCHAR(512), image_path VARCHAR(256), severity INT, fixable BIT, x INT, y INT)', function(err) {
        if (err) {
            console.log(`Create table items error: ${err}`);
        } else {
            console.log('Table items created successfully');
        }
    });

    connection.query('CREATE TABLE IF NOT EXISTS reports (id VARCHAR(64), floorplan_id VARCHAR(64), default_items VARCHAR(2048), custom_items VARCHAR(2048), submitted BIT)', function(err) {
        if (err) {
            console.log(`Create table reports error: ${err}`);
        } else {
            console.log('Table reports created successfully');
        }
    });

    connection.query('CREATE TABLE IF NOT EXISTS users (username VARCHAR(64), hash VARCHAR(64), salt VARCHAR(64), iterations INT, report_blurb VARCHAR(2048))', function(err) {
        if (err) {
            console.log(`Create table users error: ${err}`);
        } else {
            console.log('Table users created successfully');
        }
    });

    connection.query('CREATE TABLE IF NOT EXISTS tokens (username VARCHAR(64), token VARCHAR(64))', function(err) {
        if (err) {
            console.log(`Create table tokens error: ${err}`);
        } else {
            console.log('Table tokens created successfully');
        }
    });
}

createTables();

module.exports = connection;
