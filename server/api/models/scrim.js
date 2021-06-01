const mongoose = require('mongoose');
const { regions, valorantMaps } = require('../constants');

const scrimSchema = new mongoose.Schema({
   status: {
      type: String,
      enum: ['finished', 'waiting', 'started'],
      default: 'waiting',
      required: true
   },
   region: {
      type: String,
      enum: regions,
      default: 'na',
      required: true,
   },
   hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   teams: [{
      _id: false,
      type: {
         type: String,
         enum: ['host', 'guest', 'requested'],
         default: 'requested',
         required: true
      },
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Team',
         required: true
      }
   }],
   hub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hub',
      required: true
   },
   maps: [{
      type: String,
      enum: valorantMaps,
      required: true,
   }],
   startsAt: {
      type: Date,
      default: Date.now,
      required: false
   }
}, {timestamps: true});

scrimSchema.pre('deleteOne', {document: true}, async function(next) {
   const scrim = this;

   // Remove scrim from hub
   const hub = await Hub.findById(scrim.hub);
   hub.activeScrims.pull(scrim._id);
   await hub.save();

   next();
});

module.exports = mongoose.model('Scrim', scrimSchema);

const Hub = require('./hub');