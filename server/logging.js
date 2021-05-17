const appRoot = require('app-root-path');
const winston = require('winston');

module.exports = function() {
   const logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
         new winston.transports.Console({
            format: winston.format.combine( winston.format.colorize(), winston.format.simple() ),
            handleExceptions: true,
            handleRejections: true
         }),
         new winston.transports.File({ filename: `${appRoot}/logs/combined.log` }),
         new winston.transports.File({ filename: `${appRoot}/logs/error.log`, level: 'error' })
      ],
      exceptionHandlers: [
         new winston.transports.File({ filename: `${appRoot}/logs/exceptions.log` })
      ],
      exitOnError: false
   });
   winston.add(logger);
};
