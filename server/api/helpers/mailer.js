const config = require('config');
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: config.get('EMAIL.SMTP_HOST'),
	port: config.get('EMAIL.SMTP_PORT'),
	auth: {
		user: config.get('EMAIL.SMTP_USERNAME'),
		pass: config.get('EMAIL.SMTP_PASSWORD')
	}
});

module.exports = (to, subject, html) => {
	// send mail with defined transport object
	return transporter.sendMail({
		from: config.get('EMAIL.SENDER'),
		to: to,
		subject: subject,
		html: html
	});
};