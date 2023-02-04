const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const otps = new Schema({
  otp: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    default: Date.now+1000*60,
    required: true,
  },
}
);

module.exports = mongoose.model('otp', otps);