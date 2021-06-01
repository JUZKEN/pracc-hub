const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const User = require('../controllers/user');

/* Index users */
router.get('/', [auth, admin], User.index);

/* Get myself */
router.get('/me', auth, User.me);

/* Get my teams */
router.get('/me/teams', auth, User.myTeams);

/* Update myself */
router.put('/me', auth, validate.userUpdate, User.update);

/* Delete a user */
router.delete('/:id', [auth, admin], User.delete);

module.exports = router;