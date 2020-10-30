const config = require('config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Token = require('./token');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      unique: true
   },
   name: {
      type: String,
      required: true,
      maxlength: 50
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
   },
   resetPasswordToken: {
      type: String,
      required: false
   },
   resetPasswordExpires: {
      type: Date,
      required: false
   },
   isVerified: {
      type: Boolean,
      default: false
   },
   isAdmin: Boolean
}, {timestamps: true});

userSchema.pre('save',  function(next) {
   const user = this;
   if (!user.isModified('password')) return next();
   bcrypt.genSalt(10, function(err, salt) {
       if (err) return next(err);

       bcrypt.hash(user.password, salt, function(err, hash) {
           if (err) return next(err);

           user.password = hash;
           next();
       });
   });
});

userSchema.methods.generateAuthToken = function() {
   // TODO: add expiration date
   let payload = {
      _id: this._id,
      isAdmin: this.isAdmin
   }
   return jwt.sign(payload, config.get('jwtPrivateKey'), { algorithm: 'HS256' });
}

userSchema.methods.comparePassword = async function(password) {
   return await bcrypt.compare(password, this.password);
}

userSchema.methods.generatePasswordReset = function() {
   this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
   this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

userSchema.methods.generateVerificationToken = function() {
   let payload = {
       userId: this._id,
       token: crypto.randomBytes(20).toString('hex')
   };

   return new Token(payload);
};

module.exports = mongoose.model('User', userSchema);