const express = require('express');
const {verify, resendOtp} = require('../controllers/verify_otp');
const {signUp, signUpVol} = require('../controllers/sinup');
const router = express.Router();
const auth = require('../middleware/auth_middleware');
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
// login route
router.post('/', signUp);
router.post('/vol/', upload.single('img'),signUpVol);
router.post('/verify/', [auth.verifyJwt, auth.accountActivatedFalse],verify);
router.post('/resend/', [auth.verifyJwt, auth.accountActivatedFalse],resendOtp);

module.exports = router;