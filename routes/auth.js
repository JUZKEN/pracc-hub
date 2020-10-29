const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth');
const auth = require('../middleware/auth');

router.post('/register', Auth.register);

router.post('/login', Auth.login);

router.get('/verify/:token', Auth.verify);

module.exports = router;