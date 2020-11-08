const sgMail = require('@sendgrid/mail')
const winston = require('winston');
const config = require('config');

sgMail.setApiKey(config.get('SENDGRID.API_KEY'));

module.exports = async function(to, subject, html) {
  const sender = config.get('SENDGRID.SENDER');
  let msg = {
    from: sender, to, subject, html
  }
  await sgMail.send(msg);
}