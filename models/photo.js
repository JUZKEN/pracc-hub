const Joi = require('joi');
const mongoose = require('mongoose');

const Photo = mongoose.model('Photo', new mongoose.Schema({
   photo_path: {
      type: String,
      required: true
   },
   recording_path: {
      type: String,
      required: true
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
}, {timestamps: true}));

function validatePhoto(photo) {
   const schema = Joi.object({
      photo_path: Joi.required(),
      recording_path: Joi.required()
   });
   return schema.validate(photo);
}

exports.Photo = Photo;
exports.validate = validatePhoto;