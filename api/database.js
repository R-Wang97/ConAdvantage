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

module.exports = {
    conn: connection
}