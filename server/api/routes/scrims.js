const scrimHost = require('../middleware/scrims/scrimHost');
const scrimValidation = require('../middleware/scrims/validate');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const Scrim = require('../controllers/scrim');

/* Index scrims by hub id */
router.get('/:hubId', auth, Scrim.getFromHub);

/* Create a scrim */
router.post('/', [auth, scrimValidation.validate], Scrim.create);

/* Delete a scrim */
router.delete('/:id', [auth, scrimHost], Scrim.delete);

/* Request to join */
router.post('/:id/request', auth, Scrim.request);

/* Accept/Reject request */
router.post('/:id/request/:teamId', [auth, scrimHost, scrimValidation.handleRequest], Scrim.handleRequest);

/* Finish scrim */


module.exports = router;