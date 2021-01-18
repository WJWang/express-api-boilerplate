const getContainer = require('./src/container');

getContainer()
  .then((container) => {
    const app = container.resolve('app');
    app
      .start()
      .catch((error) => {
        app.logger.error(error.stack);
        process.exit();
      });
  }).catch((err) => {
    console.error(err);
    process.exit();
  });
