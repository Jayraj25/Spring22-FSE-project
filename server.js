const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tuiter');

const express = require('express');
const { default: UserController } = require('./controllers/UserController');
const { default: UserDao } = require('./daos/UserDao');
const app = express();
app.use(express.json());

app.get('/hello', (req, res) =>
  res.send('Hello World!'));


const userController = new UserController(app,new UserDao());
app.use('./',userController);

const PORT = 4000;
app.listen(PORT);
