const scrimHost = require('../middleware/scrims/scrimHost');
const scrimValidation = require('../middleware/scrims/validate');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const Scrim = require('../controllers/scrim');

/* Index scrims by hub id */
router.get('/hub/:hubId', auth, Scrim.getFromHub);

/* Get scrims by team id */
router.get('/team/:teamId', auth, Scrim.getFromTeam);

/* Get single scrim by id */
router.get('/:id', auth, Scrim.get);

/* Create a scrim */
router.post('/', [auth, scrimValidation.validate], Scrim.create);

/* Delete a scrim */
router.delete('/:id', [auth, scrimHost], Scrim.delete);

/* Request to join */
router.post('/:id/request', auth, Scrim.request);

/* Accept/Reject request */
router.post('/:id/team/:teamId/request', [auth, scrimHost, scrimValidation.handleRequest], Scrim.handleRequest);

/* Finish scrim */
router.post('/:id/finish', [auth, scrimHost], Scrim.finish);

module.exports = router;