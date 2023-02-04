const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    creatorEmail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
      type: String,
    },
    eventImage:{
      type:String
    },
    location: {
        type: String,
    },
    registeredVolunteers: {
        type: Array,
        default: []
    },
  });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
