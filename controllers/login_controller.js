const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/users');
const {sendOtp} = require('../controllers/send_otp');
const generateToken = require('../configs/generateToken');

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: 'User not found!',
    });
    return;
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400).json({
      message: 'Invalid credentials!',
    });
    return;
  }
  if(!user.isActivated){
    const {token, expireDate} = await generateToken(user);
    sendOtp(user._id, user.email);
    res.status(200).json({
      email: user.email,
      type: user.type,
      name: user.name,
      profilePic: user.profilePic,
      isActivated: user.isActivated,
      token,
      expireDate
    });
    return;
  }
  const {token, expireDate} = await generateToken(user);
  res.status(200).json({
    name: user.name,
    email: user.email,
    type: user.type,
    isActivated: user.isActivated,
    profilePic: user.profilePic,
    token,
    expireDate,
  });
};

module.exports = login;
