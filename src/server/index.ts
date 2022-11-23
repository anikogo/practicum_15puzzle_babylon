import path from 'path';
import express from 'express';

import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

import { errors } from 'celebrate';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import dbConnect from './connect';

import api from './routes';

import NotFound from './errors/NotFound';

import serverRenderMiddleware from './middlewares/render-middleware';
import errorHandler from './middlewares/errorHandler';
import { requestLogger, errorLogger } from './middlewares/logger';

import Urls from './utils/constants';

const { PORT = 3000 } = process.env;

const helmetConfig = {
  useDefaults: true,
  directives: {
    defaultSrc: ["'self'", 'https://ya-praktikum.tech/api/v2/'],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    connectSrc: ["'self'", 'https://ya-praktikum.tech/api/v2/'],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'https://robohash.org/', 'https://ya-praktikum.tech/api/v2/resources/'],
  },
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy(helmetConfig));
}

app.use(Urls.API.BASE, api);

if (process.env.NODE_ENV === 'development') {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });
  app.use(connectLivereload());
}

app
  // .use(compression())
  .use(express.static(path.resolve(__dirname)));

app.get('/service-worker.js', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'service-worker', 'service-worker.js'));
});
app.get('/*', serverRenderMiddleware);

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
  if (process.env.NODE_ENV !== 'development') {
    await dbConnect();
  }
  listen();
})();
