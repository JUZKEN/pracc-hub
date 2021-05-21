const mongoose = require('mongoose');
const { hubTypes, teamsStatus } = require('../constants');

const hubSchema = new mongoose.Schema({
   name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      unique: true,
      required: true
   },
   type: {
      type: String,
      enum: hubTypes,
      default: 'public',
      required: true,
   },
   ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   teams: [{
      status: {
         type: String,
         enum: teamsStatus,
         required: true
      },
      team: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Team',
         required: true,
      }
   }]
}, {timestamps: true});

module.exports = mongoose.model('Hub', hubSchema);