const express = require('express');
const users = require('./users');
const auth = require('./auth');
const teams = require('./teams');
const hubs = require('./hubs');
const scrims = require('./scrims');
const router = express.Router();

// Routes
router.use('/users', users);
router.use('/auth', auth);
router.use('/teams', teams);
router.use('/hubs', hubs);
router.use('/scrims', scrims);

module.exports = router;