const config = require('config');

module.exports = function() {
   if (!config.get('EMAIL.SMTP_HOST')) throw new Error('FATAL ERROR: EMAIL_SMTP_HOST is not defined.');
   if (!config.get('EMAIL.SMTP_PORT')) throw new Error('FATAL ERROR: EMAIL_SMTP_PORT is not defined.');
   if (!config.get('EMAIL.SMTP_USERNAME')) throw new Error('FATAL ERROR: EMAIL_SMTP_USERNAME is not defined.');
   if (!config.get('EMAIL.SMTP_PASSWORD')) throw new Error('FATAL ERROR: EMAIL_SMTP_PASSWORD is not defined.');
   if (!config.get('EMAIL.SENDER')) throw new Error('FATAL ERROR: EMAIL_SENDER is not defined.');
   if (!config.get('JWT_SECRET')) throw new Error('FATAL ERROR: JWT_SECRET is not defined.');
}