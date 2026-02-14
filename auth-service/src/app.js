const express = require('express');
const AuthController = require('./controllers/authController');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'Auth Service OK' }));
app.post('/login', AuthController.login);

app.listen(3002, '0.0.0.0', () => console.log('Auth Service Rodando na porta 3002'));
