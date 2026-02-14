const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'wishlist-db.cuo3nosqk8mn.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'admin12345',
    database: 'wishlist',
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool;
