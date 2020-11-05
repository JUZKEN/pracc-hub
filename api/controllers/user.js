const User = require('../models/user');

exports.index = async (req, res, next) => {
   const users = await User.find().select('-password');
   if (!users.length) return res.status(404).json({message: 'Could not find any users.'});
   res.send(users);
};

exports.me = async (req, res, next) => {
   const user = await User.findById(req.user._id).select('-password');
   res.send(user);
};

exports.delete = async (req, res, next) => {
   const user = await User.findByIdAndDelete(req.params.id);
   if (!user) return res.status(404).json({message: 'User with the given ID was not found.'});
   res.send(user);
};

exports.update = async (req, res, next) => {
   const { username, name } = req.body;

   // If username is passed, check if its unique
   if (username) {
      let usernameUsed = await User.findOne({ username: username });
      if (usernameUsed) return res.status(401).send('A user is already registered with the given username');
   }

   const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
   res.send(updatedUser);
}