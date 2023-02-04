const jwt = require('jsonwebtoken');
const Auth = require('../models/auth');


const generateBearerToken = async (user) => {
  const token = jwt.sign(
      {
          id: user._id,
          name: user.name,
          email: user.email,
          isActivated: user.isActivated
      },
      process.env.JWT_SECRET
  );

  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + 24);

  await new Auth({
      token: token,
      user: {
          id: user._id,
          email: user.email,
      },
      expireAt: expireDate,
      lastAccess: new Date()
  }).save();

  return {
      token,
      expireDate
  };
};

module.exports = generateBearerToken;