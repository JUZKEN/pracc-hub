const mongoose = require('mongoose');

exports.Photo = mongoose.model('Photo', new mongoose.Schema({
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