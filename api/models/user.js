const config = require('config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const RefreshToken = require('./refreshToken');
const VerificationToken = require('./verificationToken');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
      unique: true
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
   let payload = {
      _id: this._id,
      isAdmin: this.isAdmin
   }
   // JWT token that expires in 10 minutes.
   return jwt.sign(payload, config.get('JWT_SECRET'), { algorithm: 'HS256', expiresIn: '10m' });
}

userSchema.methods.generateRefreshToken = function(ipAddress) {
   // Refresh token that expires in 7 days
   return new RefreshToken({
      user: this._id,
      token: crypto.randomBytes(40).toString('hex'),
      createdByIp: ipAddress
   });
}

userSchema.methods.comparePassword = async function(password) {
   return await bcrypt.compare(password, this.password);
}

userSchema.methods.generatePasswordReset = function() {
   this.resetPasswordToken = crypto.randomBytes(40).toString('hex');
   this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

userSchema.methods.generateVerificationToken = function() {
   let payload = {
       user: this._id,
       token: crypto.randomBytes(20).toString('hex')
   };
   return new VerificationToken(payload);
};

userSchema.methods.logoutAllDevices = async function() {
   await RefreshToken.remove({ user: this._id });
}

module.exports = mongoose.model('User', userSchema);