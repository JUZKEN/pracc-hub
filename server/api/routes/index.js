const express = require('express');
const users = require('./users');
const auth = require('./auth');
const router = express.Router();

// Routes
router.use('/users', users);
router.use('/auth', auth);

module.exports = router;