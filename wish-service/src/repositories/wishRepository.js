const pool = require('../database');

async function getAll() {
    const [rows] = await pool.query(`
        SELECT 
            w.id,
            w.titulo,
            w.descricao,
            w.user_id,
            u.name AS user_name
        FROM wishes w
        JOIN users u ON u.id = w.user_id
        ORDER BY w.id DESC
    `);

    return rows;
}

async function create(userId, titulo, descricao) {
    const [result] = await pool.query(
        'INSERT INTO wishes (user_id, titulo, descricao) VALUES (?, ?, ?)',
        [userId, titulo, descricao]
    );

    return {
        id: result.insertId,
        user_id: userId,
        titulo,
        descricao
    };
}

async function remove(id) {
    const [result] = await pool.query(
        'DELETE FROM wishes WHERE id = ?',
        [id]
    );

    if (result.affectedRows === 0) return null;

    return { id };
}

async function update(id, titulo, descricao) {
    const [result] = await pool.query(
        'UPDATE wishes SET titulo = ?, descricao = ? WHERE id = ?',
        [titulo, descricao, id]
    );

    if (result.affectedRows === 0) return null;

    return { id, titulo, descricao };
}


module.exports = {
    getAll,
    create,
    remove,
    update
};
