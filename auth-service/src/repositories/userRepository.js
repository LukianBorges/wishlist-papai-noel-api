const pool = require('../database');

async function findByEmail(email) {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    return rows[0];
}

module.exports = { findByEmail };
