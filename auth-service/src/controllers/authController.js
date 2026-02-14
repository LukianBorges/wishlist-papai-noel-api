const jwt = require('jsonwebtoken');
const repository = require('../repositories/userRepository');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha obrigatórios' });
        }

        const user = await repository.findByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

      
        if (user.password !== password) {
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login OK',
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no login' });
    }
}

module.exports = { login };
