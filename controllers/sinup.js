const User = require('../models/users');
const bcrypt = require('bcrypt');
const { sendOtp } = require('./send_otp');
const generateToken = require('../configs/generateToken');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;



const signUp = async (req, res) => {
  const { type, password, email, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const userByEmail = await User.findOne({ email });
  if (userByEmail && userByEmail.email === email) {
    res.status(409).json({ message: "Email already registered" });
    return;
  }
  const newUser = new User({ name: name, password: hashedPassword, email, type });
  await newUser.save();
  try {
    sendOtp(newUser._id, newUser.email);
    const {token, expireDate} = await generateToken(newUser);
    res.status(201).json({ email, name, isActivated: newUser.isActivated, token, expireDate, hours: newUser.hours, type: newUser.type });
  }
  catch (error) {
    res.status(409).json({ message: error.message });
  }
};


const signUpVol = async (req, res) => {
  const { type, password, email, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const userByEmail = await User.findOne({ email });
  if (userByEmail && userByEmail.email === email) {
    res.status(409).json({ message: "Email already registered" });
    return;
  }
  const file = req.file;
  console.log(file);
    if (!file) {
      res.status(400).json({
        message: 'No file uploaded',
      });
      return;
    }
    const { path } = file;
    const { secure_url } = await cloudinary.uploader.upload(path, {
      public_id: "test/uploads/"+email,
    });
    const newUser = new User({ password: hashedPassword, email, name, type, profilePic: secure_url });
    await newUser.save();
    // const pt=`public/uploads/${file.fieldname + '-' + file.originalname}`;
    // fs.unlinkSync(pt);
  try {
    sendOtp(newUser._id, newUser.email);
    const {token, expireDate} = await generateToken(newUser);
    res.status(201).json({ email, name, isActivated: newUser.isActivated, token, expireDate, profilePic: secure_url, hours: newUser.hours, type: newUser.type });
  }
  catch (error) {
    res.status(409).json({ message: error.message });
  }
};


module.exports = {signUp, signUpVol};