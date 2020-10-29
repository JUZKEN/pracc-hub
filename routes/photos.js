const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Photo = require('../controllers/photo');

router.get('/me', auth, Photo.me);

router.get('/:uid', [auth, admin], Photo.show);

router.post('/', auth, Photo.store);

router.delete('/me/:id', auth, Photo.delete);

module.exports = router;