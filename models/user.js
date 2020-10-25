const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      maxlength: 50
   },
   email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
   },
   password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
   },
   isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
   const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'), { algorithm: 'HS256' });
   return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
   const schema = Joi.object({
      name: Joi.string().max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: passwordComplexity()
   });
   return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;