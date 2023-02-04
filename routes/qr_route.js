const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Participate = require('../models/participate');


router.post('/profile/', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    const allEvents = await Participate.find({ email: email, isApproved: true });
    res.status(200).json({
      message: 'Profile fetched',
      hours: user.hours,
      image: user.profilePic,
      email: user.email,
      name: user.name,
      events: allEvents,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;