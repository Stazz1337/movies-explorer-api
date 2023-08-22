require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const router = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000, MONGODB_URL, NODE_ENV } = process.env;

mongoose.connect(
  NODE_ENV === 'production'
    ? MONGODB_URL
    : 'mongodb://127.0.0.1:27017/bitfilmsdb',
  {
    useNewUrlParser: true,
  },
);

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.use(cors);

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler);

app.listen(PORT);
