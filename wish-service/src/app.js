const express = require('express');
const WishController = require('./controllers/wishController');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'Wish Service OK' });
});

app.get('/desejos', WishController.getAll);
app.post('/desejos', WishController.create);
app.delete('/desejos/:id', WishController.remove);
app.put('/desejos/:id', WishController.update);

app.get('/teste', (req, res) => {
  res.json({ ok: true });
});

app.delete('/debug-delete', (req, res) => {
  res.json({ ok: true });
});


app.listen(3000, '0.0.0.0', () => {
  console.log('Wish Service rodando na porta 3000');
});
