const morgan = require('morgan');
const LoggerStreamAdapter = require('./LoggerStreamAdapter');

module.exports = ({ logger }) => morgan('dev', {
  stream: LoggerStreamAdapter.toStream(logger)
});
