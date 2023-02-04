const Event = require('../models/events');  
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Participate = require('../models/participate');
const User = require('../models/users');


const createEvent = async (req, res) => {
  const {creatorEmail, title, description, date, location} = req.body;
  const file = req.file;
    if (!file) {
      res.status(400).json({
        message: 'No file uploaded',
      });
      return;
    }
    const { path } = file;
    const { secure_url } = await cloudinary.uploader.upload(path, {
      public_id: "test/events/"+title,
    });
    const pt=`uploads/${file.fieldname + '-' + file.originalname}`;
    fs.unlinkSync(pt);
  try {
    const event = await Event.create({
      creatorEmail,
      title,
      description,
      date,
      eventImage: secure_url,
      location,
    });
    event.save();
    res.status(200).json({
      message: 'Event created',
      event
    }); 
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};


const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      message: 'Events fetched',
      events
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const getEventsByCreatorEmail = async (req, res) => {
  const {email} = req.body;
  try {
    const events = await Event.find({creatorEmail: email});
    res.status(200).json({
      message: 'Events fetched',
      events
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const deleteEvent = async (req, res) => {
  const {id} = req.body;
  try {
    const event = await Event.findById(id);
    await cloudinary.uploader.destroy(event.eventImage);
    await Event.findByIdAndDelete(id);
    await Participate.deleteMany({eventId: id});
    res.status(200).json({
      message: 'Event deleted',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const applyForEvent = async (req, res) => {
  const {email, eventId, creatorEmail, name, title} = req.body;
  try {
    const apply = await Participate.create({
      eventId,
      eventTitle: title,
      userEmail: email,
      creatorEmail,
      userName: name
    });
    apply.save();
    res.status(200).json({
      message: 'Applied for event'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  } 
}

const getApplicants = async (req, res) => {
  const {eventId} = req.body;
  try {
    const people = await Participate.find({eventId});
    let applicants = [];
    for (let i = 0; i < people.length; i++) {
      if (people[i].isRejected === false && people[i].isAccepted === false) {
        applicants.push(people[i]);
      }
    }
    res.status(200).json({
      message: 'Applicants fetched',
      applicants: applicants
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const acceptApplicant = async (req, res) => {
  const {eventId, userEmail, hours} = req.body;
  try {
    const event = await Event.findOne({_id: eventId});
    event.registeredVolunteers.push(userEmail);
    await event.save();
    await Participate.findOneAndDelete({eventId, userEmail});
    const user = await User.findOne({email: userEmail});
    user.hours += hours;
    await user.save();
    res.status(200).json({
      message: 'Applicant accepted'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const rejectApplicant = async (req, res) => {
  const {eventId, userEmail} = req.body;
  try {
    await Participate.findByIdAndUpdate({eventId, userEmail}, {isRejected: true});
    res.status(200).json({
      message: 'Applicant rejected'
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const getPendingAndRejectedEvents = async (req, res) => {
  const {email} = req.body;
  try {
    const events = await Participate.find({userEmail: email, isRejected: true});
    const ev = await Participate.find({userEmail: email, isAccepted: false, isRejected: false});
    for (let i = 0; i < ev.length; i++) {
      events.push(ev[i]);
    }
    res.status(200).json({
      message: 'Events fetched',
      events
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}



module.exports = {
  createEvent,
  getAllEvents,
  getEventsByCreatorEmail,
  deleteEvent,
  applyForEvent,
  getApplicants,
  acceptApplicant,
  rejectApplicant,
  getPendingAndRejectedEvents
};