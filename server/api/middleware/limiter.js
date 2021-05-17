const rateLimit = require('express-rate-limit');

// Limit request from the same API 
exports.apiLimiter = rateLimit({
   max: 100,
   windowMs: 15 * 60 * 1000, // 15 minutes
   message: 'Too Many Requests from this IP, please try again in 15 minutes',
});

// Limit request for registering a new user
exports.registerLimiter = rateLimit({
   max: 5,
   windowMs: 60 * 60 * 1000, // 1 hour
   message: 'Too Many Requests from this IP, please try again in an hour',
   skipFailedRequests: true
});