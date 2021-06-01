const _ = require('lodash');
const Team = require("../models/team");
const User = require('../models/user');

exports.index = async (req, res, next) => {
   const teams = await Team.find();
   if (!teams.length) return res.status(404).json({error: 'There are no teams yet!'});
   res.json({data: _.map(teams, _.partialRight(_.pick, ['region', '_id', 'name']))});
};

exports.get = async (req, res, next) => {
   const team = await Team.findById(req.params.id);
   if (!team.length) return res.status(404).json({error: 'Could not find the team you were looking for.'});
   res.json({data: team});
}

exports.me = async (req, res, next) => {
   const teams = await Team.find({ 'members': { $elemMatch: { member: req.user._id, type: {$ne: 'invited'} } } });
   if (_.isEmpty(teams)) return res.status(404).json({error: "You don't have any teams yet"});

   res.json({data: _.map(teams, _.partialRight(_.pick, ['_id', 'name', 'region', 'members', 'hubs', 'playerLinks']))});
}

exports.create = async (req, res, next) => {
   let team = await Team.findOne({ name: req.body.name });
   if (team) return res.status(401).json({error: 'This team name is already being used.'});

   req.body.members = [{
      type: 'admin',
      member: req.user._id
   }]

   // Create and save the new team
   const newTeam = new Team(req.body);
   await newTeam.save();

   res.json({data: newTeam})
}

exports.delete = async (req, res, next) => {
   const team = await Team.findOne({ _id: req.params.id });
   if (!team) return res.status(404).json({error: "Could not find the specified team."});

   await team.deleteOne();
   res.json({message: "Team was deleted", data: team});
}

exports.update = async (req, res, next) => {
   if (req.body.name) {
      let team = await Team.findOne({ name: req.body.name });
      if (team) return res.status(401).json({error: 'This team name is already being used.'});
   }
   let team = await Team.updateOne({ _id: req.params.id }, req.body, { new: true });
   res.json({data: team})
}

exports.inviteUser = async (req, res, next) => {
   const { id: teamId, userId } = req.params;

   const user = await User.findById(userId);
   if (!user) return res.status(404).json({error: "This user doesn't exist."});

   const team = await Team.findById(teamId);
   if (!team) return res.status(404).json({error: "This team doesn't exist."});

   let isUserInTeam = team.members.find(m => m.member.equals(userId));
   if (isUserInTeam) return res.status(400).json({error: "This user is already in the team."});

   team.members.push({
      type: "invited",
      member: userId
   });
   await team.save();

   res.json({message: `${user.username} was invited`});
}

exports.acceptInvite = async (req, res, next) => {
   const { id: teamId } = req.params;

   const team = await Team.findById(teamId);
   if (!team) return res.status(404).json({error: "This team doesn't exist."});

   let memberInvited = team.members.find(m => m.member.equals(req.user._id) && m.type == "invited");
   if (!memberInvited) return res.status(400).json({error: "This invite is not valid"});

   memberInvited.type = "member";
   await team.save();

   res.json({message: "Invite accepted!"});
}

exports.rejectInvite = async (req, res, next) => {
   const { id: teamId } = req.params;

   const team = await Team.findById(teamId);
   if (!team) return res.status(404).json({error: "This team doesn't exist."});

   let memberInvited = team.members.find(m => m.member.equals(req.user._id) && m.type == "invited");
   if (!memberInvited) return res.status(400).json({error: "This invite is not valid"});

   team.members.pull(memberInvited);
   await team.save();

   res.json({message: "Invite rejected!"});
}

exports.kickMember = async (req, res, next) => {
   const { id: teamId, userId } = req.params;

   const user = await User.findById(userId);
   if (!user) return res.status(404).json({error: "This user doesn't exist."});

   const team = await Team.findById(teamId);

   let member = team.members.find(m => m.member.equals(userId));
   if (member.type == "admin") return res.status(400).json({error: "You're not allowed to kick an admin."});
   if (!member) return res.status(400).json({error: "This user is not in the team."});

   team.members.pull(member);
   await team.save();

   res.json({message: `${user.username} was kicked from the team`});
}

exports.setActive = async (req, res, next) => {
   const team = await Team.findOne({ _id: req.params.id });
   if (!team) return res.status(404).json({error: "Could not find the specified team."});
   
   let user = team.members.find(m => m.member == req.user._id);
   if (!user) return res.status(404).json({error: "You are not a member of this team."});
   
   let updatedUser = await (await User.findOneAndUpdate({ _id: req.user._id }, { activeTeam: req.params.id }, {new: true}));
   res.json({message: "Active team updated", data: _.pick(updatedUser, ['_id', 'activeTeam'])});
}