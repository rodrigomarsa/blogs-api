const express = require('express');
const login = require('./controllers/login');
const { createUser } = require('./controllers/userController');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', login);
app.post('/user', createUser);

module.exports = app;
