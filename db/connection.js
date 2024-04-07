const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Mikkun831!',
        database: 'employeeTracker_db'
    },
);

module.exports = connection;