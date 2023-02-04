const express = require('express');
const {verify, resendOtp} = require('../controllers/verify_otp');
const {signUp} = require('../controllers/sinup');
const router = express.Router();
const auth = require('../middleware/auth_middleware');
// login route
router.post('/', signUp);
router.post('/verify/', [auth.verifyJwt, auth.accountActivatedFalse],verify);
router.post('/resend/', [auth.verifyJwt, auth.accountActivatedFalse],resendOtp);

module.exports = router;