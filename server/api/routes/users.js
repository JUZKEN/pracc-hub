const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const User = require('../controllers/user');

router.get('/', [auth, admin], User.index);
router.get('/me', auth, User.me);
router.put('/me', auth, validate.userUpdate, User.update);
router.delete('/:id', [auth, admin], User.delete);

module.exports = router;