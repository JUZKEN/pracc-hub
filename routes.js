const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

const { apiLimiter } = require('./api/middleware/limiter');
const error = require('./api/middleware/error');
const AppError = require('./api/utils/appError');
const users = require('./api/routes/users');
const photos = require('./api/routes/photos');
const auth = require('./api/routes/auth');

module.exports = function(app) {
   // Set security HTTP headers
   app.use(helmet());

   // Limit request from the same API 
   app.use('/api', apiLimiter);

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