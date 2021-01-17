/* eslint-disable */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

function loadDbConfig() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    return require('./database')[ENV];
  }

  return null;
}

const ENV = process.env.NODE_ENV || 'development';
const envConfig = require(path.join(__dirname, 'environments', ENV));

module.exports = {
  [ENV]: true,
  env: ENV,
  db: loadDbConfig(),
  ...envConfig,
};
