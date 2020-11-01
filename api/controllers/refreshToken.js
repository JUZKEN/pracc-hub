const _ = require('lodash');
const RefreshToken = require('../models/refreshToken');

exports.refresh = async (req, res, next) => {
   const token = req.header('x-auth-refresh-token');
   if (!token) return res.status(401).send('Access denied. No refresh token provided.');

   const ipAddress = req.ip;

   const refreshToken = await RefreshToken.findOne({ token }).populate('user');
   if (!refreshToken || !refreshToken.isActive) return res.status(401).json({message: 'Invalid or expired token.'});
   const { user } = refreshToken;

   // Replace old refresh token with a new one and save
   const newRefreshToken = user.generateRefreshToken(ipAddress);
   refreshToken.revoked = Date.now();
   refreshToken.revokedByIp = ipAddress;
   refreshToken.replacedByToken = newRefreshToken.token;
   await refreshToken.save();
   await newRefreshToken.save();

   // Generate new jwt
   const jwtToken = user.generateAuthToken();

   // Send tokens and user data to the client
   res.json({ user: _.pick(user, ['username', 'name', 'email']), jwtToken: jwtToken, refreshToken: newRefreshToken.token });
}

exports.revoke = async (req, res, next) => {
   // Accept token from request body or header
   const token = req.body.token || req.header('x-auth-refresh-token');
   const ipAddress = req.ip;
   if (!token) return res.status(400).json({ message: 'No refresh token provided.' });

   // Users can revoke their own tokens and admins can revoke any tokens
   if (!req.user.ownsToken(token) && !req.user.isAdmin) return res.status(401).json({ message: 'Unauthorized' });

   await revokeToken(token, ipAddress);
   res.json({ message: 'Token revoked' });
}

async function revokeToken(token, ipAddress) {
   const refreshToken = await RefreshToken.findOne({ token }).populate('user');
   if (!refreshToken || !refreshToken.isActive) return res.status(401).json({message: 'Invalid token.'});

   // Revoke token and save
   refreshToken.revoked = Date.now();
   refreshToken.revokedByIp = ipAddress;
   await refreshToken.save();
}