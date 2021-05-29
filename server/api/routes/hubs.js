const auth = require('../middleware/auth');
const hubValidate = require('../middleware/hubs/validate');
const hubOwner = require('../middleware/hubs/hubOwner');
const express = require('express');
const router = express.Router();

const Hub = require('../controllers/hub');

/* Index hubs */
router.get('/', auth, Hub.index);

/* Get single hub by id */
router.get('/', auth, Hub.get);

/* Create a hub */
router.post('/', [auth, hubValidate.create], Hub.create);

/* Request to join a hub */
router.post('/:id/join', auth, Hub.join);

/* Leave hub route */
router.post('/:id/leave', auth, Hub.leave);

/* Accept/Reject team request */
router.post('/:id/request/:teamId', [auth, hubOwner, hubValidate.handleRequest], Hub.handleRequest);

/* Delete a hub */
router.delete('/:id', [auth, hubOwner], Hub.delete);

module.exports = router;