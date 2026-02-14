const pool = require('../database');

async function getAllByUser(userId) {
  const [rows] = await pool.query(
    `
      SELECT 
        w.id,
        w.titulo,
        w.descricao,
        w.user_id,
        u.name AS user_name
      FROM wishes w
      JOIN users u ON u.id = w.user_id
      WHERE w.user_id = ?
      ORDER BY w.id DESC
    `,
    [userId]
  );

  return rows;
}

async function create(userId, titulo, descricao) {
  const [result] = await pool.query(
    'INSERT INTO wishes (user_id, titulo, descricao) VALUES (?, ?, ?)',
    [userId, titulo, descricao ?? null]
  );

  return {
    id: result.insertId,
    user_id: userId,
    titulo,
    descricao: descricao ?? null,
  };
}

async function updateByIdAndUser(id, userId, titulo, descricao) {
  const [result] = await pool.query(
    'UPDATE wishes SET titulo = ?, descricao = ? WHERE id = ? AND user_id = ?',
    [titulo, descricao ?? null, id, userId]
  );

  if (result.affectedRows === 0) return null;

  return {
    id: Number(id),
    user_id: userId,
    titulo,
    descricao: descricao ?? null,
  };
}

async function removeByIdAndUser(id, userId) {
  const [result] = await pool.query(
    'DELETE FROM wishes WHERE id = ? AND user_id = ?',
    [id, userId]
  );

  if (result.affectedRows === 0) return null;

  return { id: Number(id), user_id: userId };
}

module.exports = {
  getAllByUser,
  create,
  updateByIdAndUser,
  removeByIdAndUser,
};
