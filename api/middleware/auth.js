const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');

module.exports = async function(req, res, next) {
   const token = req.header('x-auth-token');
   if (!token) return res.status(401).json({error: 'Access denied. No token provided.'});

   jwt.verify(token, config.get('JWT_SECRET'), { algorithms: ['HS256'] }, async (err, decoded) => {
      if (err) return res.status(401).json(err);
      
      // Check if user still exists
      let user = await User.findById(decoded._id);
      if (!user) return res.status(401).json({error: 'Access denied.'});

      req.user = decoded;
      const refreshTokens = await RefreshToken.find({ user: user._id });
      req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token); // Method to check if user owns some token.
      next();
   });   
}