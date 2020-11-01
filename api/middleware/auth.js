const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');

module.exports = async function(req, res, next) {
   const token = req.header('x-auth-token');
   if (!token) return res.status(401).json({message: 'Access denied. No token provided.'});

   const payload = jwt.verify(token, config.get('JWT_SECRET'), { algorithms: ['HS256'] });

   // Check if user still exists
   let user = await User.findById(payload._id);
   if (!user) return res.status(401).json({message: 'Access denied.'});

   req.user = payload;
   const refreshTokens = await RefreshToken.find({ user: user._id });
   req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
   next();
}