const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const Auth = require('../controllers/auth');
const RefreshToken = require('../controllers/refreshToken');
const Password = require('../controllers/password');

router.post('/register', validate.register, Auth.register);
router.post('/login', validate.login, Auth.login);

// Refresh token
router.post('/refresh-token', RefreshToken.refresh);
router.post('/revoke-token', auth, validate.revokeToken, RefreshToken.revoke);

// Email verification
router.get('/verify/:token', Auth.verify);
router.post('/resend', validate.resend, Auth.resendVerificationToken);

// Password reset
router.post('/recover', validate.recover, Password.recover);
router.get('/reset/:token', Password.reset);
router.post('/reset/:token', validate.resetPassword, Password.resetPassword);

module.exports = router;