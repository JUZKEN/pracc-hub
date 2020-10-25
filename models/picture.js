const Joi = require('joi');
const mongoose = require('mongoose');

const Picture = mongoose.model('Picture', new mongoose.Schema({
   pictureUri: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: true
   },
   recordingUri: {
      type: String,
      minlength: 5,
      maxlength: 1024,
      required: true
   },
   date: {
      type: Date,
      default: Date.now(),
      required: true
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
}));

function validatePicture(picture) {
   const schema = Joi.object({
      pictureUri: Joi.string().min(5).max(1024).required(),
      recordingUri: Joi.string().min(5).max(1024).required(),
      date: Joi.date().required(),
      user: Joi.string().required()
   });
   return schema.validate(picture);
}

exports.Picture = Picture;
exports.validate = validatePicture;