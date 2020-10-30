const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const Auth = require('../controllers/auth');
const Password = require('../controllers/password');

router.post('/register', validate.register, Auth.register);
router.post('/login', validate.login, Auth.login);

// Email verification
router.get('/verify/:token', Auth.verify);
router.post('/resend', validate.resend, Auth.resendToken);

// Password reset
router.post('/recover', validate.recover, Password.recover);
router.get('/reset/:token', Password.reset);
router.post('/reset/:token', validate.resetPassword, Password.resetPassword);

module.exports = router;