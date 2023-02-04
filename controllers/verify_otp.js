const { checkOTP } = require("../configs/otpSettings");
const otp = require("../models/otpModel");
const User = require("../models/users");
const { sendOtp } = require("./send_otp");

const verify = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    const result = await checkOTP(user._id, otp);
    if (result === "done") {
      await User.findByIdAndUpdate(user._id, { isActivated: true });
      res.status(200).json({
        message: "OTP Verified",
      });
      return;
    } else if (result === "invalid") {
      res.status(400).json({
        message: "Invalid OTP",
      });
      return;
    } else {
      res.status(400).json({
        message: "OTP Expired",
      });
      return;
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    return;
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    sendOtp(user._id, user.email);
    res.status(200).json({ message: "OTP sent" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { verify, resendOtp };
