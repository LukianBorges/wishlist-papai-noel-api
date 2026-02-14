const express = require('express');
const WishController = require('./controllers/wishController');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'Wish Service OK' }));

app.get('/desejos', authMiddleware, WishController.getAll);
app.post('/desejos', authMiddleware, WishController.create);
app.put('/desejos/:id', authMiddleware, WishController.update);
app.delete('/desejos/:id', authMiddleware, WishController.remove);

app.listen(3000, '0.0.0.0', () => console.log('Wish Service rodando na porta 3000 🚀'));
