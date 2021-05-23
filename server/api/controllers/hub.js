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

   if (!user.activeTeam.team) return res.status(404).json({error: "You don't have a team yet!"});

   const { team: teamId, type: teamType } = user.activeTeam;
   if (teamType != "admin") return res.status(403).json({error: "You're not an admin of your team!"});

   const team = await Team.findOne({ _id: teamId });
   if (!team) return res.status(404).json({error: "Could not find your team."});

   const hasTeamJoinedTheHub = team.hubs.filter(h => h == req.params.id);
   if (!_.isEmpty(hasTeamJoinedTheHub)) return res.status(400).json({error: "Your team is already inside this hub!"});

   if (hub.type == "invite") {
      const hasTeamRequestedTheHub = team.hubsRequests.filter(h => h == req.params.id);
      if (!_.isEmpty(hasTeamRequestedTheHub)) return res.status(400).json({error: "You already requested to join this hub!"});

      team.hubsRequests.push(hub._id);
      hub.teamRequests.push(team._id);
      await team.save();
      await hub.save();
      
      return res.json({message: "Request sent"});
   }

   // if public
   team.hubs.push(hub._id);
   hub.teams.push(team._id);
   await team.save();
   await hub.save();

   res.json({message: "Joined Hub."});
}

exports.handleRequest = async (req, res, next) => {
   const { id: hubId, teamId } = req.params;

   const hub = await Hub.findOne({ _id: hubId });
   if (!hub) return res.status(404).json({ error: "Could not find the specified hub." });

   const team = await Team.findOne({ _id: teamId });
   if (!team) return res.status(404).json({ error: "Could not find the specified team." });

   let teamRequest = hub.teamRequests.filter(t => t == teamId);
   if (_.isEmpty(teamRequest)) return res.status(400).json({ error: "This team has not requested to join this hub." });

   const { type } = req.body;

   // Remove requests from both
   team.hubsRequests.pull(hub._id);
   hub.teamRequests.pull(team._id);

   if (type == "reject") {
      await team.save();
      await hub.save();
      return res.json({ message: "Request was rejected" });
   }

   // If accept
   team.hubs.push(hub._id);
   hub.teams.push(team._id);
   await team.save();
   await hub.save();

   res.json({message: "Request was accepted"})
}