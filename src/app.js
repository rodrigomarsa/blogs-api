const express = require('express');
const login = require('./controllers/login');
const { createUser, getByUserId } = require('./controllers/userController');
const validateToken = require('./middlewares/validateToken');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', login);
app.post('/user', createUser);
app.get('/user/:id', validateToken, getByUserId);

module.exports = app;
