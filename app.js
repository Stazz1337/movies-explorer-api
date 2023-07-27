require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const { validateUserBody, validateAuth } = require('./middlewares/validations');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000, MONGODB_URL, NODE_ENV } = process.env;

mongoose
  .connect(
    NODE_ENV === 'production'
      ? MONGODB_URL
      : 'mongodb://127.0.0.1:27017/bitfilmsdb',
    {
      useNewUrlParser: true,
    },
  )
  .then(() => console.log('MongoDB connected'));

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', validateUserBody, login);

app.post('/signup', validateAuth, createUser);

app.use(auth);

app.use(router);

app.use('*', () => {
  throw new NotFoundError('Page not found');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server started on port 3000');
});
