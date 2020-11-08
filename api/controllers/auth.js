const sendEmail = require('../utils/sendEmail');
const _ = require('lodash');

const User = require('../models/user');
const VerificationToken = require('../models/verificationToken');

exports.register = async (req, res, next) => {
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
};

exports.login = async (req, res, next) => {
   const { email, password } = req.body;
   const ipAddress = req.ip;

   let user = await User.findOne({ email });
   if (!user) return res.status(401).send('The email adress is not associated with any account.');

   // Validate password
   const validPassword = await user.comparePassword(password);
   if (!validPassword) return res.status(401).send('Invalid email or password.');

   // Check if user is not verified
   if (!user.isVerified) return res.status(401).json({ message: 'Your account has not been verified.' });

   // Generate jwt and refresh tokens
   const jwtToken = user.generateAuthToken();
   const refreshToken = user.generateRefreshToken(ipAddress);

   // Save refresh token
   await refreshToken.save();

   // Send tokens and user data to the client
   res.json({ user: _.pick(user, ['username', 'name', 'email']), jwtToken: jwtToken, refreshToken: refreshToken.token });
};

exports.verify = async (req, res, next) => {
   if(!req.params.token) return res.status(400).json({message: "We were unable to find a user for this token."});
   
   // Find a matching token
   const token = await VerificationToken.findOne({ token: req.params.token });
   if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token may have expired.' });

   // Find a matching user with that token
   let user = await User.findOne({ _id: token.user });
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
};

exports.resendVerificationToken = async (req, res, next) => {
   const { email } = req.body;

   // Check if for a user with the given email.
   let user = await User.findOne({ email });
   if (!user) return res.status(401).json({message: "The email address " + email + " is not associated with any account. Double-check your email address and try again."});

   // Check if the account has not been verified already.
   if (user.isVerified) return res.status(400).json({ message: 'This account has already been verified. Please log in.'});

   await sendVerificationEmail(user, req, res); 
};

async function sendVerificationEmail(user, req, res) {
   // Generate and save the verification token
   const token = user.generateVerificationToken();
   await token.save();

   // Send the verification email
   let verificationLink = "http://"+req.headers.host+"/api/auth/verify/"+token.token;
   let html = `<p>Hi ${user.username}!<p><p>Please click on the following <a href="${verificationLink}" target='_blank'>link</a> to verify your account.</p> 
   <p>If you did not request this, please ignore this email.`
   await sendEmail(user.email, 'Email verification', html);

   res.json({message: 'A verification email has been sent to ' + user.email + '.'});
}