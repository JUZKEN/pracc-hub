const _ = require('lodash');
const Hub = require("../models/hub");
const User = require("../models/user");
const Team = require("../models/team");

exports.index = async (req, res, next) => {
   const hubs = await Hub.find();
   if (!hubs.length) return res.status(404).json({error: "There are no hubs yet!"});
   res.json({data: _.map(hubs, _.partialRight(_.pick, ['_id', 'name', 'type']))});
}

exports.create = async (req, res, next) => {
   let hub = await Hub.findOne({ name: req.body.name });
   if (hub) return res.status(401).json({error: 'This hub name is already being used.'});

   // Create and save the new hub
   const newHub = new Hub(req.body);
   newHub.ownerId = req.user._id;
   await newHub.save();

   res.json({data: newHub})
}

exports.get = async (req, res, next) => {
   const hub = await Hub.findById(req.params.id);
   if (!hub.length) return res.status(404).json({error: 'Could not find the hub you were looking for.'});
   res.json({data: hub});
}

exports.delete = async (req, res, next) => {
   const hub = req.hub;

   await hub.deleteOne();
   res.json({message: "This hub was deleted", data: hub});
}

exports.join = async (req, res, next) => {
   const hub = await Hub.findOne({ _id: req.params.id });
   if (!hub) return res.status(404).json({error: "Could not find the specified hub."});

   const user = await User.findOne({ _id: req.user._id });
   if (!user.activeTeam) return res.status(404).json({error: "You don't have a team yet!"});

   const team = await Team.findOne({ _id: user.activeTeam });
   if (!team) return res.status(404).json({error: "Could not find your team."});

   const member = team.members.find(m => m.member == req.user._id);
   if (!member) return res.status(400).json({error: "You are not part of this team."});
   if (member.type != "admin") return res.status(403).json({error: "You're not an admin of this team!"});

   const hasTeamJoinedTheHub = team.hubs.find(h => h.id == req.params.id && h.type == "joined");
   if (hasTeamJoinedTheHub) return res.status(400).json({error: "Your team is already inside this hub!"});

   if (hub.type == "invite") {
      const hasTeamRequestedTheHub = team.hubs.find(h => h.id == req.params.id && h.type == "requested");
      if (hasTeamRequestedTheHub) return res.status(400).json({error: "You already requested to join this hub!"});

      team.hubs.push({ type: "requested", id: hub._id });
      hub.teams.push({ type: "requested", id: team._id });
      await team.save();
      await hub.save();
      
      return res.json({message: "Request sent"});
   }

   // if public
   team.hubs.push({ type: "joined", id: hub._id });
   hub.teams.push({ type: "joined", id: team._id });
   await team.save();
   await hub.save();

   res.json({message: "Joined Hub."});
}

exports.leave = async (req, res, next) => {
   const hub = await Hub.findOne({ _id: req.params.id });
   if (!hub) return res.status(404).json({error: "Could not find the specified hub."});

   const user = await User.findOne({ _id: req.user._id });
   if (!user.activeTeam) return res.status(404).json({error: "You don't have a team yet!"});

   const team = await Team.findOne({ _id: user.activeTeam });
   if (!team) return res.status(404).json({error: "Could not find your team."});

   const member = team.members.find(m => m.member == req.user._id);
   if (!member) return res.status(400).json({error: "You are not part of this team."});
   if (member.type != "admin") return res.status(403).json({error: "You're not an admin of this team!"});

   const isTeamInTheHub = team.hubs.find(h => h.id == req.params.id);
   if (!isTeamInTheHub) return res.status(400).json({error: "Your team is not inside this hub!"});

   team.hubs.pull({ id: hub._id });
   hub.teams.pull({ id: team._id });
   await team.save();
   await hub.save();
   
   res.json({message: "Successfully left the hub!"})
}

exports.handleRequest = async (req, res, next) => {
   const { id: hubId, teamId } = req.params;

   const hub = await Hub.findOne({ _id: hubId });
   if (!hub) return res.status(404).json({ error: "Could not find the specified hub." });

   const team = await Team.findOne({ _id: teamId });
   if (!team) return res.status(404).json({ error: "Could not find the specified team." });

   let hubRequest = team.hubs.find(h => h.id == hubId && h.type == "requested");
   if (!hubRequest) return res.status(400).json({ error: "This team has not requested to join this hub." });

   const { type } = req.body;

   if (type == "reject") {
      team.hubs.pull({ id: hub._id });
      hub.teams.pull({ id: team._id });
      await team.save();
      await hub.save();
      return res.json({ message: "Request was rejected" });
   }

   // If accept
   await Team.findOneAndUpdate({ _id: team._id, 'hubs': { $elemMatch: {id: hub._id} } }, {'$set': { 'hubs.$.type': 'joined' }});
   await Hub.findOneAndUpdate({ _id: hub._id, 'teams': { $elemMatch: {id: team._id} } }, {'$set': { 'teams.$.type': 'joined' }});

   res.json({message: "Request was accepted"})
}