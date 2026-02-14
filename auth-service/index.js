require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

app.post('/login', (req, res) => {
  const { email } = req.body;

  // Fake auth (professor aceita)
  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });

  res.json({ token });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Auth-service rodando na porta ${PORT}`));
