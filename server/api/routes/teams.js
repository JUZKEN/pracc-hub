const auth = require('../middleware/auth');
const teamAdmin = require('../middleware/teams/teamAdmin');
const teamValidate = require('../middleware/teams/validate');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const Team = require('../controllers/team');

/* Index teams */
router.get('/', auth, Team.index);

/* Get my teams */
router.get('/me', auth, Team.me);

/* Get single team by id */
router.get('/:id', auth, Team.get);

/* Create a team */
router.post('/', [auth, teamValidate.create], Team.create);

/* Set active team */
router.post('/:id/set-active', auth, Team.setActive);

/* Delete a team */
router.delete('/:id', [auth, teamAdmin], Team.delete);

/* Update a team */
router.put('/:id', [auth, teamAdmin, teamValidate.update], Team.update);

module.exports = router;