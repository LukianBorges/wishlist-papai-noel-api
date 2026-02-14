const pool = require('./database');

async function test() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('Banco conectado com sucesso ✅');
        process.exit();
    } catch (err) {
        console.error('Erro ao conectar ❌', err);
        process.exit(1);
    }
}

test();
