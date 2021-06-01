const mongoose = require('mongoose');
const { hubTypes } = require('../constants');

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
      _id: false,
      type: {
         type: String,
         enum: ['joined', 'requested'],
         required: true
      },
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Team',
         required: true,
      }
   }],
   activeScrims: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scrim'
   }]
}, {timestamps: true});

hubSchema.pre('deleteOne', {document: true}, async function(next) {
   const hub = this;

   // Remove hub from teams
   hub.teams.forEach(async t => {
      await Team.updateOne({ _id: t.id }, { $pull: { hubs: { id: hub._id } } });
   });

   next();
});

module.exports = mongoose.model('Hub', hubSchema);

const Team = require('./team');