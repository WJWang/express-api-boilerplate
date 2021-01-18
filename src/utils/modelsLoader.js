const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = {
  load({ sequelize, baseFolder, indexFile = 'index.js' }) {
    const loaded = {};
    fs
      .readdirSync(baseFolder)
      .filter((file) => (
        (file.indexOf('.') !== 0)
        && (file !== indexFile)
        && (file.slice(-3) === '.js')
      ))
      .forEach((file) => {
        const modelName = file.split('.')[0];
        /* eslint-disable import/no-dynamic-require,global-require */
        loaded[modelName] = require(path.join(baseFolder, file))(
          sequelize,
          Sequelize.DataTypes,
        );
        console.info(`[Model ${modelName}] loaded...`);
      });

    Object.keys(loaded).forEach((modelName) => {
      if (loaded[modelName].associate) {
        loaded[modelName].associate(loaded);
      }
    });

    loaded.database = sequelize;

    return loaded;
  },
};
