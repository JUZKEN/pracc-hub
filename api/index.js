const express = require('express');
const users = require('../api/routes/users');
const auth = require('../api/routes/auth');
const router = express.Router();

// Routes
router.use('/users', users);
router.use('/auth', auth);

module.exports = router;