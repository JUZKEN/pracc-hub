const _ = require('lodash');
const User = require('../models/user');
const Team = require('../models/team');

exports.index = async (req, res, next) => {
   const users = await User.find().select('-password');
   if (!users.length) return res.status(404).json({error: 'Could not find any users.'});
   res.json({data: users});
};

exports.me = async (req, res, next) => {
   const user = await User.findById(req.user._id).select('-password');
   res.json({data: user});
};

exports.delete = async (req, res, next) => {
   const user = await User.findByIdAndDelete(req.params.id);
   if (!user) return res.status(404).json({error: 'User with the given ID was not found.'});
   res.json({data: user});
};

exports.update = async (req, res, next) => {
   const { username } = req.body;

   // If username is passed, check if its unique
   if (username) {
      let usernameUsed = await User.findOne({ username: username });
      if (usernameUsed) return res.status(401).json({error: 'A user is already registered with the given username'});
   }

   const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
   res.json({data: updatedUser});
}