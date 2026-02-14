require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

let desejos = [];
let id = 1;

app.get('/desejos', (req, res) => {
  res.json(desejos);
});

app.post('/desejos', (req, res) => {
  const desejo = { id: id++, ...req.body };
  desejos.push(desejo);
  res.json(desejo);
});

app.delete('/desejos/:id', (req, res) => {
  desejos = desejos.filter(d => d.id != req.params.id);
  res.json({ message: 'Desejo removido' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Desejos-service rodando na porta ${PORT}`));
