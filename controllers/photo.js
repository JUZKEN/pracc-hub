const asyncMiddleware = require('../middleware/async');
const { Photo, validate } = require('../models/photo');
const _ = require('lodash');

exports.me = asyncMiddleware(async (req, res, next) => {
   const photos = await Photo.find({ user: req.user._id });
   if (!photos.length) return res.status(404).send('Could not find any photos.');
   res.send(photos);
});

exports.show = asyncMiddleware(async (req, res, next) => {
   const photos = await Photo.find({ user: req.params.uid });
   if (!photos.length) return res.status(404).send('Could not find any photos.');
   res.send(photos);
});

exports.store = asyncMiddleware(async (req, res, next) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // Upload to AWS S3 storage...

   let photo = new Photo(_.pick(req.body, ['photo_path', 'recording_path'])).set('user', req.user._id);
   await photo.save();

   res.send(photo);
});

exports.delete = asyncMiddleware(async (req, res, next) => {
   const photo = await Photo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
   if (!photo) return res.status(404).send('Could not find the picture with the given id.');
   res.send(photo);
});