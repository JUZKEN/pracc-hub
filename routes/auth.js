const mongoose = require('mongoose');
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const Auth = require('../controllers/auth');
const Password = require('../controllers/password');

router.post('/register', Auth.register);
router.post('/login', Auth.login);

// Email verification
router.get('/verify/:token', Auth.verify);
router.post('/resend', Auth.resendToken);

// Password reset
router.post('/recover', Password.recover);
router.get('/reset/:token', Password.reset);
router.post('/reset/:token', Password.resetPassword);

module.exports = router;