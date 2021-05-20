const mongoose = require('mongoose');
const { regions, teamRoles, socialLinks } = require('../constants');

const teamSchema = new mongoose.Schema({
   name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      unique: true,
      required: true
   },
   region: {
      type: String,
      enum: regions,
      default: 'na',
      required: true,
   },
   members: [{
      type: {
         type: String,
         enum: teamRoles,
         default: 'member',
         required: true
      },
      member: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      }
  }],
  socialLinks: {
     type: Object,
     validate: object => {
         let allowedKeys = socialLinks;
         let correctKeys = Object.keys(object).every(key => allowedKeys.includes(key)); // make sure all keys are inside `allowedKeys`
         return correctKeys;
     }
  },
  playerLinks: [{
     name: {
        type: String,
        required: true
     },
     link: {
        type: String,
        required: true
     }
  }]
}, {timestamps: true});

teamSchema.pre('deleteOne', function(next) {
   let team = this;
   // TODO: Do all cleaning, example: delete refs from the hubs
});

module.exports = mongoose.model('Team', teamSchema);