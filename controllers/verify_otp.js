const {checkOTP} = require('../configs/otpSettings')
const otp = require('../models/otpModel')
const User = require('../models/users')
const { sendOtp } = require('./send_otp');

const verify = async (req, res) => {
  const { userId, otp } = req.body;
  const result = await checkOTP(userId, otp);
  if (result === "done") {
    await User.findByIdAndUpdate(userId, {isActivated: true});
    res.status(200).json({
      message: "OTP Verified",
    });
    return;
  } else if (result === "invalid") {
    res.status(400).json({
      message: "Invalid OTP",
    });
    return;
  }
  else {
    res.status(400).json({
      message: "OTP Expired",
    });
    return;
  }
};


const resendOtp = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  sendOtp(userId, user.email);
  res.status(200).json({ message: "OTP sent" });
};

module.exports = {verify, resendOtp};