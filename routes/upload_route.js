const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth_middleware');
const {uploadImage, getImage, deleteImage} = require('../controllers/upload_controller');
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

router.post('/upload/', upload.single('img'),uploadImage);
router.post('/get/',getImage);
router.post('/delete/',deleteImage);

module.exports = router;