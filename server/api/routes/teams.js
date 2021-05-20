const auth = require('../middleware/auth');
const teamAdmin = require('../middleware/teams/teamAdmin');
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
router.post('/', [auth, validate.createTeam], Team.create);

/* Delete a team */
router.delete('/:id', [auth, teamAdmin], Team.delete);

/* Update a team */
router.put('/:id', [auth, teamAdmin, validate.updateTeam], Team.update);

module.exports = router;