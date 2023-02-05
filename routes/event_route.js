const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth_middleware');
const {createEvent,
  getAllEvents,
  getEventsByCreatorEmail,
  deleteEvent,
  applyForEvent,
  getApplicants,
  rejectApplicant,
  getPendingAndRejectedEvents,
  getApplicantsByEmail,
approveUser} = require('../controllers/event_controller');
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + file.originalname)
    }
  });
  const upload = multer({ storage: storage });

router.post('/create/', upload.single("img"),createEvent);
router.get('/get/', getAllEvents);
router.post('/getbyemail/', getEventsByCreatorEmail);
router.post('/delete/', deleteEvent);
router.post('/apply/', applyForEvent);
router.post('/getapplicants/', getApplicants);
// router.post('/haveit/', acceptApplicant);
router.post('/rejectapplicant/', rejectApplicant);
router.post('/getstatus/', getPendingAndRejectedEvents);
router.post('/my/', getApplicantsByEmail);
router.post('/approve/', approveUser);

module.exports = router;


