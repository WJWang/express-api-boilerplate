const path = require('path');

const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = {
  web: {
    port: 3000
  },
  logging: {
    appenders: {
      console: { type: 'console' },
      file: { type: 'file', filename: logPath },
    },
    categories: {
      default: { appenders: ['console'], level: 'info' }
    },
  }
};
