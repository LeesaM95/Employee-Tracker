const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeTracker_db'
    },
    console.log(`Connection to Employee Tracker Database successful.`)
);

module.exports = db;