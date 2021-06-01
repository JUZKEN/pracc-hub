const _ = require('lodash');
const Scrim = require("../models/scrim");
const Hub = require("../models/hub");
const User = require("../models/user");
const Team = require("../models/team");
const team = require('../models/team');

exports.get = async (req, res, next) => {
   const scrim = await Scrim.findById(req.params.id);
   if (!scrim) return res.status(404).json({error: "This scrim doesn't exist"});
   res.json({data: _.pick(scrim, ['_id', 'status', 'region', 'hub', 'hostId', 'startsAt', 'maps', 'teams'])})
}

exports.getFromHub = async (req, res, next) => {
   const hub = await Hub.findById(req.params.hubId).populate('activeScrims');
   if (!hub) return res.status(404).json({error: "This hub doesn't exist."});

   const user = await User.findById(req.user._id);
   const team = await Team.findById(user.activeTeam);
   if (!team) return res.status(400).json({error: "You don't have a team yet!"});

   if (!isTeamInHub(team, req.params.hubId)) return res.status(400).json({error: "Your team is not inside this hub!"});

   res.json({data: _.map(hub.activeScrims, _.partialRight(_.pick, ['_id', 'status', 'region', 'hub', 'hostId', 'startsAt', 'maps', 'teams']))});
}

exports.getFromTeam = async (req, res, next) => {
   const team = await Team.findById(req.params.teamId);
   if (!team) return res.status(404).json({error: "This team doesn't exist."});

   const scrims = await Scrim.find({ 'teams': { $elemMatch: {id: req.params.teamId} } });
   if (_.isEmpty(scrims)) return res.status(404).json({error: "This team doesn't have any scrims yet"});

   res.json({data: _.map(scrims, _.partialRight(_.pick, ['_id', 'status', 'region', 'hub', 'hostId', 'startsAt', 'maps', 'teams']))});
}

exports.create = async (req, res, next) => {
   const { hub: hubId } = req.body;
   
   const hub = await Hub.findById(hubId);
   if (!hub) return res.status(404).json({error: "This hub doesn't exist."});

   const user = await User.findById(req.user._id);
   const team = await Team.findById(user.activeTeam);
   if (!team) return res.status(400).json({error: "You don't have a team yet!"});

   if (!isTeamInHub(team, hubId)) return res.status(400).json({error: "Your team is not inside this hub!"});

   // Update values
   let scrim = req.body;
   scrim.status = "waiting";
   scrim.hostId = req.user._id;
   scrim.teams = [{
      type: "host",
      id: user.activeTeam
   }];

   // Create and save the new scrim
   const newScrim = new Scrim(scrim);
   await newScrim.save();

   // Add reference to hub's activeScrims
   hub.activeScrims.push(newScrim._id);
   await hub.save();

   res.json({data: newScrim});
}

exports.delete = async (req, res, next) => {
   const scrim = req.scrim;

   await scrim.deleteOne();
   res.json({message: "This scrim was deleted", data: scrim});
}

exports.request = async (req, res, next) => {
   const user = await User.findById(req.user._id);
   const team = await Team.findById(user.activeTeam);
   if (!team) return res.status(400).json({error: "You don't have a team yet!"});

   const scrim = await Scrim.findById(req.params.id);
   const hubId = scrim.hub;
   if (!isTeamInHub(team, hubId)) return res.status(400).json({error: "Your team is not inside this hub!"});

   let teamRequest = scrim.teams.find(t => t.id.equals(team._id));
   if (teamRequest) return res.status(400).json({ error: "This team already requested to join this scrim." });

   // Request to join
   scrim.teams.push({
      type: 'requested',
      id: team._id
   });
   await scrim.save();

   res.json({message: "Requested to join this scrim!"})
}

exports.handleRequest = async (req, res, next) => {
   const scrim = req.scrim;
   const { type } = req.body;
   if (scrim.status != "waiting") return res.status(400).json({error: `This scrim already ${scrim.status}`});

   let teamRequest = scrim.teams.find(t => t.id.equals(req.params.teamId) && t.type == "requested");
   if (!teamRequest) return res.status(400).json({ error: "This team has not requested to join this scrim." });

   if (type == "reject") {
      scrim.teams.pull({ id: req.params.teamId });
      await scrim.save();
      res.json({message: "Request was rejected"});
   }

   scrim.status = "started";
   teamRequest.type = "guest";
   await scrim.save();
   res.json({message: "Request was accepted!"})
}

exports.finish = async (req, res, next) => {
   const scrim = req.scrim;

   scrim.status = "finished";
   await scrim.save();

   res.json({message: "This scrim was finished", data: scrim});
}

const isTeamInHub = (team, hubId) => team.hubs.find(h => h.id.equals(hubId) && h.type == "joined") ? true : false;
