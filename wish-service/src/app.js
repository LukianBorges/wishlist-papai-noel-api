const express = require('express');
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'Wish Service OK' });
});

app.listen(3000, () => {
  console.log('Wish Service rodando na porta 3000');
});
