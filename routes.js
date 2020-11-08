const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');

const { apiLimiter } = require('./api/middleware/limiter');
const error = require('./api/middleware/error');
const users = require('./api/routes/users');
const photos = require('./api/routes/photos');
const auth = require('./api/routes/auth');

module.exports = function(app) {
   // Set security HTTP headers
   app.use(helmet());

   // Compress HTTP responses.
   app.use(compression());

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

   // Handling undefined routes.
   app.use('*', (req, res, next) => {
      res.status(404).json({message: 'Undefined Route'});
   });

   // Handling errors
   app.use(error);
}