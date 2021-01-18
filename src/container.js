const {
  createContainer,
  asClass,
  asValue,
  asFunction,
} = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./Application');
const Server = require('./Server');
const router = require('./routers');
const logger = require('./logger/getLogger');

const loggerMiddleware = require('./logger/loggerMiddleware');
const errorHandler = require('./errors/errorHandler');
const devErrorHandler = require('./errors/devErrorHandler');
const swaggerMiddleware = require('./docs/swaggerMiddleware');

const {
  database,
  User: UserModel,
} = require('./models');

const {
  UserService,
} = require('./services');

module.exports = async () => {
  const container = createContainer();

  // System & Server
  container
    .register({
      app: asClass(Application).singleton(),
      server: asClass(Server).singleton(),
    })
    .register({
      router: asFunction(router).singleton(),
      logger: asFunction(logger).singleton(),
    })
    .register({
      config: asValue(config)
    });

  // Middlewares
  container
    .register({
      loggerMiddleware: asFunction(loggerMiddleware).singleton(),
    })
    .register({
      containerMiddleware: asValue(scopePerRequest(container)),
      errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
      swaggerMiddleware: asValue([swaggerMiddleware])
    });

  // Database
  try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
    container.register({
      database: asValue(database),
      UserModel: asValue(UserModel),
    });
  } catch (e) {
    console.error('Database connection failed disabling database.');
    throw e;
  }

  // Services
  container
    .register({
      userService: asClass(UserService),
    });
  return container;
};
