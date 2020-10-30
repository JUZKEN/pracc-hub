const nodemailer = require('nodemailer');

// TODO: replace with real mail from env
const transporter = nodemailer.createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
       user: 'quinn82@ethereal.email',
       pass: 'ySsaQSGsMf8jDMUTsY'
   }
});

module.exports = function(mailOptions) {
   return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function(error, result){
         if (error) return reject(error);
         return resolve(result)
       });
   })
}
