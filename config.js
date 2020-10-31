const config = require('config');

module.exports = function() {
   if (!config.get('JWT_SECRET')) {
      throw new Error('FATAL ERROR: JWT_SECRET is not defined.');
   }
}