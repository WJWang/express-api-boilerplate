const Sequelize = require('sequelize');
const modelsLoader = require('../utils/modelsLoader');
const { db: config } = require('../../config');

if (config) {
  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
    },
  );
  const models = modelsLoader.load({
    sequelize,
    baseFolder: __dirname,
  });
  module.exports = models;
} else {
  console.error('Database configuration not found, disabling database.');
}
