require('dotenv').config();
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';
/* eslint-disable import/no-dynamic-require */
const envConfig = require(path.join(__dirname, 'environments', ENV));
/* eslint-disable import/no-dynamic-require */
module.exports = {
  [ENV]: true,
  env: ENV,
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  ...envConfig,
};
