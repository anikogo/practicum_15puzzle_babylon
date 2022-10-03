import path from 'path';
import express from 'express';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import serverRenderMiddleware from './render-middleware';

const app = express();

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
  res.sendFile(path.resolve(__dirname, '..', 'service-worker', 'service-worker.js'));
});
app.get('/*', serverRenderMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Application is started on localhost:', port);
});
