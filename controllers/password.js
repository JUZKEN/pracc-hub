const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const asyncMiddleware = require('../middleware/async');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/user');

exports.recover = asyncMiddleware(async (req, res, next) => {
   const { error } = validateRecover(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const { email } = req.body;

   // Check if the user exists
   const user = await User.findOne({ email });
   if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

   // Generate and set password reset token
   user.generatePasswordReset();

   // Save the updated user object
   await user.save();

   // Send email
   let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
   let mailOptions = {
      from: "quinn82@ethereal.email", // TODO: replace with real mail from env
      to: user.email,
      subject: "Password change request",
      html: `<p>Hi ${user.username}</p>
            <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
   }
   await sendEmail(mailOptions);

   res.status(200).json({message: 'A reset email has been sent to ' + user.email + '.'});
});

exports.reset = asyncMiddleware(async (req, res, next) => {
   const { token } = req.params;

   const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});
   if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

   //Redirect user to form with the email address
   res.render('reset', {user});
});

exports.resetPassword = asyncMiddleware(async (req, res, next) => {
   const { error } = validateResetPassword(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const { token } = req.params;

   const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});
   if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

   // Set the new password
   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpires = undefined;
   user.isVerified = true;

   // Save the updated user object
   await user.save();

   // Send email
   let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
   let mailOptions = {
      from: "quinn82@ethereal.email", // TODO: replace with real mail from env
      to: user.email,
      subject: "Your password has been changed",
      html: `<p>Hi ${user.username}</p>
      <p>This is a confirmation that the password for your account has just been changed.</p>`
   }
   await sendEmail(mailOptions);

   res.status(200).json({message: 'Your password has been updated.'});
});

// TODO: convert these validations into a middleware
function validateRecover(object) {
   return Joi.object({
      email: Joi.string().email().required()
   }).validate(object);
}

function validateResetPassword(object) {
   return Joi.object({
      password: passwordComplexity(),
      confirmPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required()
   }).validate(object);
}

