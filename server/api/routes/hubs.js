const auth = require('../middleware/auth');
const hubValidate = require('../middleware/hubs/validate');
const hubOwner = require('../middleware/hubs/hubOwner');
const express = require('express');
const router = express.Router();

const Hub = require('../controllers/hub');

/* Index hubs */
router.get('/', auth, Hub.index);

/* Get single hub by id */
router.get('/:id', auth, Hub.get);

/* Create a hub */
router.post('/', [auth, hubValidate.create], Hub.create);

/* Request to join a hub */
router.post('/:id/request', auth, Hub.request);

/* Leave hub route */
router.post('/:id/leave', auth, Hub.leave);

/* Accept/Reject team request */
// TODO: separate accept and reject into 2 routes
router.post('/:id/team/:teamId/request', [auth, hubOwner, hubValidate.handleRequest], Hub.handleRequest);

/* Kick team */
router.post('/:id/team/:teamId/kick', [auth, hubOwner], Hub.kickTeam);

/* Delete a hub */
router.delete('/:id', [auth, hubOwner], Hub.delete);

/* Update a hub */
router.put('/:id', [auth, hubOwner, hubValidate.update], Hub.update);

module.exports = router;