const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participateSchema = new Schema({
  eventId: {
    type: String,
    required: true,
  },
  eventTitle: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  creatorEmail: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },
});


const Participate = mongoose.model('Participate', participateSchema);

module.exports = Participate;