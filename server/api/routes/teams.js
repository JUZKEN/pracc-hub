const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const Team = require('../controllers/team');

router.get('/', auth, Team.index);
router.get('/me', auth, Team.me);
router.get('/:id', auth, Team.get);

router.post('/', [auth, validate.createTeam], Team.create);
router.delete('/:id', auth, Team.delete)

// update team [auth, team role = admin]

module.exports = router;