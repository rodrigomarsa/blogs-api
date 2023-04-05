const express = require('express');
const login = require('./controllers/login');
const { createUser, getUsers, getByUserId,
  deleteUser } = require('./controllers/userController');
const { createCategory, getCategories } = require('./controllers/categoryController');
const { createPost, searchPost, getPosts, getByPostId,
  updateByPostId, deleteByPostId } = require('./controllers/postController');
const validateToken = require('./middlewares/validateToken');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', login);
app.post('/user', createUser);
app.get('/user', validateToken, getUsers);
app.get('/user/:id', validateToken, getByUserId);
app.delete('/user/me', validateToken, deleteUser);
app.post('/categories', validateToken, createCategory);
app.get('/categories', validateToken, getCategories);
app.post('/post', validateToken, createPost);
app.get('/post/search', validateToken, searchPost);
app.get('/post', validateToken, getPosts);
app.get('/post/:id', validateToken, getByPostId);
app.put('/post/:id', validateToken, updateByPostId);
app.delete('/post/:id', validateToken, deleteByPostId);

module.exports = app;
