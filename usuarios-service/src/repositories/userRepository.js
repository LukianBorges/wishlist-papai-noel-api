const pool = require('../database');

async function getAll() {
  const [rows] = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY id DESC');
  return rows;
}

async function create(name, email, password) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  return { id: result.insertId, name, email };
}

async function update(id, name, email) {
  const [result] = await pool.query(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );
  if (result.affectedRows === 0) return null;
  return { id, name, email };
}

async function remove(id) {
  const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
  if (result.affectedRows === 0) return null;
  return { id };
}

async function getByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  return rows[0] || null;
}

module.exports = { getAll, create, update, remove, getByEmail };
