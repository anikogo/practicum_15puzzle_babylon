import path from 'path';
import express from 'express';

import { errors } from 'celebrate';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import dbConnect from './connect';

import index from './src/routes/index';

import NotFound from './src/errors/NotFound';

import errorHandler from './src/middlewares/errorHandler';
import { requestLogger, errorLogger } from './src/middlewares/logger';

import Urls from './src/utils/constants';

const { PORT = 3000 } = process.env;

const app = express();

app.use('/static', express.static(path.resolve(process.cwd(), 'static')));
app.use(express.static(path.resolve(__dirname), { extensions: ['css', 'js'] }));
app.get('/:page', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});

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
    console.log(`App listening on port ${PORT}`);
  });
};

(async () => {
  await dbConnect();
  listen();
})();
