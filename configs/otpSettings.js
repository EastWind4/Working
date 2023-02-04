const otpGenerator = require("otp-generator");
const otpModel = require("../models/otpModel");
const bcrypt = require("bcrypt");

async function generateOTP(userId) {
  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    digits: true,
    alphabets: false,
    lowerCaseAlphabets: false,
    specialCase: false,
    upperCaseAlphabets: false,
    excludeSimilarCharacters: true,
  });
  bcrypt.hash(otp, 10, async (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      const otpData = new otpModel({
        otp: hash,
        userId,
        createdAt: Date.now(),
        expiredAt: Date.now() + 1000 * 60,
      });
      await otpData.save();
    }
  });
  return otp;
}

async function removeOtp(userId) {
  await otpModel.deleteMany({ userId });
}

async function checkOTP(userId, otp) {
  const userCheck = await otpModel.findOne({ userId }).sort({ createdAt: -1 });
  let final = "invalid";
  if(otp.length !== 6) {
    return final;
  }
  if (userCheck !== null) {
  const check = await bcrypt.compare(otp, userCheck.otp)
    if (check) {
      if (userCheck.expiredAt > Date.now()) {
        final = "done";
      } else {
        final = "expired";
      }
      await removeOtp(userId);
    }
    else {
      final = "invalid";
    }
  }
    return final;
}

module.exports = { generateOTP, checkOTP };