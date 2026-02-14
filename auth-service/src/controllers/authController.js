const jwt = require('jsonwebtoken');
const repo = require('../repositories/userRepository');

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email e password são obrigatórios' });

    const user = await repo.getByEmail(email);
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    
    if (user.password !== password) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Erro no login' });
  }
}

module.exports = { login };
