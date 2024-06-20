const nodemailer = require('nodemailer');


//nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'cesarcruz61717@gmail.com',
      pass: 'lmum xvxu iudj klix',
    },
  });

  module.exports.transporter = transporter;