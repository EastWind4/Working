const User = require('../models/users');
const bcrypt = require('bcrypt');
const { sendOtp } = require('./send_otp');
const generateToken = require('../configs/generateToken');



const signUp = async (req, res) => {
  const { username, password, email, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = User.findOne({ username });  
  if (user && user.username === username) {
    res.status(409).json({ message: "Username already exists" });
    return;
  }
  const userByEmail = User.findOne({ email });
  if (userByEmail && userByEmail.email === email) {
    res.status(409).json({ message: "Email already registered" });
    return;
  }
  const newUser = new User({ username, hashedPassword, email, name });
  try {
    await newUser.save();
    sendOtp(newUser._id, newUser.email);
    const id = newUser._id;
    const {token, expireDate} = await generateToken(newUser);
    res.status(201).json({ id, username, email, name, isActivated: newUser.isActivated, token, expireDate });
  }
  catch (error) {
    res.status(409).json({ message: error.message });
  }
};


module.exports = {signUp};