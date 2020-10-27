const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { Photo, validate } = require('../models/photo');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
   const photos = await Photo.find({ user: req.user._id });
   if (!photos.length) return res.status(404).send('Could not find any photos.');
   res.send(photos);
});

router.get('/:id', [auth, admin], async (req, res) => {
   const photos = await Photo.find({ user: req.params.id });
   if (!photos.length) return res.status(404).send('Could not find any photos.');
   res.send(photos);
});

router.post('/', auth, async (req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // Upload to AWS S3 storage...

   let photo = new Photo(_.pick(req.body, ['photo_path', 'recording_path'])).set('user', req.user._id);
   await photo.save();

   res.send(photo);
});

module.exports = router;