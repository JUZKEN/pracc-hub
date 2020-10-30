const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async function(req, res, next) {
   const token = req.header('x-auth-token');
   if (!token) return res.status(401).send('Access denied. No token provided.');

   try {
      const payload = jwt.verify(token, config.get('JWT_SECRET'), { algorithms: ['HS256'] });

      // Check if user still exists
      let user = await User.findById(payload._id);
      if (!user) return res.status(401).send('Invalid token.');

      req.user = payload;
      next();
   } catch (ex) {
      res.status(400).send('Invalid token.');
   }
}