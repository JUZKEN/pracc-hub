const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { Picture, validate } = require('../models/picture');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', [auth], async (req, res) => {
   const pictures = await Picture.find({ user: req.user._id });
   if (!pictures) return res.status(404).send('Could not find any pictures.');
   res.send(pictures);
});

router.post('/', auth, async (req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // Save picture in database...
   // Upload to AWS S3 storage...
   // Send response to client...
});

module.exports = router;