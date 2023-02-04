const express = require('express');
const login = require('../controllers/login_controller');
const router = express.Router();
// login route
router.post('/', login);  

module.exports = router;




