const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/users');
const {sendOtp} = require('../controllers/send_otp');
const generateToken = require('../configs/generateToken');

dotenv.config();

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404).json({
      message: 'User not found!',
    });
    return;
  }
  if(!user.isActivated){
    const {token, expireDate} = await generateToken(user);
    sendOtp(user._id, user.email);
    res.status(200).json({
      username: user.username,
      id: user._id,
      name: user.name,
      isActivated: user.isActivated,
      token,
      expireDate
    });
    return;
  }
  const isPasswordCorrect = bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(400).json({
      message: 'Invalid credentials!',
    });
    return;
  }
  const {token, expireDate} = await generateToken(user);
  res.status(200).json({
    username: user.username,
    id: user._id,
    name: user.name,
    isActivated: user.isActivated,
    token,
    expireDate,
  });
};

module.exports = login;
