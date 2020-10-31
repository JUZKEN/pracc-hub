const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

const error = require('./api/middleware/error');
const AppError = require('./api/utils/appError');
const users = require('./api/routes/users');
const photos = require('./api/routes/photos');
const auth = require('./api/routes/auth');

module.exports = function(app) {
   // Set security HTTP headers
   app.use(helmet());

   // Limit request from the same API 
   // TODO: Limiter for register route, like 5 sucessful request each hour max
   const limiter = rateLimit({
      max: 150, // limit each IP to 150 requests per windowMs
      windowMs: 60 * 60 * 1000, // 1 hour
      message: 'Too Many Requests from this IP, please try again in an hour'
   });
   app.use('/api', limiter);

   // Body parser, reading data from body into req.body
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   // Data sanitization against Nosql query injection
   app.use(mongoSanitize());

   // Data sanitization against XSS(clean user input from malicious HTML code)
   app.use(xss());

   // Prevent parameter pollution
   app.use(hpp());

   // Routes
   app.use('/api/users', users);
   app.use('/api/photos', photos);
   app.use('/api/auth', auth);

   // Handling undefined routes, needs to be the last route defined.
   app.use('*', (req, res, next) => {
      const err = new AppError(404, 'fail', 'undefined route');
      next(err, req, res, next);
   });

   // Handling errors
   app.use(error);
}