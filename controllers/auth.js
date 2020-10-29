const asyncMiddleware = require('../middleware/async');
const { User, validate } = require('../models/user');
const Token = require('../models/token');
const _ = require('lodash');
const mongoose = require('mongoose');

exports.register = asyncMiddleware(async (req, res, next) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // Check if email is unique
   let user = await User.findOne({ email: req.body.email });
   if (user) return res.status(401).send('A user is already registered with the given email');

   // Check if username is unique
   user = await User.findOne({ username: req.body.username });
   if (user) return res.status(401).send('A user is already registered with the given username');

   // Create and save the new user
   const newUser = new User(_.pick(req.body, ['username', 'name', 'email', 'password']));
   await newUser.save();

   // Send a verification email
   await sendVerificationEmail(newUser, req, res);   
});

exports.login = asyncMiddleware(async (req, res, next) => {
   const { email, password } = req.body;

   let user = await User.findOne({ email });
   if (!user) return res.status(401).send('The email adress is not associated with any account.');

   // Validate password
   const validPassword = await user.comparePassword(req.body.password);
   if (!validPassword) return res.status(401).send('Invalid email or password.');

   // Check if user is not verified
   if (!user.isVerified) return res.status(401).json({ type: 'not-verified', message: 'Your account has not been verified.' });

   // Login successful
   res.json({token: user.generateAuthToken(), user: _.pick(user, ['username', 'name', 'email'])});
});

exports.verify = asyncMiddleware(async (req, res, next) => {
   if(!req.params.token) return res.status(400).json({message: "We were unable to find a user for this token."});
   
   // Find a matching token
   const token = await Token.findOne({ token: req.params.token });
   if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token may have expired.' });

   // Find a matching user with that token
   let user = await User.findOne({ _id: token.userId });
   if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });

   // Check if the user is already verified
   if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });
   
   // Verify and save the user
   user.isVerified = true;
   await user.save();
   
   res.json({message: "The account has been verified. Please log in."});
});

async function sendVerificationEmail(user, req, res) {
   // Generate and save the verification token
   const token = user.generateVerificationToken();
   await token.save();

   // TODO: send verification email.

   res.json({message: 'A verification email has been sent to ' + user.email + '.', token: token.token}); // TODO: sending token for testing purposes, remove after
}