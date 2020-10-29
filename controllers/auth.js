const sendEmail = require('../utils/sendEmail');
const asyncMiddleware = require('../middleware/async');
const _ = require('lodash');

const { User, validate } = require('../models/user');
const Token = require('../models/token');

exports.register = asyncMiddleware(async (req, res, next) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // Check if there is a user with the same email
   let user = await User.findOne({ email: req.body.email });
   if (user) return res.status(401).send('A user is already registered with the given email');

   // Check if there is a user with the same username
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
   if (!user.isVerified) return res.status(401).json({ message: 'Your account has not been verified.' });

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
   if (!user) {
      await token.remove();
      return res.status(400).json({ message: 'We were unable to find a user for this token.' });
   }

   // Check if the user is already verified
   if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });
   
   // Verify and save the user
   user.isVerified = true;
   await user.save();

   // Delete token document from database
   await token.remove();

   res.json({message: "The account has been verified. Please log in."});
});

exports.resendToken = asyncMiddleware(async (req, res, next) => {
   const { email } = req.body;

   // Check if for a user with the given email.
   let user = await User.findOne({ email });
   if (!user) return res.status(401).json({message: "The email address " + email + " is not associated with any account. Double-check your email address and try again."});

   // Check if the account has not been verified already.
   if (user.isVerified) return res.status(400).json({ message: 'This account has already been verified. Please log in.'});

   await sendVerificationEmail(user, req, res);
});

async function sendVerificationEmail(user, req, res) {
   // Generate and save the verification token
   const token = user.generateVerificationToken();
   await token.save();

   // Send the verification email
   let verificationLink = "http://"+req.headers.host+"/api/auth/verify/"+token.token;
   let mailOptions = {
      from: 'quinn82@ethereal.email', // TODO: replace with real mail from env
      to: user.email,
      subject: 'Email verification',
      html: `<p>Hi ${user.username}!<p><br><p>Please click on the following <a href="${verificationLink}" target='_blank'>link</a> to verify your account.</p> 
      <br><p>If you did not request this, please ignore this email.</p>` // TODO: replace with a better message? Maybe a styled button to verify?
   }
   await sendEmail(mailOptions);

   res.json({message: 'A verification email has been sent to ' + user.email + '.'});
}