const _ = require('lodash');
const Hub = require("../models/hub");

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
   const hub = await Hub.findOneAndDelete({ _id: req.params.id });
   if (!hub) return res.status(404).json({error: "Could not delete this hub."});
   res.json({message: "This hub was deleted", data: hub});
}