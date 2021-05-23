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
      _id: false,
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
  hubs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hub',
      required: true
  }],
  hubsRequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hub',
      required: true
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
      _id: false,
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


const updateActiveTeam = async (team) => {
   team.members.forEach(async m => {
      let user = await User.findOne({_id: m.member});
      if (!user.activeTeam.team) {
         user.activeTeam = { type: m.type, team: team._id };
         await user.save();
      };
   });
}

teamSchema.pre('save', {document: true, query: false}, async function(next) {
   console.log('save team hook');
   await updateActiveTeam(this);
   next()
});

teamSchema.pre('updateOne', {document: true, query: false}, async function(next) {
   console.log('team update hook');
   await updateActiveTeam(this);
   next()
});

teamSchema.pre('deleteOne', {document: true}, async function(next) {
   const team = this;
   
   // Remove active team from members
   team.members.forEach(async m => {
      let user = await User.findOne({_id: m.member});
      user.activeTeam = undefined;
      await user.save();
   });

   // Remove team from hubs
   team.hubs.forEach(async hub => {
      await Hub.updateOne({ _id: hub }, { $pull: { teams: team._id } });
   });

   // Remove request from hubs
   team.hubsRequests.forEach(async hub => {
      await Hub.updateOne({ _id: hub }, { $pull: { teamRequests: team._id } });
   });

   next();
});

module.exports = mongoose.model('Team', teamSchema);

const User = require('./user');
const Hub = require('./hub');