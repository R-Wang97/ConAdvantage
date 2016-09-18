# ConAdvantage

For Hack the North 2016

## Developer Instructions

Please ensure that you have npm and MySQL installed.

### Database Setup
- Install MySQL for your operating system
- `mysql -u root -p` to access your MySQL Server with your `root` password
- `CREATE DATABASE whatbroke;`
- `GRANT ALL PRIVILEGES ON whatbroke.* To 'what'@'localhost' IDENTIFIED BY 'broke';`
- `quit;` to exit MySQL

### Server Setup

- To install dependencies `npm install`
- To run `npm start`
- Navigate to `localhost:3030`
