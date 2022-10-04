export {};

const express = require('express');

import { dbConnect } from './connect';

const { Sequelize, SequelizeOptions } = require('sequelize-typescript');

const { errors } = require('celebrate');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const index = require('./src/routes/index');

const NotFound = require('./src/errors/NotFound');

const errorHandler = require('./src/middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');

const Urls = require('./src/utils/constants');
const corsOptions = require('./src/utils/corsOptions');

const { PORT = 3000 } = process.env;

const app = express();

app.use('*', cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(helmet());

app.use(Urls.API.BASE, index);
app.use('*', () => {
  throw new NotFound('Page not found...');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const listen = () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${ PORT }`);
  });
};

(async () => {
  await dbConnect();
  listen();
})();
