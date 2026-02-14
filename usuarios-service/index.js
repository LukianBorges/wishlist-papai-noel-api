require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

let usuarios = []; // depois vira RDS
let id = 1;

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
  const usuario = { id: id++, ...req.body };
  usuarios.push(usuario);
  res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
  usuarios = usuarios.filter(u => u.id != req.params.id);
  res.json({ message: 'Usuário removido' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Usuarios-service rodando na porta ${PORT}`));
