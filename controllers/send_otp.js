const {generateOTP} = require('../configs/otpSettings')
const otp = require('../models/otpModel')

const emaill = process.env.MAIL;
const password = process.env.PASS;

const transport = require("nodemailer").createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
      user: emaill,
      pass: password
  },
  tls: {
      ciphers: 'SSLv3'
  }
});

async function sendOtp(id, email) {
  const otp = await generateOTP(id)
  const mailOptions = {
    from: emaill,
    to: email,
    subject: "OTP",
    text: "Your OTP is " + otp,
  };
  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {sendOtp}