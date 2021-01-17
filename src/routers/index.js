const fs = require('fs');
const path = require('path');
const { Router } = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

module.exports = ({
  containerMiddleware,
  loggerMiddleware,
  errorHandler,
  swaggerMiddleware,
}) => {
  const router = new Router();
  router.use(loggerMiddleware);

  const apiRouter = new Router();
  const apiFolder = path.resolve(__dirname, './api');
  apiRouter
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(compression())
    .use(cors({ origin: '*' }))
    .use((req, res, next) => ((req.method === 'OPTIONS') ? res.status(204).end() : next()))
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);
  fs
    .readdirSync(apiFolder)
    .filter((file) => (
      (file.indexOf('.') !== 0)
      && (file !== 'index.js')
      && (file.slice(-3) === '.js')
    ))
    .forEach((file) => {
      const routeName = file.split('.')[0];
      /* eslint-disable */
      apiRouter.use(`/${routeName}`, require(`${apiFolder}/${file}`));
    });

  router.use('/api', apiRouter);
  router.use(errorHandler);

  return router;
};
