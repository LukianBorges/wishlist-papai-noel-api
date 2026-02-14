const express = require('express');
const UserController = require('./controllers/userController');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'User Service OK' }));

app.get('/users', UserController.getAll);
app.post('/users', UserController.create);
app.put('/users/:id', UserController.update);
app.delete('/users/:id', UserController.remove);

app.listen(3001, '0.0.0.0', () => console.log('User Service rodando na porta 3001'));
