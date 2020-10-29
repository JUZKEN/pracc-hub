const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const User = require('../controllers/user');

router.get('/', [auth, admin], User.index);

router.get('/me', auth, User.me);

router.delete('/:id', [auth, admin], User.delete);

// TODO: route for updating user, put request '/me'

module.exports = router;