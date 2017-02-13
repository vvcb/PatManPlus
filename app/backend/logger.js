const winston = require('winston');
winston.level = 'debug';

class Logger {
  error(err) {
    if (this.isNotTest)
      winston.error(err);
  }

  info(message) {
    if (this.isNotTest)
      winston.info(message);
  }

  debug(message) {
    if (this.isNotTest)
      winston.debug(message);
  }

  get isNotTest() {
    return process.env.NODE_ENV !== 'test';
  }
}

module.exports = new Logger();