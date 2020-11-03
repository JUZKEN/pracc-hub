const _ = require('lodash');
const RefreshToken = require('../models/refreshToken');

exports.refresh = async (req, res, next) => {
   const token = req.header('x-auth-refresh-token');
   if (!token) return res.status(401).send('Access denied. No refresh token provided.');

   const ipAddress = req.ip;

   const refreshToken = await RefreshToken.findOne({ token }).populate('user');
   if (!refreshToken) return res.status(401).json({message: 'Invalid or expired token.'});
   const { user } = refreshToken;

   // Remove old refresh token and create a new one
   await refreshToken.remove();
   const newRefreshToken = user.generateRefreshToken(ipAddress);
   await newRefreshToken.save();

   // Generate new jwt
   const jwtToken = user.generateAuthToken();

   // Send tokens and user data to the client
   res.json({ user: _.pick(user, ['username', 'name', 'email']), jwtToken: jwtToken, refreshToken: newRefreshToken.token });
}

exports.revoke = async (req, res, next) => {
   // Accept token from request body or header, if both, accept the one in the body.
   const token = req.body.token || req.header('x-auth-refresh-token');
   if (!token) return res.status(400).json({ message: 'No refresh token provided.' });

   // Users can revoke their own tokens and admins can revoke any tokens
   if (!req.user.ownsToken(token) && !req.user.isAdmin) return res.status(401).json({ message: 'Unauthorized' });

   await revokeToken(token);
   res.json({ message: 'Token revoked' });
}

async function revokeToken(token) {
   const refreshToken = await RefreshToken.findOne({ token }).populate('user');
   if (!refreshToken) return res.status(401).json({message: 'Invalid token.'});

   // Remove token
   await refreshToken.remove();
}