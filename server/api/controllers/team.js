const _ = require('lodash');
const Team = require("../models/team");

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
   const teams = await Team.find({ "members.member": { _id: req.user._id } });
   if (!teams.length) return res.status(404).json({error: "You don't have a team yet!"});

   res.json({data: _.map(teams, _.partialRight(_.pick, ['region', '_id', 'name']))});
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
   const team = await Team.findOneAndDelete({ _id: req.params.id });
   if (!team) return res.status(404).json({error: "Could not delete this team."});
   res.json({message: "Team was deleted", data: team});
}

exports.update = async (req, res, next) => {
   if (req.body.name) {
      let team = await Team.findOne({ name: req.body.name });
      if (team) return res.status(401).json({error: 'This team name is already being used.'});
   }
   let team = await Team.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
   res.json({data: team})
}