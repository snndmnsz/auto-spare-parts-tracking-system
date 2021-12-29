const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'carsparepartssystem',
    password: 'sinan15987654321'
});

module.exports = pool.promise();