const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const router = express.Router();

const Photo = require('../controllers/photo');

router.get('/me', auth, Photo.me);
router.get('/:uid', [auth, admin], Photo.show);
router.post('/', auth, validate.photo, Photo.store);
router.delete('/me/:id', auth, Photo.delete);

module.exports = router;